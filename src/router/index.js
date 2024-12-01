import { createRouter, createWebHistory } from 'vue-router' // Asegúrate de importar createWebHistory
import about from '@/components/About.vue'
import Home from '@/components/Home.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/about', component: about }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
