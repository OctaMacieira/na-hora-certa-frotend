<template>
  <div class="home-container">
    <h2 class="page-title">Salas Disponíveis para Aluguel</h2>
    
    <!-- Loading -->
    <div v-if="loading" class="loading">
      <p>Carregando salas...</p>
    </div>
    
    <!-- Error -->
    <div v-if="error" class="error-message">
      <p>{{ error }}</p>
      <BaseButton @click="loadRooms">Tentar Novamente</BaseButton>
    </div>
    
    <!-- Grade de Cards -->
    <div v-if="!loading && !error" class="rooms-grid">
      <RoomCard
        v-for="room in rooms"
        :key="room.id"
        :room="room"
        @click="viewRoomDetails"
      />
    </div>
    
    <!-- Mensagem quando não há salas -->
    <div v-if="!loading && !error && allRooms.length === 0" class="no-rooms">
      <p>Nenhuma sala disponível no momento.</p>
      <RouterLink to="/cadastrar-sala">
        <BaseButton>Cadastrar Primeira Sala</BaseButton>
      </RouterLink>
    </div>

    <!-- Paginação -->
    <div v-if="!loading && !error && allRooms.length > 0" class="pagination">
      <BaseButton 
        variant="pagination"
        :disabled="currentPage === 1"
        @click="prevPage"
      >
        ‹ Anterior
      </BaseButton>
      
      <div class="page-numbers">
        <BaseButton
          v-for="page in totalPages"
          :key="page"
          variant="page"
          :active="currentPage === page"
          @click="goToPage(page)"
        >
          {{ page }}
        </BaseButton>
      </div>
      
      <BaseButton 
        variant="pagination"
        :disabled="currentPage === totalPages"
        @click="nextPage"
      >
        Próxima ›
      </BaseButton>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useRoomService } from '../composables/useRoomService'
import { mockRooms } from '../data/mockRooms.js'
import BaseButton from '../components/BaseButton.vue'
import RoomCard from '../components/RoomCard.vue'

const router = useRouter()
const { getAllRooms } = useRoomService()

const allRooms = ref([])
const loading = ref(true)
const error = ref(null)
const currentPage = ref(1)
const itemsPerPage = 6

// Calcular total de páginas
const totalPages = computed(() => {
  return Math.ceil(allRooms.value.length / itemsPerPage)
})

// Salas da página atual
const rooms = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  const end = start + itemsPerPage
  return allRooms.value.slice(start, end)
})

// Navegar para próxima página
const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}

// Navegar para página anterior
const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}

// Ir para página específica
const goToPage = (page) => {
  currentPage.value = page
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

// Carregar salas dos dados mockados
const loadRooms = () => {
  loading.value = true
  error.value = null
  
  // Simulando um pequeno delay para feedback visual
  setTimeout(() => {
    allRooms.value = [...mockRooms]
    loading.value = false
    console.log('Dados mockados carregados:', mockRooms.length, 'salas')
  }, 300)
}

// Navegar para detalhes da sala
const viewRoomDetails = (roomId) => {
  router.push(`/sala/${roomId}`)
}

// Inicializar ao montar componente
onMounted(() => {
  loadRooms()
})
</script>

<style scoped>
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  margin-top: 3rem;
  padding: 2rem 0;
}

.btn-pagination {
  padding: 0.5rem 1rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s;
}

.btn-pagination:hover:not(:disabled) {
  background-color: #0056b3;
}

.btn-pagination:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.page-numbers {
  display: flex;
  gap: 0.5rem;
}

.btn-page {
  padding: 0.5rem 0.75rem;
  background-color: #f8f9fa;
  color: #333;
  border: 1px solid #dee2e6;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem;
  min-width: 40px;
  transition: all 0.3s;
}

.btn-page:hover {
  background-color: #e9ecef;
  border-color: #007bff;
}

.btn-page.active {
  background-color: #007bff;
  color: white;
  border-color: #007bff;
}
</style>
