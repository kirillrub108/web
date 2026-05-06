const tableService = require('../services/TableService');

const USER_TABLE_ID = process.env.USER_TABLE_ID;

// Получить всех пользователей
const getUsers = async (req, res) => {
  try {
    const data = await tableService.get(USER_TABLE_ID);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Получить пользователя по recordId
const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await tableService.get(USER_TABLE_ID);
    const records = data.data?.records || [];

    console.log('[UserById] Ищем id:', id);
    console.log('[UserById] Все recordId:', records.map((r) => r.recordId));

    const user = records.find((r) => r.recordId === id);
    if (!user) {
      return res.status(404).json({ error: 'Пользователь не найден', searchedId: id, available: records.map((r) => r.recordId) });
    }
    res.json(user);
  } catch (error) {
    console.error('[UserById] Ошибка:', error.message);
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getUsers, getUserById };
