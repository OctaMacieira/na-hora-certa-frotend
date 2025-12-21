<template>
  <Teleport to="body">
    <Transition name="modal">
      <div v-if="show" class="modal-overlay" @click="closeModal">
        <div class="modal-container" @click.stop>
          <div class="modal-header">
            <h3>Entre em Contato</h3>
            <button class="close-button" @click="closeModal">&times;</button>
          </div>
          
          <div class="modal-body">
            <div class="contact-info">
              <div class="phone-section">
                <span class="phone-icon">📱</span>
                <div class="phone-details">
                  <p class="phone-label">Telefone para contato:</p>
                  <p class="phone-number">{{ formattedPhone }}</p>
                </div>
              </div>
              
              <div class="divider"></div>
              
              <div class="whatsapp-section">
                <p class="whatsapp-label">Converse conosco pelo WhatsApp:</p>
                <a 
                  :href="whatsappLink" 
                  target="_blank"
                  rel="noopener noreferrer"
                  class="whatsapp-button"
                >
                  <svg class="whatsapp-icon" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                  </svg>
                  <span>Abrir conversa no WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
          
          <div class="modal-footer">
            <BaseButton variant="secondary" @click="closeModal">
              Fechar
            </BaseButton>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { computed } from 'vue'
import BaseButton from './BaseButton.vue'

const props = defineProps({
  show: {
    type: Boolean,
    default: false
  },
  phone: {
    type: String,
    default: '21987654321' // Número genérico RJ
  }
})

const emit = defineEmits(['close'])

const formattedPhone = computed(() => {
  // Formata: (21) 98765-4321
  const clean = props.phone.replace(/\D/g, '')
  if (clean.length === 11) {
    return `(${clean.slice(0, 2)}) ${clean.slice(2, 7)}-${clean.slice(7)}`
  }
  return props.phone
})

const whatsappLink = computed(() => {
  const clean = props.phone.replace(/\D/g, '')
  const message = encodeURIComponent('Olá! Vi a sala no site Na Hora Certa e gostaria de mais informações.')
  return `https://wa.me/55${clean}?text=${message}`
})

const closeModal = () => {
  emit('close')
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  padding: 1rem;
}

.modal-container {
  background: white;
  border-radius: 1rem;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  max-width: 500px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  animation: slideUp 0.3s ease-out;
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  border-bottom: 1px solid var(--border-color);
}

.modal-header h3 {
  margin: 0;
  color: var(--text-primary);
  font-size: 1.5rem;
}

.close-button {
  background: none;
  border: none;
  font-size: 2rem;
  color: var(--text-secondary);
  cursor: pointer;
  padding: 0;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  transition: all 0.2s;
}

.close-button:hover {
  background-color: var(--background);
  color: var(--text-primary);
}

.modal-body {
  padding: 2rem 1.5rem;
}

.contact-info {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.phone-section {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.5rem;
  background: linear-gradient(135deg, rgba(37, 99, 235, 0.05), rgba(59, 130, 246, 0.05));
  border-radius: 0.75rem;
  border: 1px solid var(--border-color);
}

.phone-icon {
  font-size: 2.5rem;
}

.phone-details {
  flex: 1;
}

.phone-label {
  font-size: 0.875rem;
  color: var(--text-secondary);
  margin: 0 0 0.25rem 0;
}

.phone-number {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--primary-color);
  margin: 0;
  letter-spacing: 0.5px;
}

.divider {
  height: 1px;
  background: linear-gradient(90deg, transparent, var(--border-color), transparent);
}

.whatsapp-section {
  text-align: center;
}

.whatsapp-label {
  font-size: 0.95rem;
  color: var(--text-secondary);
  margin: 0 0 1rem 0;
}

.whatsapp-button {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem 2rem;
  background: linear-gradient(135deg, #25D366, #20BA5A);
  color: white;
  text-decoration: none;
  border-radius: 0.75rem;
  font-weight: 600;
  font-size: 1rem;
  transition: all 0.3s;
  box-shadow: 0 4px 6px -1px rgba(37, 211, 102, 0.3);
}

.whatsapp-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 15px -3px rgba(37, 211, 102, 0.4);
}

.whatsapp-button:active {
  transform: translateY(0);
}

.whatsapp-icon {
  width: 24px;
  height: 24px;
  flex-shrink: 0;
}

.modal-footer {
  padding: 1rem 1.5rem;
  border-top: 1px solid var(--border-color);
  display: flex;
  justify-content: flex-end;
}

/* Transições */
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

/* Responsivo */
@media (max-width: 640px) {
  .modal-container {
    margin: 0;
    border-radius: 1rem 1rem 0 0;
    align-self: flex-end;
  }
  
  .phone-number {
    font-size: 1.25rem;
  }
  
  .whatsapp-button {
    padding: 0.875rem 1.5rem;
    font-size: 0.9rem;
  }
}
</style>
