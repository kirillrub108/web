import { defineStore } from 'pinia';
import { LoginService, UserService } from '../plugins/api/services';

export const useUserStore = defineStore('user', {
  state: () => ({
    currentUser: null,
  }),

  actions: {
    // Авторизация пользователя
    async authorizeUser(email, password) {
      const response = await LoginService.login(email, password);

      sessionStorage.setItem('recordId', response.recordId);
      sessionStorage.setItem('userId', response.userId);

      await this.getCurrentUser(response.userId);
    },

    // Получение данных о текущем пользователе по ID
    async getCurrentUser(id) {
      const user = await UserService.getCurrentUser(id);
      this.currentUser = user;
      console.log('Авторизация успешна:', user);
      return user;
    },

    // Регистрация нового пользователя
    async registerUser({ name, surname, patronymic, email, password }) {
      const response = await LoginService.register({ name, surname, patronymic, email, password });

      sessionStorage.setItem('recordId', response.recordId);
      sessionStorage.setItem('userId', response.userId);

      await this.getCurrentUser(response.userId);
    },

    // Выход из системы
    logout() {
      this.currentUser = null;
      sessionStorage.removeItem('recordId');
      sessionStorage.removeItem('userId');
    },
  },
});
