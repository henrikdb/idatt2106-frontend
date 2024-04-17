<script setup lang="ts">

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
  }
});
</script>

<template>
  <div>
    <label :for="inputId">{{ label }}</label>
    <input :type="props.type"
           class="form-control"
           :placeholder="props.placeholder"
           :id="inputId" required />
    <div class="invalid-feedback">Invalid {{ label }}</div>
    <div class="valid-feedback">Correct {{ label }}</div>
  </div>
</template>

<style scoped>

</style>