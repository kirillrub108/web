<template>
  <v-navigation-drawer
    :model-value="modelValue"
    @update:model-value="$emit('update:modelValue', $event)"
    app
  >
    <v-list nav dense class="custom-sidebar-list">
      <v-list-item
        prepend-icon="custom:fire"
        title="Последние новости"
        value="latest"
        to="/"
        active-color="primary"
        class="sidebar-item"
      />
      <v-list-item
        prepend-icon="mdi-eye-outline"
        title="Самые просматриваемые"
        value="popular"
        to="/"
        class="sidebar-item"
      />
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  name: 'SideBar',
  props: {
    modelValue: {
      type: Boolean,
      default: true,
    },
  },
  emits: ['update:modelValue'],
};
</script>

<style scoped>
.sidebar-item :deep(.v-list-item__overlay) {
  opacity: 0;
}
.sidebar-item.v-list-item--active {
  background-color: rgba(25, 118, 210, 0.10);
  color: #1976D2;
}
.sidebar-item.v-list-item--active :deep(.v-list-item__overlay) {
  opacity: 0;
}
.sidebar-item.v-list-item--active :deep(.v-icon) {
  color: #1976D2;
}
</style>
