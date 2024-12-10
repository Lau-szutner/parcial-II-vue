<template>
  <div class="container d-flex flex-column align-items-center col-12">
    <h2 class="m-5 text-white">Películas Favoritas</h2>
    <div v-if="favorites && favorites.length" class="container">
      <div class="row">
        <div v-for="(movie, index) in favorites" :key="movie.id" class="col-12 col-md-4">
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
    <div v-else class="alert alert-warning">No hay películas favoritas seleccionadas.</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      favorites: [] // Películas favoritas extraídas del localStorage
    }
  },
  methods: {
    getImageUrl(posterPath) {
      return posterPath ? `https://image.tmdb.org/t/p/w500/${posterPath}` : 'placeholder.jpg'
    },
    loadFavoritesFromLocalStorage() {
      const storedFavorites = localStorage.getItem('favorites')
      if (storedFavorites) {
        this.favorites = JSON.parse(storedFavorites)
      }
    }
  },
  mounted() {
    this.loadFavoritesFromLocalStorage()
  }
}
</script>
