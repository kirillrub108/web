import apiClient from '../apiConfig';

const UserService = {
  async getUsers() {
    const response = await apiClient.get('/api/users');
    return response.data;
  },

  async getCurrentUser(id) {
    const response = await apiClient.get(`/api/users/${id}`);
    return response.data;
  },
};

export default UserService;
