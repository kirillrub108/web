const axios = require('axios');

const API_URL = process.env.TABLES_API_URL;
const TOKEN = process.env.TOKEN;

const getHeaders = () => ({
  Authorization: `Bearer ${TOKEN}`,
  'Content-Type': 'application/json',
});

class TableService {
  // Получить записи таблицы
  async get(tableId, params = {}) {
    const response = await axios.get(`${API_URL}/${tableId}/records`, {
      headers: getHeaders(),
      params: { fieldKey: 'name', ...params },
    });
    return response.data;
  }

  // Создать новые записи
  async post(tableId, records) {
    const response = await axios.post(
      `${API_URL}/${tableId}/records`,
      { records },
      { headers: getHeaders() }
    );
    return response.data;
  }

  // Обновить существующие записи
  async put(tableId, records) {
    const response = await axios.put(
      `${API_URL}/${tableId}/records`,
      { records },
      { headers: getHeaders() }
    );
    return response.data;
  }

  // Удалить записи по массиву recordId
  async delete(tableId, recordIds) {
    const response = await axios.delete(`${API_URL}/${tableId}/records`, {
      headers: getHeaders(),
      data: { recordIds },
    });
    return response.data;
  }
}

module.exports = new TableService();
