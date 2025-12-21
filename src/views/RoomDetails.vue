<template>
  <div class="room-details-container">
    <!-- Loading -->
    <div v-if="loading" class="loading">
      <p>Carregando detalhes da sala...</p>
    </div>
    
    <!-- Error -->
    <div v-if="error" class="error-message">
      <p>{{ error }}</p>
      <BaseButton @click="goBack">Voltar para Home</BaseButton>
    </div>
    
    <!-- Detalhes da Sala -->
    <div v-if="!loading && !error && room" class="room-details">
      <div class="details-header">
        <BaseButton variant="back" @click="goBack">← Voltar</BaseButton>
        <h2 class="page-title">Detalhes da Sala</h2>
      </div>
      
      <div class="details-content">
        <!-- Informações Principais -->
        <section class="details-section highlight-section">
          <h3 class="neighborhood-title">{{ getNeighborhood() }}</h3>
          <p class="address-detail">{{ room.address }}</p>
          <p class="zip-code">CEP: {{ room.zip_code }}</p>
        </section>
        
        <!-- Preço -->
        <section class="details-section price-section">
          <h3>Valor Mensal</h3>
          <div class="price-breakdown">
            <div class="price-item">
              <span>Condomínio:</span>
              <span class="price-value">R$ {{ formatPrice(room.condominium_fee) }}</span>
            </div>
            <div class="price-item">
              <span>IPTU:</span>
              <span class="price-value">R$ {{ formatPrice(room.iptu) }}</span>
            </div>
            <div class="price-item total">
              <span>Total:</span>
              <span class="price-value">R$ {{ formatPrice(calculateTotal()) }}</span>
            </div>
          </div>
        </section>
        
        <!-- Características -->
        <section class="details-section">
          <h3>Características</h3>
          <div class="characteristics-grid">
            <div class="characteristic-item">
              <span class="characteristic-icon">📐</span>
              <div class="characteristic-info">
                <strong>Tamanho</strong>
                <p>{{ room.size }}m²</p>
              </div>
            </div>
            
            <div class="characteristic-item">
              <span class="characteristic-icon">🚻</span>
              <div class="characteristic-info">
                <strong>Banheiros</strong>
                <p>{{ room.number_of_bathrooms }}</p>
              </div>
            </div>
            
            <div class="characteristic-item">
              <span class="characteristic-icon">{{ room.has_parking_space ? '✓' : '✗' }}</span>
              <div class="characteristic-info">
                <strong>Vaga de Estacionamento</strong>
                <p>{{ room.has_parking_space ? 'Sim' : 'Não' }}</p>
              </div>
            </div>
            
            <div class="characteristic-item">
              <span class="characteristic-icon">{{ room.has_reception ? '✓' : '✗' }}</span>
              <div class="characteristic-info">
                <strong>Recepção</strong>
                <p>{{ room.has_reception ? 'Sim' : 'Não' }}</p>
              </div>
            </div>
            
            <div class="characteristic-item">
              <span class="characteristic-icon">{{ room.doctors_office ? '✓' : '✗' }}</span>
              <div class="characteristic-info">
                <strong>Consultório Médico</strong>
                <p>{{ room.doctors_office ? 'Sim' : 'Não' }}</p>
              </div>
            </div>
            
            <div class="characteristic-item">
              <span class="characteristic-icon">{{ room.documents_ok ? '✓' : '✗' }}</span>
              <div class="characteristic-info">
                <strong>Documentação</strong>
                <p>{{ room.documents_ok ? 'Em ordem' : 'Pendente' }}</p>
              </div>
            </div>
          </div>
        </section>
        
        <!-- Ações -->
        <section class="details-section actions-section">
          <h3>Interessado?</h3>
          <p>Entre em contato para agendar uma visita e conhecer melhor o espaço!</p>
          <div class="action-buttons">
            <BaseButton @click="showContactModal = true">Entrar em Contato</BaseButton>
            <BaseButton variant="secondary" @click="goBack">Ver Outras Salas</BaseButton>
          </div>
        </section>
      </div>
    </div>
    
    <!-- Modal de Contato -->
    <ContactModal 
      :show="showContactModal" 
      @close="showContactModal = false"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useRoomService } from '../composables/useRoomService'
import { mockRooms } from '../data/mockRooms.js'
import BaseButton from '../components/BaseButton.vue'
import ContactModal from '../components/ContactModal.vue'

const router = useRouter()
const route = useRoute()
const { getRoomById } = useRoomService()

const room = ref(null)
const loading = ref(true)
const error = ref(null)
const roomId = route.params.id
const showContactModal = ref(false)

// Carregar detalhes da sala dos dados mockados
const loadRoomDetails = () => {
  loading.value = true
  error.value = null
  
  // Simulando um pequeno delay para feedback visual
  setTimeout(() => {
    room.value = getMockRoom(roomId)
    loading.value = false
    
    if (!room.value) {
      error.value = 'Sala não encontrada.'
    } else {
      console.log('Dados mockados carregados para sala:', roomId)
    }
  }, 300)
}

// Calcular valor total
const calculateTotal = () => {
  if (room.value) {
    return (room.value.condominium_fee || 0) + (room.value.iptu || 0)
  }
  return 0
}

// Formatar preço
const formatPrice = (value) => {
  return (value || 0).toFixed(2)
}

// Voltar para home
const goBack = () => {
  router.push('/home')
}

// Extrair bairro do endereço
const getNeighborhood = () => {
  if (room.value && room.value.address) {
    const parts = room.value.address.split(',')
    return parts.length > 1 ? parts[parts.length - 2].trim() : 'Não informado'
  }
  return 'Não informado'
}

// Buscar sala nos dados mock
const getMockRoom = (id) => {
  if (!mockRooms || mockRooms.length === 0) {
    return null
  }
  
  const foundRoom = mockRooms.find(r => r.id === id)
  return foundRoom || null
}

// Inicializar ao montar componente
onMounted(() => {
  loadRoomDetails()
})
</script>

<style scoped>
/* Estilos específicos podem ser adicionados aqui */
</style>
