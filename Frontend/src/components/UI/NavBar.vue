<template>
  <v-app-bar color="#01579B" dark flat app class="custom-navbar">
    <v-app-bar-nav-icon @click="$emit('toggle-sidebar')" />
    <v-icon class="ml-2">custom:megaphone</v-icon>
    <v-toolbar-title class="ml-2">Новости</v-toolbar-title>
    <v-spacer />
    <v-text-field
      density="compact"
      variant="solo"
      placeholder="Поиск документа"
      prepend-inner-icon="mdi-magnify"
      hide-details
      single-line
      flat
      class="mx-4 nav-search"
      style="max-width: 300px;"
      bg-color="transparent"
    />

    <!-- Кнопка Войти (если пользователь не авторизован) -->
    <v-btn
      v-if="!currentUser"
      variant="outlined"
      class="text-none mr-2"
      style="color: white; border-color: rgba(255,255,255,0.6);"
      @click="showAuthDialog = true"
    >
      Войти
    </v-btn>

    <!-- Меню пользователя (если авторизован) -->
    <v-menu v-else>
      <template v-slot:activator="{ props }">
        <v-btn
          v-bind="props"
          variant="text"
          append-icon="mdi-chevron-down"
          class="text-none"
          style="color: white;"
        >
          {{ userDisplayName }}
        </v-btn>
      </template>
      <v-list>
        <v-list-item title="Профиль" />
        <v-list-item title="Выйти" @click="logout" />
      </v-list>
    </v-menu>

    <!-- Диалог авторизации -->
    <AuthDialog v-model="showAuthDialog" @login-success="showAuthDialog = false" />
  </v-app-bar>
</template>

<script>
import { mapState, mapActions } from 'pinia';
import { useUserStore } from '../../store/UserStore';
import AuthDialog from '../AuthDialog.vue';

export default {
  name: 'NavBar',
  components: { AuthDialog },
  emits: ['toggle-sidebar'],
  data() {
    return {
      showAuthDialog: false,
    };
  },
  computed: {
    ...mapState(useUserStore, ['currentUser']),

    userDisplayName() {
      if (!this.currentUser) return '';
      const f = this.currentUser.fields || this.currentUser;
      const capitalize = s => s ? s[0].toUpperCase() + s.slice(1) : '';
      const surname = capitalize(f.Surname || '');
      const name = f.Name ? f.Name[0].toUpperCase() + '.' : '';
      const patronymic = f.Patronymic ? f.Patronymic[0].toUpperCase() + '.' : '';
      return `${surname} ${name}${patronymic}`.trim();
    },
  },
  async mounted() {
    // При обновлении страницы восстанавливаем пользователя из sessionStorage
    const userId = sessionStorage.getItem('userId');
    if (userId) {
      try {
        await this.getCurrentUser(userId);
      } catch (e) {
        console.error('Не удалось загрузить пользователя:', e);
        sessionStorage.removeItem('recordId');
        sessionStorage.removeItem('userId');
      }
    }
  },
  methods: {
    ...mapActions(useUserStore, ['logout', 'getCurrentUser']),
  },
};
</script>

<style scoped>
.nav-search :deep(.v-field) {
  background-color: rgba(255, 255, 255, 0.18) !important;
  color: #fff;
  border-radius: 6px;
  box-shadow: none !important;
}
.nav-search :deep(.v-field__input),
.nav-search :deep(input),
.nav-search :deep(.v-field__input::placeholder),
.nav-search :deep(input::placeholder) {
  color: #fff !important;
  opacity: 1;
}
.nav-search :deep(.v-icon) {
  color: rgba(255, 255, 255, 0.85) !important;
}
</style>
