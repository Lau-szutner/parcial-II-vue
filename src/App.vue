<template>
  <div>
    <h2>Películas Populares</h2>
    <div class="container">
      <div class="row">
        <div
          v-for="(movie, index) in movies"
          :key="movie.id"
          class="col-12 col-md-4"
          v-show="index < 9"
        >
          <div class="card mb-3">
            <img
              :src="getImageUrl(movie.poster_path)"
              class="card-img-top"
              alt="Poster de la película"
            />
            <div class="card-body">
              <h5 class="card-title">{{ movie.title }}</h5>
              <p class="card-text">{{ movie.overview }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios'

const apiKey = '41e053e60105c1e38139e0027f3a09a9'
const apiUrl = 'https://api.themoviedb.org/3'

export default {
  data() {
    return {
      movies: [] // las películas populares
    }
  },
  mounted() {
    this.fetchPopularMovies()
  },
  methods: {
    fetchPopularMovies() {
      axios
        .get(`${apiUrl}/movie/popular`, {
          params: {
            api_key: apiKey
          }
        })
        .then((response) => {
          this.movies = response.data.results
        })
        .catch((error) => {
          console.error('Error al obtener películas populares:', error)
        })
    },
    getImageUrl(posterPath) {
      return posterPath ? `https://image.tmdb.org/t/p/w500/${posterPath}` : 'placeholder.jpg'
    }
  }
}
</script>

<style scoped>
/* Estilos específicos para este componente */
</style>
