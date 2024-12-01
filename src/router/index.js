import { createRouter, createWebHistory } from 'vue-router'
import About from '@/components/About.vue'
import Home from '@/components/Home.vue'
import Detalle from '../components/Detalle.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/about', component: About },
  {
    path: '/detalle',
    name: 'Detalle',
    component: Detalle,
    props: (route) => {
      try {
        // Extraemos el prop "movie" de la consulta de la ruta, lo decodificamos y lo analizamos como JSON
        return { movie: JSON.parse(decodeURIComponent(route.query.movie || '{}')) }
      } catch (e) {
        console.error('Error al analizar la propiedad "movie":', e)
        return { movie: null }
      }
    }
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
