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
  isValid: {
    type: Boolean,
    default: false
  },
  min: {
    type: String,
    required: false
  }
});

const onInputEvent = (event: any) => {
  emit('inputChangeEvent', event.target.value)
}
</script>

<template>
  <div>
    <label :for="inputId">{{ label }}</label>
    <input :value="props.modelValue"
           @input="onInputEvent"
           :type="props.type"
           class="form-control"
           :placeholder="props.placeholder"
           :id="inputId" required
           :min="min"
    />
    <div v-if="props.isValid" class="invalid-feedback">Invalid {{ label }}</div>
    <div v-else class="valid-feedback">Valid {{ label }}</div>
  </div>
</template>

<style scoped>

</style>