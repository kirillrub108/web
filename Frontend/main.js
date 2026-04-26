import { createApp, h } from 'vue';
import App from './App.vue';
import router from './src/router';
import '@mdi/font/css/materialdesignicons.css';

// Vuetify
import 'vuetify/styles';
import { createVuetify } from 'vuetify';
import { aliases, mdi } from 'vuetify/iconsets/mdi';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import { ru } from 'vuetify/locale';

import IconFire from './src/components/icons/IconFire.vue';
import IconHome from './src/components/icons/IconHome.vue';
import IconMegaphone from './src/components/icons/IconMegaphone.vue';

const customSvgNameToComponent = {
  fire: IconFire,
  home: IconHome,
  megaphone: IconMegaphone,
};

const custom = {
  component: (props) => h(customSvgNameToComponent[props.icon]),
};

const vuetify = createVuetify({
  components,
  directives,
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: { mdi, custom },
  },
  locale: {
    locale: 'ru',
    messages: { ru },
    fallback: 'ru'
  },
  theme: {
    defaultTheme: 'light'
  }
});

createApp(App).use(router).use(vuetify).mount('#app');
