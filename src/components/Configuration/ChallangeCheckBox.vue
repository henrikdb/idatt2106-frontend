<script setup lang="ts">

const props = defineProps({
  id: {
    type: String,
    required: true
  },
  text: {
    type: String,
    default: ''
  }
})

</script>

<template>
  <span>
    <input type="checkbox" class="btn-check" :id="props.id" autocomplete="off">
    <label class="btn btn-outline-primary align-items-center justify-content-center" :for="props.id">{{ props.text }}</label>
  </span>
</template>

<style scoped>
label {
  margin: 5px
}
</style>