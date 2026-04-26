<template>
  <div class="home-view">
    <h1 class="page-title">Последние новости</h1>

    <!-- Главная новость -->
    <v-card class="featured-card mb-8" flat>
      <v-row no-gutters>
        <v-col cols="12" md="6">
          <div class="featured-image" />
        </v-col>
        <v-col cols="12" md="6" class="d-flex align-center">
          <div class="pa-6">
            <div class="news-date mb-2">16 мая 2024 12:00</div>
            <div class="featured-title mb-3">
              В Обществе прошли мероприятия,<br />посвящённые Дню Победы
            </div>
            <div class="featured-text mb-5">
              В Обществе прошли мероприятия, посвящённые<br />
              Дню Победы. В них приняли участие 156 работников.
            </div>
            <v-btn color="#1976D2" variant="flat" class="text-none read-more-btn">
              Читать далее
            </v-btn>
          </div>
        </v-col>
      </v-row>
    </v-card>

    <!-- Сетка новостей -->
    <v-row>
      <v-col v-for="n in 8" :key="n" cols="12" sm="6" md="3">
        <div class="news-card">
          <div class="news-thumb" />
          <div class="news-date">16 мая 2024 12:00</div>
          <div class="news-title">
            В Обществе прошли праздничные мероприятия, посвящённые Дню Победы
          </div>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: 'HomeView',
};
</script>

<style scoped>
.home-view {
  max-width: 1200px;
}
.page-title {
  font-size: 32px;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 28px;
}
.featured-card {
  background: transparent;
  box-shadow: none;
}
.featured-image {
  background-color: #d9d9d9;
  height: 320px;
  width: 100%;
  border-radius: 2px;
}
.featured-title {
  font-size: 22px;
  font-weight: 700;
  color: #1f2937;
  line-height: 1.3;
}
.featured-text {
  font-size: 14px;
  color: #4a5563;
  line-height: 1.5;
}
.read-more-btn {
  border-radius: 6px;
  font-size: 14px;
  padding: 0 22px;
  height: 40px;
  letter-spacing: 0;
}
.news-card {
  background: transparent;
}
.news-thumb {
  background-color: #d9d9d9;
  height: 140px;
  width: 100%;
  border-radius: 2px;
  margin-bottom: 8px;
}
.news-date {
  font-size: 11px;
  color: #6b7280;
  margin-bottom: 4px;
}
.news-title {
  font-size: 13px;
  color: #1f2937;
  line-height: 1.4;
}
</style>
