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

module.exports = { login };
