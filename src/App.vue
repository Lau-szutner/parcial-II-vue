<template>
  <Navbar />
  <main>
    <RouterView></RouterView>
  </main>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
import About from '@/components/About.vue'

export default {
  name: 'App',
  components: {
    Navbar, // Registra el componente aquí
    About
  }
}
</script>

<style scoped></style>
