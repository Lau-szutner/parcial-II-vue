<template>
  <DetallesPeliculas :movie="selectedMovie" v-if="selectedMovie" @close="closeDetails" />
  <div class="container d-flex flex-column align-items-center col-12">
    <h2 class="m-5 text-white">Películas Populares</h2>
    <div class="input-group mb-3 gap-2 bg-dark p-4 container d-flex flex-column flex-lg-row">
      <input
        type="text"
        v-model="searchQuery"
        class="form-control w-100 rounded"
        placeholder="Buscar películas por título..."
      />
      <select v-model="selectedGenre" class="form-select w-100 rounded">
        <option value="">Todos los géneros</option>
        <option v-for="genre in genres" :key="genre.id" :value="genre.id">
          {{ genre.name }}
        </option>
      </select>

      <div class="d-flex col-12 justify-content-between flex-column flex-lg-row gap-2">
        <button class="btn btn-primary col-12 col-lg-5" type="button" @click="searchMovies">
          Buscar
        </button>
        <button class="btn btn-primary col-12 col-lg-5" type="button" @click="limpiarBusqueda">
          Eliminar filtro
        </button>
      </div>
    </div>

    <div class="container">
      <div class="row">
        <div
          v-for="(movie, index) in filteredMovies"
          :key="movie.id"
          class="col-12 col-md-4"
          @click="handleMovieClick(movie)"
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
import DetallesPeliculas from './components/DetallesPeliculas.vue'

const apiKey = '41e053e60105c1e38139e0027f3a09a9'
const apiUrl = 'https://api.themoviedb.org/3'

export default {
  components: {
    DetallesPeliculas
  },
  data() {
    return {
      movies: [], // Aquí se almacenarán las películas populares
      genres: [], // Aquí se almacenarán los géneros de películas
      selectedMovie: null, // Almacena los detalles de la película seleccionada
      searchQuery: '',
      selectedGenre: ''
    }
  },
  mounted() {
    this.fetchPopularMovies()
    this.fetchGenres()
  },
  computed: {
    filteredMovies() {
      if (this.selectedGenre) {
        return this.movies.filter((movie) => movie.genre_ids.includes(parseInt(this.selectedGenre)))
      }
      return this.movies
    }
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
    fetchGenres() {
      axios
        .get(`${apiUrl}/genre/movie/list`, {
          params: {
            api_key: apiKey
          }
        })
        .then((response) => {
          this.genres = response.data.genres
        })
        .catch((error) => {
          console.error('Error al obtener géneros:', error)
        })
    },
    limpiarBusqueda() {
      this.searchQuery = '' // Reinicia la consulta de búsqueda
      this.selectedGenre = '' // Reinicia el filtro de género
      this.fetchPopularMovies() // Carga las películas populares nuevamente
    },
    searchMovies() {
      let params = {
        api_key: apiKey
      }

      if (this.searchQuery.trim()) {
        params.query = this.searchQuery
        axios
          .get(`${apiUrl}/search/movie`, {
            params
          })
          .then((response) => {
            this.movies = response.data.results
          })
          .catch((error) => {
            console.error('Error al buscar películas:', error)
          })
      } else {
        this.fetchPopularMovies()
      }
    },
    showMovieDetails(movie) {
      this.selectedMovie = movie
      this.scrollToTop() // Llama a la función para hacer scroll hacia arriba
    },
    closeDetails() {
      this.selectedMovie = null // Cambia el estado para cerrar el componente detalles
    },
    getImageUrl(posterPath) {
      return posterPath ? `https://image.tmdb.org/t/p/w500/${posterPath}` : 'placeholder.jpg'
    },
    scrollToTop() {
      // Hacer scroll hacia arriba cuando se muestran detalles de la película
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
    },
    handleMovieClick(movie) {
      this.showMovieDetails(movie)
    }
  }
}
</script>

<style scoped>
.card:hover {
  cursor: pointer;
}
</style>
