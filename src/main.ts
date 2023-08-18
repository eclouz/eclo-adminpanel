import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import axios from './plugins/axios'

import './index.css'
import i18n from './locales/i18n'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(i18n)
app.use(axios, {
    baseUrl: 'http://localhost:5000',
})
app.mount('#app')