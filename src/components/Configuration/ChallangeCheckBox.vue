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
  enumValue: {
    type: String,
    default: ''
  },
  modelValue: {
    type: Boolean,
    default: false
  }
})

/**
 * This method executes whenever a change has occurred in the checkbox. It retrieves
 * the current value of the checkbox (true/false) and emits a data object containing
 * the challenge's description and the checked value.
 *
 * @param {any} event The event object containing information about the input's checked value.
 */
const onChallengeChanged = (event: any) => {
  const value = event.target.checked
  const data = [props.enumValue, value]
  emit('challengeChangedEvent', data)
}
</script>

<template>
  <div class="col-auto">
    <input
      @change="onChallengeChanged"
      type="checkbox"
      class="btn-check"
      :id="props.id"
      autocomplete="off"
    />
    <label
      class="btn btn-outline-primary align-items-center justify-content-center"
      :for="props.id"
      >{{ props.text }}</label
    >
  </div>
</template>

<style scoped>
label {
  margin: 5px;
}
div.col-auto {
  padding: 0;
}
</style>
