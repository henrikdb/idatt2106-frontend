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
  },
  required: {
    type: Boolean,
    default: true
  },
  inputClass: {
    type: String,
    default: "form-control"
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
           :class="inputClass"
           :placeholder="placeholder"
           :id="inputId"
           :min="min"
           :pattern="pattern"
           :required="required"
    />
    <div class="valid-feedback">{{ validMessage }}</div>
    <div class="invalid-feedback" id="invalid">{{ invalidMessage }}</div>
  </div>
</template>

<style scoped>

</style>