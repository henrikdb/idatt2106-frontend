<script setup lang="ts">
import { ref } from 'vue'

const emit = defineEmits(['inputChangeEvent'])
const props = defineProps({
  label: {
    type: String,
    default: ''
  },
  type: {
    type: String,
    default: 'text'
  },
  placeholder: {
    type: String,
    default: ''
  },
  inputId: {
    type: String,
    required: true
  },
  modelValue: {},
  min: {
    type: String,
    required: false
  },
  max: {
    type: String,
    required: false
  },
  pattern: {
    type: String,
    default: null
  },
  validMessage: {
    type: String,
    default: ''
  },
  invalidMessage: {
    type: String,
    default: ''
  },
  required: {
    type: Boolean,
    default: true
  },
  inputClass: {
    type: String,
    default: 'form-control'
  }
})

// Form reference in order to display validations input
const formRef = ref()

/**
 * Adds the "was-validated" class to the input element, and emits
 * an 'inputChangeEvent' to parent component.
 *
 * @param event The input event object
 */
const onInputEvent = (event: any) => {
  formRef.value.classList.add('was-validated')
  emit('inputChangeEvent', event.target.value)
}
</script>

<template>
  <div ref="formRef">
    <label :for="inputId" data-cy="bi-label">{{ label }}</label>
    <input
      :value="modelValue"
      @input="onInputEvent"
      :type="type"
      :class="inputClass"
      :placeholder="placeholder"
      :id="inputId"
      :min="min"
      :max="max"
      :pattern="pattern"
      :required="required"
      data-cy="bi-input"
    />
    <div data-cy="bi-valid-msg" class="valid-feedback">{{ validMessage }}</div>
    <div data-cy="bi-invalid-msg" class="invalid-feedback" id="invalid">{{ invalidMessage }}</div>
  </div>
</template>

<style scoped></style>
