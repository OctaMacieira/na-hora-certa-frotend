<template>
  <div class="edit-container">
    <div class="edit-header">
      <BaseButton variant="back" @click="goBack">← Voltar</BaseButton>
      <h2 class="page-title">Editar Sala</h2>
    </div>

    <!-- Loading -->
    <div v-if="loadingRoom" class="loading">
      <p>Carregando dados da sala...</p>
    </div>

    <!-- Load Error -->
    <div v-if="loadError" class="error-message">
      <p>{{ loadError }}</p>
      <BaseButton @click="goBack">Voltar para Detalhes</BaseButton>
    </div>

    <!-- Success Message -->
    <div v-if="success" class="success-message">
      <p>✓ Sala atualizada com sucesso! Redirecionando...</p>
    </div>

    <!-- Submit Error -->
    <div v-if="submitError" class="error-message">
      <p>{{ submitError }}</p>
    </div>

    <!-- Formulário -->
    <form
      v-if="!loadingRoom && !loadError"
      @submit.prevent="submitForm"
      novalidate
      class="edit-form"
    >
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
        <BaseButton type="submit" :disabled="loading">
          {{ loading ? 'Salvando...' : 'Salvar Alterações' }}
        </BaseButton>
        <BaseButton
          variant="secondary"
          type="button"
          @click="goBack"
          :disabled="loading"
        >
          Cancelar
        </BaseButton>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useRoomService } from '../composables/useRoomService'
import BaseButton from '../components/BaseButton.vue'
import ToggleSwitch from '../components/ToggleSwitch.vue'

const router = useRouter()
const route = useRoute()
const { getRoomById, updateRoom, getAddressByZipCode } = useRoomService()

const roomId = route.params.id

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

const loadingRoom = ref(true)
const loadError = ref(null)
const loading = ref(false)
const submitError = ref(null)
const success = ref(false)
const touched = ref({})

// Carregar dados atuais da sala
const loadRoom = async () => {
  loadingRoom.value = true
  loadError.value = null

  try {
    const data = await getRoomById(roomId)
    Object.assign(room, {
      zip_code: data.zip_code ?? '',
      address: data.address ?? '',
      size: data.size ?? null,
      documents_ok: data.documents_ok ?? false,
      condominium_fee: data.condominium_fee ?? null,
      iptu: data.iptu ?? null,
      number_of_bathrooms: data.number_of_bathrooms ?? 1,
      has_parking_space: data.has_parking_space ?? false,
      has_reception: data.has_reception ?? false,
      doctors_office: data.doctors_office ?? false
    })
  } catch (err) {
    console.error('Erro ao carregar sala:', err)
    loadError.value = 'Não foi possível carregar os dados da sala. Tente novamente.'
  } finally {
    loadingRoom.value = false
  }
}

// Buscar endereço pelo CEP ao sair do campo
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

// Exibir erro de validação
const showError = (field) => {
  return touched.value[field] && !room[field]
}

// Submeter alterações
const submitForm = async () => {
  Object.keys(room).forEach((key) => {
    touched.value[key] = true
  })

  if (
    !room.zip_code ||
    !room.address ||
    !room.size ||
    room.condominium_fee === null ||
    room.iptu === null
  ) {
    submitError.value = 'Por favor, preencha todos os campos obrigatórios.'
    return
  }

  loading.value = true
  submitError.value = null

  try {
    await updateRoom(roomId, room)
    loading.value = false
    success.value = true

    setTimeout(() => {
      router.push({ name: 'room-details', params: { id: roomId } })
    }, 2000)
  } catch (err) {
    console.error('Erro ao atualizar sala:', err)
    submitError.value = 'Erro ao salvar alterações. Tente novamente.'
    loading.value = false
  }
}

// Voltar para detalhes da sala
const goBack = () => {
  router.push({ name: 'room-details', params: { id: roomId } })
}

onMounted(() => {
  loadRoom()
})
</script>

<style scoped>
/* Estilos específicos podem ser adicionados aqui */
</style>
