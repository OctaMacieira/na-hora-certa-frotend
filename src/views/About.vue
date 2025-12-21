<template>
  <div class="about-container">
    <h2 class="page-title">{{ pageTitle }}</h2>
    
    <div class="about-content">
      <section class="about-section">
        <h3>{{ aboutInfo.title }}</h3>
        <p class="about-description">{{ aboutInfo.description }}</p>
      </section>
      
      <section class="about-section">
        <h3>Nossa Missão</h3>
        <p class="about-description">{{ aboutInfo.mission }}</p>
      </section>
      
      <section class="about-section">
        <h3>Nossos Serviços</h3>
        <ul class="services-list">
          <li 
            v-for="(service, index) in aboutInfo.services" 
            :key="index" 
            class="service-item"
          >
            <span class="checkmark">✓</span> {{ service }}
          </li>
        </ul>
      </section>
      
      <section class="about-section cta-section">
        <h3>Pronto para começar?</h3>
        <p>Cadastre sua sala ou encontre o espaço perfeito para seu negócio!</p>
        <div class="cta-buttons">
          <RouterLink to="/cadastrar-sala">
            <BaseButton>Cadastrar Sala</BaseButton>
          </RouterLink>
          <RouterLink to="/home">
            <BaseButton variant="secondary">Ver Salas Disponíveis</BaseButton>
          </RouterLink>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import BaseButton from '../components/BaseButton.vue'

const pageTitle = ref('Quem Somos')

const aboutInfo = ref({
  title: 'Na Hora Certa - Aluguel de Salas',
  description: 'Somos uma plataforma especializada em conectar profissionais que precisam de espaços comerciais com proprietários que desejam alugar suas salas.',
  mission: 'Nossa missão é facilitar o processo de locação de salas comerciais, oferecendo transparência, praticidade e segurança para ambas as partes.',
  services: [
    'Aluguel de salas comerciais por período',
    'Divulgação de espaços disponíveis',
    'Gestão simplificada de contratos',
    'Suporte completo no processo de locação'
  ]
})
</script>

<style scoped>
/* Estilos específicos podem ser adicionados aqui */
</style>
