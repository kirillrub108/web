<template>
  <v-dialog v-model="dialog" max-width="420" persistent>
    <v-card>
      <!-- Вкладки -->
      <v-tabs v-model="activeTab" color="#1976D2" grow>
        <v-tab value="login">Войти</v-tab>
        <v-tab value="register">Регистрация</v-tab>
      </v-tabs>

      <v-tabs-window v-model="activeTab">
        <!-- ─── Вкладка: Войти ─── -->
        <v-tabs-window-item value="login">
          <v-card-text class="pa-6 pb-2">
            <v-text-field
              v-model="loginForm.email"
              label="Email"
              type="email"
              variant="outlined"
              density="compact"
              class="mb-3"
              hide-details="auto"
            />
            <v-text-field
              v-model="loginForm.password"
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
          <v-card-actions class="pa-6 pt-2">
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
        </v-tabs-window-item>

        <!-- ─── Вкладка: Регистрация ─── -->
        <v-tabs-window-item value="register">
          <v-card-text class="pa-6 pb-2">
            <v-text-field
              v-model="registerForm.name"
              label="Имя"
              variant="outlined"
              density="compact"
              class="mb-3"
              hide-details="auto"
              :error="!!registerErrors.name"
              :error-messages="registerErrors.name"
              @update:model-value="registerErrors.name = ''"
            />
            <v-text-field
              v-model="registerForm.surname"
              label="Фамилия"
              variant="outlined"
              density="compact"
              class="mb-3"
              hide-details="auto"
              :error="!!registerErrors.surname"
              :error-messages="registerErrors.surname"
              @update:model-value="registerErrors.surname = ''"
            />
            <v-text-field
              v-model="registerForm.patronymic"
              label="Отчество (необязательно)"
              variant="outlined"
              density="compact"
              class="mb-3"
              hide-details="auto"
            />
            <v-text-field
              v-model="registerForm.email"
              label="Email"
              type="email"
              variant="outlined"
              density="compact"
              class="mb-3"
              hide-details="auto"
              :error="!!registerErrors.email"
              :error-messages="registerErrors.email"
              @update:model-value="registerErrors.email = ''"
            />
            <v-text-field
              v-model="registerForm.password"
              label="Пароль"
              type="password"
              variant="outlined"
              density="compact"
              hide-details="auto"
              :error="!!registerErrors.password"
              :error-messages="registerErrors.password"
              @update:model-value="registerErrors.password = ''"
            />
            <div v-if="errorMessage" class="text-red mt-3 text-body-2">
              {{ errorMessage }}
            </div>
          </v-card-text>
          <v-card-actions class="pa-6 pt-2">
            <v-spacer />
            <v-btn variant="text" @click="close">Отмена</v-btn>
            <v-btn
              color="#1976D2"
              variant="flat"
              :loading="loading"
              class="text-none"
              @click="handleRegister"
            >
              Зарегистрироваться
            </v-btn>
          </v-card-actions>
        </v-tabs-window-item>
      </v-tabs-window>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions } from 'pinia';
import { useUserStore } from '../store/UserStore';

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
      activeTab: 'login',
      loading: false,
      errorMessage: '',
      loginForm: {
        email: '',
        password: '',
      },
      registerForm: {
        name: '',
        surname: '',
        patronymic: '',
        email: '',
        password: '',
      },
      registerErrors: {
        name: '',
        surname: '',
        email: '',
        password: '',
      },
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
    ...mapActions(useUserStore, ['authorizeUser', 'registerUser']),

    close() {
      this.loginForm = { email: '', password: '' };
      this.registerForm = { name: '', surname: '', patronymic: '', email: '', password: '' };
      this.registerErrors = { name: '', surname: '', email: '', password: '' };
      this.errorMessage = '';
      this.activeTab = 'login';
      this.dialog = false;
    },

    async handleLogin() {
      this.errorMessage = '';
      this.loading = true;
      try {
        await this.authorizeUser(this.loginForm.email, this.loginForm.password);
        this.$emit('login-success');
        this.close();
      } catch (error) {
        this.errorMessage = error.response?.data?.error || 'Ошибка авторизации';
      } finally {
        this.loading = false;
      }
    },

    validateRegister() {
      const f = this.registerForm;
      const e = { name: '', surname: '', email: '', password: '' };
      if (!f.name.trim()) e.name = 'Поле обязательно для заполнения';
      if (!f.surname.trim()) e.surname = 'Поле обязательно для заполнения';
      if (!f.email.trim()) {
        e.email = 'Поле обязательно для заполнения';
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email.trim())) {
        e.email = 'Введите корректный email';
      }
      if (!f.password.trim()) e.password = 'Поле обязательно для заполнения';
      this.registerErrors = e;
      return !e.name && !e.surname && !e.email && !e.password;
    },

    async handleRegister() {
      this.errorMessage = '';
      if (!this.validateRegister()) return;
      this.loading = true;
      try {
        await this.registerUser(this.registerForm);
        this.$emit('login-success');
        this.close();
      } catch (error) {
        this.errorMessage = error.response?.data?.error || 'Ошибка регистрации';
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>
