<template>
  <div class="register-container">
    <h2 class="page-title">Cadastrar Nova Sala</h2>
    
    <!-- Success Message -->
    <div v-if="success" class="success-message">
      <p>✓ Sala cadastrada com sucesso! Redirecionando...</p>
    </div>
    
    <!-- Error Message -->
    <div v-if="error" class="error-message">
      <p>{{ error }}</p>
    </div>
    
    <!-- Formulário -->
    <form @submit.prevent="submitForm" novalidate class="register-form">
      
      <!-- CEP -->
      <div class="form-group">
        <label for="zip_code">CEP *</label>
        <input 
          type="text" 
          id="zip_code" 
          v-model="room.zip_code" 
          @blur="searchAddress"
          placeholder="00000-000"
          maxlength="9"
          required
          class="form-input"
        />
        <span v-if="showError('zip_code')" class="error-text">
          CEP é obrigatório
        </span>
      </div>
      
      <!-- Endereço -->
      <div class="form-group">
        <label for="address">Endereço Completo *</label>
        <input 
          type="text" 
          id="address" 
          v-model="room.address" 
          placeholder="Rua, Número, Bairro, Cidade"
          required
          class="form-input"
        />
        <span v-if="showError('address')" class="error-text">
          Endereço é obrigatório
        </span>
      </div>
      
      <!-- Tamanho -->
      <div class="form-group">
        <label for="size">Tamanho (m²) *</label>
        <input 
          type="number" 
          id="size" 
          v-model.number="room.size" 
          placeholder="50"
          min="1"
          required
          class="form-input"
        />
        <span v-if="showError('size')" class="error-text">
          Tamanho é obrigatório
        </span>
      </div>
      
      <!-- Taxa de Condomínio -->
      <div class="form-group">
        <label for="condominium_fee">Taxa de Condomínio (R$) *</label>
        <input 
          type="number" 
          id="condominium_fee" 
          v-model.number="room.condominium_fee" 
          placeholder="500.00"
          step="0.01"
          min="0"
          required
          class="form-input"
        />
        <span v-if="showError('condominium_fee')" class="error-text">
          Taxa de condomínio é obrigatória
        </span>
      </div>
      
      <!-- IPTU -->
      <div class="form-group">
        <label for="iptu">IPTU (R$) *</label>
        <input 
          type="number" 
          id="iptu" 
          v-model.number="room.iptu" 
          placeholder="200.00"
          step="0.01"
          min="0"
          required
          class="form-input"
        />
        <span v-if="showError('iptu')" class="error-text">
          IPTU é obrigatório
        </span>
      </div>
      
      <!-- Número de Banheiros -->
      <div class="form-group">
        <label for="number_of_bathrooms">Número de Banheiros *</label>
        <input 
          type="number" 
          id="number_of_bathrooms" 
          v-model.number="room.number_of_bathrooms" 
          placeholder="1"
          min="1"
          required
          class="form-input"
        />
      </div>
      
      <!-- Toggle Sliders -->
      <ToggleSwitch
        v-model="room.has_parking_space"
        label="Possui vaga de estacionamento"
        id="has_parking_space"
      />
      
      <ToggleSwitch
        v-model="room.has_reception"
        label="Possui recepção"
        id="has_reception"
      />
      
      <ToggleSwitch
        v-model="room.doctors_office"
        label="Adequado para consultório médico"
        id="doctors_office"
      />
      
      <ToggleSwitch
        v-model="room.documents_ok"
        label="Documentação em ordem"
        id="documents_ok"
      />
      
      <!-- Botões -->
      <div class="form-actions">
        <BaseButton 
          type="submit"
          :disabled="loading"
        >
          {{ loading ? 'Cadastrando...' : 'Cadastrar Sala' }}
        </BaseButton>
        <BaseButton 
          variant="secondary"
          type="button" 
          @click="resetForm"
          :disabled="loading"
        >
          Limpar Formulário
        </BaseButton>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useRoomService } from '../composables/useRoomService'
import BaseButton from '../components/BaseButton.vue'
import ToggleSwitch from '../components/ToggleSwitch.vue'

const router = useRouter()
const { createRoom, getAddressByZipCode } = useRoomService()

const room = reactive({
  zip_code: '',
  address: '',
  size: null,
  documents_ok: false,
  condominium_fee: null,
  iptu: null,
  number_of_bathrooms: 1,
  has_parking_space: false,
  has_reception: false,
  doctors_office: false
})

const loading = ref(false)
const error = ref(null)
const success = ref(false)
const touched = ref({})

// Buscar endereço pelo CEP
const searchAddress = async () => {
  if (room.zip_code && room.zip_code.length >= 8) {
    try {
      const data = await getAddressByZipCode(room.zip_code)
      if (!data.erro) {
        const addressParts = [
          data.logradouro,
          data.bairro,
          data.localidade,
          data.uf
        ].filter(Boolean)
        
        room.address = addressParts.join(', ')
      }
    } catch (err) {
      console.error('Erro ao buscar CEP:', err)
    }
  }
}

// Validar campo
const showError = (field) => {
  return touched.value[field] && !room[field]
}

// Submeter formulário
const submitForm = async () => {
  // Marcar todos os campos como touched
  Object.keys(room).forEach(key => {
    touched.value[key] = true
  })
  
  // Validar campos obrigatórios
  if (!room.zip_code || !room.address || !room.size || 
      room.condominium_fee === null || room.iptu === null) {
    error.value = 'Por favor, preencha todos os campos obrigatórios.'
    return
  }
  
  loading.value = true
  error.value = null
  
  try {
    await createRoom(room)
    loading.value = false
    success.value = true
    
    // Redirecionar para home após 2 segundos
    setTimeout(() => {
      router.push('/home')
    }, 2000)
  } catch (err) {
    console.error('Erro ao cadastrar sala:', err)
    error.value = 'Erro ao cadastrar sala. Tente novamente.'
    loading.value = false
  }
}

// Resetar formulário
const resetForm = () => {
  Object.assign(room, {
    zip_code: '',
    address: '',
    size: null,
    documents_ok: false,
    condominium_fee: null,
    iptu: null,
    number_of_bathrooms: 1,
    has_parking_space: false,
    has_reception: false,
    doctors_office: false
  })
  touched.value = {}
  error.value = null
  success.value = false
}
</script>

<style scoped>
/* Estilos específicos da página de registro */
</style>
