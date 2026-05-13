<template>
  <div class="news-card">
    <div class="news-thumb" />
    <div class="news-date">{{ formattedDate }}</div>
    <div class="news-title">{{ news.title }}</div>
  </div>
</template>

<script>
import dayjs from 'dayjs';
import 'dayjs/locale/ru';
import customParseFormat from 'dayjs/plugin/customParseFormat';

dayjs.extend(customParseFormat);
dayjs.locale('ru');

export default {
  name: 'NewsCard',
  props: {
    news: {
      type: Object,
      required: true,
    },
  },
  computed: {
    formattedDate() {
      const dateStr = this.news.date;
      if (!dateStr) return '';

      const parsed = dayjs(dateStr, 'D MMMM YYYY HH:mm', 'ru');
      if (parsed.isValid()) return parsed.format('DD.MM.YYYY');

      const fallback = dayjs(dateStr);
      if (fallback.isValid()) return fallback.format('DD.MM.YYYY');

      return dateStr;
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