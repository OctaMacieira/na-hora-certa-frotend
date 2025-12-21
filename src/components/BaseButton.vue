<template>
  <component
    :is="tag"
    :class="['btn', variantClass]"
    :disabled="disabled"
    :type="type"
    @click="handleClick"
  >
    <slot />
  </component>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  variant: {
    type: String,
    default: 'primary',
    validator: (value) => ['primary', 'secondary', 'back', 'pagination', 'page'].includes(value)
  },
  disabled: {
    type: Boolean,
    default: false
  },
  type: {
    type: String,
    default: 'button'
  },
  tag: {
    type: String,
    default: 'button'
  },
  active: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['click'])

const variantClass = computed(() => {
  const classes = {
    'primary': 'btn-primary',
    'secondary': 'btn-secondary',
    'back': 'btn-back',
    'pagination': 'btn-pagination',
    'page': 'btn-page'
  }
  
  const baseClass = classes[props.variant] || 'btn-primary'
  return props.active ? `${baseClass} active` : baseClass
})

const handleClick = (event) => {
  if (!props.disabled) {
    emit('click', event)
  }
}
</script>

<style scoped>
/* Estilos já estão definidos globalmente em styles.css */
</style>
