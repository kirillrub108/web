<template>
  <v-app-bar color="#01579B" dark flat app class="custom-navbar">
    <v-app-bar-nav-icon @click="$emit('toggle-sidebar')" />
    <v-icon class="ml-2">mdi-bullhorn-outline</v-icon>
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
    <v-menu>
      <template v-slot:activator="{ props }">
        <v-btn v-bind="props" variant="text" append-icon="mdi-chevron-down" class="text-none" style="color: white;">
          Иванов А.А.
        </v-btn>
      </template>
      <v-list>
        <v-list-item title="Профиль" />
        <v-list-item title="Выйти" />
      </v-list>
    </v-menu>
  </v-app-bar>
</template>

<script>
export default {
  name: 'NavBar',
  emits: ['toggle-sidebar'],
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
