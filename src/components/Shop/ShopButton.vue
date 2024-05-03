<!-- ShopButton.vue -->
<template>
  <button
    :disabled="disabled"
    :class="['btn', { 'btn-primary': !disabled, 'btn-secondary': disabled }]"
    id="buttonStyle"
    @click="handleClick"
  >
    {{ buttonText }}
  </button>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
  buttonText: String,
  disabled: Boolean,
});

const emit = defineEmits(['click']);

/**
 * Handles the click event for a button component.
 * Emits a 'click' event if the button is not disabled.
 */

const handleClick = () => {
  if (!props.disabled) {
    emit('click');
  }
};
</script>

<style scoped>
#buttonStyle {
  border-radius: 1rem;
  cursor: pointer;
}

#buttonStyle[disabled] {
  cursor: not-allowed;
}
</style>
