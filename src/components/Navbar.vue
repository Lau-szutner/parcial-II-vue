<template>
  <nav class="navbar navbar-expand-lg bg-warning">
    <div class="container-fluid">
      <RouterLink to="/" class="navbar-brand">My movies app</RouterLink>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item">
            <RouterLink to="/" class="nav-link" active-class="active">Home</RouterLink>
          </li>

          <li class="nav-item">
            <RouterLink to="/detalle" class="nav-link" active-class="active">Detalle</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink to="/favoritos" class="nav-link" active-class="active"
              >Favoritos</RouterLink
            >
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'Navbar' // Nombre del componente
}
</script>

<style scoped></style>
