<template>
  <div class="home-view">
    <h1 class="page-title">Последние новости</h1>

    <!-- Главная новость -->
    <FeaturedNewsCard v-if="news.length > 0" :news="news[0]" />

    <!-- Список остальных новостей -->
    <v-row>
      <v-col v-for="item in news.slice(1)" :key="item.id" cols="12" sm="6" md="3">
        <NewsCard :news="item" />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import newsData from '../../NarfuNewsData.json';
import FeaturedNewsCard from '../components/FeaturedNewsCard.vue';
import NewsCard from '../components/NewsCard.vue';

export default {
  name: 'HomeView',
  components: { FeaturedNewsCard, NewsCard },
  data() {
    return {
      news: newsData,
    };
  },
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
</style>
