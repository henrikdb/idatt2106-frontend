<script setup lang="ts">

const emit = defineEmits(['inputChangeEvent']);
const props = defineProps({
  label: {
    type: String,
    default: ""
  },
  type: {
    type: String,
    default: "text"
  },
  placeholder: {
    type: String,
    default: ""
  },
  inputId: {
    type: String,
    required: true
  },
  modelValue: {
    type: String,
    default: ""
  },
  min: {
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
  }
});

const onInputEvent = (event: any) => {
  emit('inputChangeEvent', event.target.value)
}
</script>

<template>
  <div>
    <label :for="inputId">{{ label }}</label>
    <input :value="modelValue"
           @input="onInputEvent"
           :type="type"
           class="form-control"
           :placeholder="placeholder"
           :id="inputId" required
           :min="min"
           :pattern="pattern"/>
    <div class="valid-feedback">{{ validMessage }}</div>
    <div class="invalid-feedback">{{ invalidMessage }}</div>
  </div>
</template>

<style scoped>

</style>