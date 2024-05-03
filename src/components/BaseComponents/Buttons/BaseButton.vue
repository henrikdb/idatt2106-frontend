<template>
  <button type="button" class="btn btn-primary" id="buttonStyle">{{ buttonText }}</button>
</template>

<script setup lang="ts">
defineProps<{ buttonText: string }>()
</script>

<style scoped>
#buttonStyle {
  padding: 0.5rem 4rem;
  font-size: 1.5rem;
  font-weight: 600;
}

.btn-primary {
  background-color: #003a58;
  border-color: #003a58;
  font-weight: 600;
}

.btn-primary:hover,
.btn-primary:active,
.btn-primary:visited {
  background-color: #004a72 !important;
  border-color: #004a72 !important;
}

.btn-primary:disabled {
  background-color: rgba(0, 74, 114, 0.56) !important;
  border-color: rgba(0, 74, 114, 0.56) !important;
}
</style>
