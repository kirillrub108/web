<template>
  <v-dialog v-model="dialog" max-width="400" persistent>
    <v-card>
      <v-card-title class="text-h6 pa-6 pb-2">Авторизация</v-card-title>
      <v-card-text class="pa-6 pt-2">
        <v-text-field
          v-model="email"
          label="Email"
          type="email"
          variant="outlined"
          density="compact"
          class="mb-3"
          hide-details="auto"
        />
        <v-text-field
          v-model="password"
          label="Пароль"
          type="password"
          variant="outlined"
          density="compact"
          hide-details="auto"
        />
        <div v-if="errorMessage" class="text-red mt-3 text-body-2">
          {{ errorMessage }}
        </div>
      </v-card-text>
      <v-card-actions class="pa-6 pt-0">
        <v-spacer />
        <v-btn variant="text" @click="close">Отмена</v-btn>
        <v-btn
          color="#1976D2"
          variant="flat"
          :loading="loading"
          class="text-none"
          @click="handleLogin"
        >
          Войти
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { LoginService, UserService } from '../plugins/api/services';

export default {
  name: 'AuthDialog',
  props: {
    modelValue: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['update:modelValue', 'login-success'],
  data() {
    return {
      email: '',
      password: '',
      loading: false,
      errorMessage: '',
    };
  },
  computed: {
    dialog: {
      get() {
        return this.modelValue;
      },
      set(val) {
        this.$emit('update:modelValue', val);
      },
    },
  },
  methods: {
    close() {
      this.email = '';
      this.password = '';
      this.errorMessage = '';
      this.dialog = false;
    },
    async handleLogin() {
      this.errorMessage = '';
      this.loading = true;
      try {
        const response = await LoginService.login(this.email, this.password);

        // Сохраняем recordId в sessionStorage (задание)
        sessionStorage.setItem('recordId', response.recordId);
        sessionStorage.setItem('userId', response.userId);

        // Получаем данные текущего пользователя
        const user = await UserService.getCurrentUser(response.userId);

        console.log('Авторизация успешна:', user);

        this.$emit('login-success', user);
        this.close();
      } catch (error) {
        this.errorMessage =
          error.response?.data?.error || 'Ошибка авторизации';
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>
