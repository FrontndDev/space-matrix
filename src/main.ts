import { createApp } from 'vue'
import './assets/scss/style.scss'
import App from './App.vue'
import router from "./router";
import store from "./store";
import { createI18n } from 'vue-i18n'
import { languages } from '@/i18n'

const messages = Object.assign(languages)

const i18n = createI18n({
  locale: 'ru',
  messages,
  fallbackLocale: 'en'
})

const app = createApp(App)

app
  .use(i18n)
  .use(router)
  .use(store)
  .mount('#matrix-app')
