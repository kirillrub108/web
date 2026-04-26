<template>
  <v-app>
    <NavBar @toggle-sidebar="toggleSidebar" />
    <SideBar v-model="sidebarOpen" />
    <v-main>
      <v-container fluid class="pa-8">
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import NavBar from './src/components/UI/NavBar.vue';
import SideBar from './src/components/UI/SideBar.vue';

export default {
  name: 'App',
  components: { NavBar, SideBar },
  data() {
    return {
      sidebarOpen: JSON.parse(localStorage.getItem('sidebarOpen') ?? 'true'),
    };
  },
  watch: {
    sidebarOpen(val) {
      localStorage.setItem('sidebarOpen', JSON.stringify(val));
    },
  },
  methods: {
    toggleSidebar() {
      this.sidebarOpen = !this.sidebarOpen;
    },
  },
};
</script>
