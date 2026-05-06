<template>
  <div class="news-card">
    <div class="news-thumb" />
    <div class="news-date">{{ news.date }}</div>
    <div class="news-title">{{ news.title }}</div>
  </div>
</template>

<script>
export default {
  name: 'NewsCard',
  props: {
    news: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style scoped>
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
