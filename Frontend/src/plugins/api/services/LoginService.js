import apiClient from '../apiConfig';

const LoginService = {
  async login(email, password) {
    const response = await apiClient.post('/api/login', { email, password });
    return response.data;
  },

  async register({ name, surname, patronymic, email, password }) {
    const response = await apiClient.post('/api/register', {
      name,
      surname,
      patronymic,
      email,
      password,
    });
    return response.data;
  },
};

export default LoginService;
