<template>
  <div>
    <h1 class="text-h4 font-weight-bold mb-6">Последние новости</h1>

    <!-- Главная новость -->
    <v-card class="mb-8" variant="outlined">
      <v-row no-gutters>
        <v-col cols="5">
          <v-img
            src="https://via.placeholder.com/600x400/e0e0e0/e0e0e0"
            height="250"
            cover
          />
        </v-col>
        <v-col cols="7">
          <v-card-text>
            <div class="text-caption text-grey mb-1">16 мая 2024 12:00</div>
            <div class="text-h6 font-weight-bold mb-2">
              В Обществе прошли мероприятия, посвящённые Дню Победы
            </div>
            <div class="text-body-2 mb-4">
              В Обществе прошли мероприятия, посвящённые Дню Победы. В них приняли участие 156 работников.
            </div>
            <v-btn color="primary" variant="flat">Читать далее</v-btn>
          </v-card-text>
        </v-col>
      </v-row>
    </v-card>

    <!-- Сетка новостей -->
    <v-row>
      <v-col v-for="n in 8" :key="n" cols="12" sm="6" md="3">
        <v-card variant="outlined">
          <v-img
            src="https://via.placeholder.com/400x300/e0e0e0/e0e0e0"
            height="160"
            cover
          />
          <v-card-text>
            <div class="text-caption text-grey mb-1">16 мая 2024 12:00</div>
            <div class="text-body-2 font-weight-medium">
              В Обществе прошли праздничные мероприятия, посвящённые Дню Победы
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: 'HomeView',
};
</script>
