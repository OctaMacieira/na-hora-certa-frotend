<template>
  <div class="form-group toggle-group">
    <label class="toggle-label">
      <span class="toggle-text">{{ label }}</span>
      <div class="toggle-switch">
        <input 
          type="checkbox" 
          :id="id"
          :checked="modelValue"
          @change="handleChange"
          class="toggle-input"
        />
        <label :for="id" class="toggle-slider"></label>
      </div>
    </label>
  </div>
</template>

<script setup>
const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  },
  label: {
    type: String,
    required: true
  },
  id: {
    type: String,
    required: true
  }
})

const emit = defineEmits(['update:modelValue'])

const handleChange = (event) => {
  emit('update:modelValue', event.target.checked)
}
</script>

<style scoped>
/* Toggle Slider Styles */
.toggle-group {
  margin-bottom: 1.5rem;
}

.toggle-label {
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  user-select: none;
}

.toggle-text {
  font-size: 1rem;
  color: var(--text-primary);
  font-weight: 500;
}

.toggle-switch {
  position: relative;
  display: inline-block;
  width: 56px;
  height: 28px;
}

.toggle-input {
  opacity: 0;
  width: 0;
  height: 0;
}

.toggle-slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #cbd5e1;
  transition: 0.3s;
  border-radius: 28px;
}

.toggle-slider:before {
  position: absolute;
  content: "";
  height: 20px;
  width: 20px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  transition: 0.3s;
  border-radius: 50%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.toggle-input:checked + .toggle-slider {
  background-color: var(--primary-color);
}

.toggle-input:focus + .toggle-slider {
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.2);
}

.toggle-input:checked + .toggle-slider:before {
  transform: translateX(28px);
}

.toggle-slider:hover {
  background-color: #94a3b8;
}

.toggle-input:checked + .toggle-slider:hover {
  background-color: var(--primary-hover);
}
</style>
