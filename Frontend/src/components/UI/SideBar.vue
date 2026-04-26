<template>
  <v-navigation-drawer
    :model-value="modelValue"
    @update:model-value="$emit('update:modelValue', $event)"
    app
    :width="240"
    class="secondary-sidebar"
  >
    <v-list nav dense class="pa-2">
      <v-list-item
        prepend-icon="custom:home"
        title="Последние новости"
        value="latest"
        to="/"
        class="sidebar-item"
        active-class="active"
      />
      <v-list-item
        prepend-icon="custom:fire"
        title="Самые просматриваемые"
        value="popular"
        to="/popular"
        class="sidebar-item"
        active-class="active"
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
.sidebar-item {
  border-radius: 6px;
  color: #5a6473;
  margin-bottom: 2px;
}
.sidebar-item :deep(.v-icon) {
  color: #AAAFB9;
  opacity: 1;
}
.sidebar-item :deep(.v-list-item__overlay) {
  opacity: 0 !important;
}
.sidebar-item.v-list-item--active {
  background-color: rgba(25, 118, 210, 0.10);
  color: #1976D2;
}
.sidebar-item.v-list-item--active :deep(.v-icon) {
  color: #1976D2;
}
.sidebar-item :deep(.v-list-item-title) {
  font-size: 14px;
}
</style>
