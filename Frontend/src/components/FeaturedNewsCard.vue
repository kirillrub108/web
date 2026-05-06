<template>
  <v-card class="featured-card mb-8" flat>
    <v-row no-gutters>
      <v-col cols="12" md="6">
        <div class="featured-image" />
      </v-col>
      <v-col cols="12" md="6" class="d-flex align-center">
        <div class="pa-6">
          <div class="news-date mb-2">{{ news.date }}</div>
          <div class="featured-title mb-3">{{ news.title }}</div>
          <div class="featured-text mb-5">{{ news.text }}</div>
          <v-btn color="#1976D2" variant="flat" class="text-none read-more-btn">
            Читать далее
          </v-btn>
        </div>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
export default {
  name: 'FeaturedNewsCard',
  props: {
    news: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style scoped>
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
.news-date {
  font-size: 11px;
  color: #6b7280;
}
.read-more-btn {
  border-radius: 6px;
  font-size: 14px;
  padding: 0 22px;
  height: 40px;
  letter-spacing: 0;
}
</style>
