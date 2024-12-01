import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router' // Importa el archivo del router

createApp(App).use(router).mount('#app')
