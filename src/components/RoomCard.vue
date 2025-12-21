<template>
  <div 
    class="room-card" 
    @click="handleClick"
    style="cursor: pointer;"
  >
    <div class="card-header">
      <h3 class="neighborhood">{{ neighborhood }}</h3>
    </div>
    <div class="card-body">
      <p class="address">{{ room.address || 'Endereço não informado' }}</p>
      <div class="card-details">
        <span class="detail-item" v-if="room.size">
          <i class="icon">📐</i> {{ room.size }}m²
        </span>
        <span class="detail-item" v-if="room.number_of_bathrooms">
          <i class="icon">🚻</i> {{ room.number_of_bathrooms }} banheiro(s)
        </span>
        <span v-if="room.has_parking_space" class="detail-item">
          <i class="icon">🚗</i> Vaga
        </span>
      </div>
    </div>
    <div class="card-footer">
      <p class="price">R$ {{ totalPrice }}/mês</p>
      <BaseButton variant="secondary" @click.stop="handleClick">
        Ver Detalhes
      </BaseButton>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import BaseButton from './BaseButton.vue'

const props = defineProps({
  room: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['click'])

const neighborhood = computed(() => {
  if (!props.room.address || typeof props.room.address !== 'string') {
    return 'Bairro não informado'
  }
  const parts = props.room.address.split(',')
  return parts.length > 1 ? parts[parts.length - 2].trim() : 'Bairro não informado'
})

const totalPrice = computed(() => {
  const total = (props.room.condominium_fee || 0) + (props.room.iptu || 0)
  return total.toFixed(2)
})

const handleClick = () => {
  emit('click', props.room.id)
}
</script>

<style scoped>
/* Estilos do card já estão definidos globalmente */
</style>
