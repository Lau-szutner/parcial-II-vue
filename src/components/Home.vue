<template>
  <div class="container d-flex flex-column align-items-center col-12">
    <h1 class="m-5 text-white">Películas Populares</h1>
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

      <div class="d-flex col-12 justify-content-between flex-column gap-2">
        <button class="btn btn-primary col-12" type="button" @click="searchMovies">Buscar</button>
        <button class="btn btn-primary col-12" type="button" @click="limpiarBusqueda">
          Eliminar filtro
        </button>
      </div>
    </div>

    <div class="container">
      <div class="row">
        <div v-for="(movie, index) in filteredMovies" :key="movie.id" class="col-12 col-md-4">
          <div class="card mb-4 shadow-sm">
            <RouterLink
              :to="{ path: '/detalle', query: { movie: JSON.stringify(movie) } }"
              style="text-decoration: none; color: inherit"
            >
              <img
                :src="getImageUrl(movie.poster_path)"
                class="card-img-top"
                alt="Poster de la película"
              />
              <div class="card-body">
                <h5 class="card-title">{{ movie.title }}</h5>
                <p class="card-text text-muted">
                  {{
                    movie.overview.length > 100
                      ? movie.overview.slice(0, 100) + '...'
                      : movie.overview
                  }}
                </p>
              </div>
            </RouterLink>
            <div class="card-footer bg-light d-flex justify-content-center">
              <button class="btn btn-outline-primary w-75" @click="toggleFavorite(movie)">
                {{ isFavorite(movie) ? 'Eliminar de Favoritos' : 'Agregar a Favoritos' }}
              </button>
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
      movies: [],
      genres: [],
      favorites: [], // Lista de películas favoritas
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
      this.searchQuery = this.selectedGenre = ''
      this.fetchPopularMovies()
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
    toggleFavorite(movie) {
      const index = this.favorites.findIndex((fav) => fav.id === movie.id)
      if (index > -1) {
        // Si ya está en favoritos, la eliminamos
        this.favorites.splice(index, 1)
      } else {
        // Si no está, la agregamos
        this.favorites.push(movie)
      }
    },
    isFavorite(movie) {
      return this.favorites.some((fav) => fav.id === movie.id)
    },
    getImageUrl(posterPath) {
      return posterPath ? `https://image.tmdb.org/t/p/w500/${posterPath}` : 'placeholder.jpg'
    }
  }
}
</script>

<style>
.card {
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;
}
.card:hover {
  transform: translateY(-10px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
}
.card-footer {
  border-top: 1px solid #ddd;
}
.btn-outline-primary {
  transition:
    background-color 0.2s ease,
    color 0.2s ease;
}
.btn-outline-primary:hover {
  background-color: #007bff;
  color: #fff;
}
</style>
