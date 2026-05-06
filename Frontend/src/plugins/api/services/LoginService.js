import apiClient from '../apiConfig';

const LoginService = {
  async login(email, password) {
    const response = await apiClient.post('/api/login', { email, password });
    return response.data;
  },
};

export default LoginService;
