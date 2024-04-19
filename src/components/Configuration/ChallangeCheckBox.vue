<script setup lang="ts">

const emit = defineEmits(['challengeChangedEvent'])
const props = defineProps({
  id: {
    type: String,
    required: true
  },
  text: {
    type: String,
    default: ''
  },
  modelValue: {
    type: Boolean,
    default: false
  }
})

const onChallengeChanged = (event: any) => {
  const value = event.target.checked
  const data = [props.text, value]
  emit('challengeChangedEvent', data)
}

</script>

<template>
  <span>
    <input @change="onChallengeChanged" type="checkbox" class="btn-check" :id="props.id" autocomplete="off">
    <label class="btn btn-outline-primary align-items-center justify-content-center" :for="props.id">{{ props.text }}</label>
  </span>
</template>

<style scoped>
label {
  margin: 5px
}
</style>