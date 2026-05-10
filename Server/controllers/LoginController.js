const tableService = require('../services/TableService');

const LOGIN_TABLE_ID = process.env.LOGIN_TABLE_ID;

// Проверка авторизации пользователя
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Получаем ВСЕ записи таблицы Login и фильтруем вручную
    const data = await tableService.get(LOGIN_TABLE_ID);

    // Дебаг: смотрим структуру первой записи
    const allRecords = data.data?.records || [];
    if (allRecords.length > 0) {
      console.log('[Login] Пример записи:', JSON.stringify(allRecords[0], null, 2));
    }

    const record = allRecords.find(
      (r) => r.fields?.Email === email && r.fields?.Password === password
    );

    if (!record) {
      return res.status(401).json({ error: 'Неверный email или пароль' });
    }

    console.log('[Login] Найдена запись:', JSON.stringify(record, null, 2));

    // UserId — поле-ссылка: может быть массивом объектов [{recordId, title}]
    // или просто массивом строк-recordId, в зависимости от fieldKey
    const userIdField = record.fields?.UserId;
    let userId = null;

    if (Array.isArray(userIdField)) {
      if (typeof userIdField[0] === 'object') {
        userId = userIdField[0]?.recordId || null;
      } else {
        userId = userIdField[0] || null;
      }
    }

    console.log('[Login] userId:', userId);

    res.json({
      recordId: record.recordId,
      userId,
    });
  } catch (error) {
    console.error('[Login] Ошибка:', error.message);
    res.status(500).json({ error: error.message });
  }
};

// Регистрация нового пользователя
const register = async (req, res) => {
  try {
    const { name, surname, patronymic, email, password } = req.body;

    // Проверяем обязательные поля
    if (!name || !surname || !email || !password) {
      return res.status(400).json({ error: 'Заполните все обязательные поля' });
    }

    // 1. Создаём запись в таблице Users
    const userTableId = process.env.USER_TABLE_ID;
    const userResponse = await tableService.post(userTableId, [
      {
        fields: {
          Name: name,
          Surname: surname,
          Patronymic: patronymic || '',
        },
      },
    ]);

    const userRecord = userResponse.data?.records?.[0];
    if (!userRecord) {
      return res.status(500).json({ error: 'Не удалось создать пользователя' });
    }

    const userId = userRecord.recordId;
    console.log('[Register] Создан пользователь:', userId);

    // 2. Создаём запись в таблице Login, привязываем UserId
    const loginResponse = await tableService.post(LOGIN_TABLE_ID, [
      {
        fields: {
          Email: email,
          Password: password,
          UserId: [userId],
        },
      },
    ]);

    const loginRecord = loginResponse.data?.records?.[0];
    if (!loginRecord) {
      return res.status(500).json({ error: 'Не удалось создать запись входа' });
    }

    console.log('[Register] Создана запись входа:', loginRecord.recordId);

    res.json({
      recordId: loginRecord.recordId,
      userId,
    });
  } catch (error) {
    console.error('[Register] Ошибка:', error.message);
    res.status(500).json({ error: error.message });
  }
};

module.exports = { login, register };
