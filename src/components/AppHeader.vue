<template>
  <header class="header">
    <div class="header-container">
      <div class="logo" @click="goHome">
        <h1>Na Hora Certa</h1>
      </div>
      <nav class="nav-menu">
        <RouterLink to="/home" class="nav-link">Home</RouterLink>
        <RouterLink to="/quem-somos" class="nav-link">Quem Somos</RouterLink>
        <RouterLink to="/cadastrar-sala" class="nav-link">Cadastrar Sala</RouterLink>
      </nav>
    </div>
  </header>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const goHome = () => {
  router.push('/home')
}
</script>

<style scoped>
.logo {
  cursor: pointer;
}
</style>
