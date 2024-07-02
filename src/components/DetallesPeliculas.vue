<template>
  <div class="container col-6">
    <div v-if="movie" class="card mb-3">
      <div class="row no-gutters">
        <div class="col-md-4">
          <img :src="getImageUrl(movie.poster_path)" class="card-img" alt="Poster de la película" />
        </div>
        <div class="col-md-8">
          <div class="card-body">
            <h5 class="card-title">{{ movie.title }}</h5>
            <p class="card-text">{{ movie.overview }}</p>
            <p class="card-text">
              <small class="text-muted">Año: {{ movie.release_date }}</small>
            </p>
            <p class="card-text">
              <small class="text-muted">Puntuación: {{ movie.vote_average }}</small>
            </p>
            <button @click="closeDetails" class="btn btn-primary">Cerrar</button>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <p>No se ha recibido ninguna película.</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    movie: {
      type: Object,
      required: true
    }
  },
  methods: {
    getImageUrl(posterPath) {
      return posterPath ? `https://image.tmdb.org/t/p/w500/${posterPath}` : 'placeholder.jpg'
    },
    closeDetails() {
      // Emitir un evento para notificar al componente padre que se desea cerrar el componente detalles
      this.$emit('close')
    }
  },
  mounted() {
    if (!this.movie) {
      console.warn('El prop "movie" no se ha recibido correctamente.')
    } else {
      console.log('Prop "movie" recibido:', this.movie)
    }
  }
}
</script>

<style scoped>
/* Estilos específicos para este componente */
</style>
