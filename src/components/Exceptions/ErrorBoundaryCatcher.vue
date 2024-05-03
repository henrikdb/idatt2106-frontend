<template>
  <error-box
    :error-message="errorStore.getFirstError"
    @update:errorMessage="errorStore.removeCurrentError"
  />
  <slot></slot>
</template>

<script setup lang="ts">
import { onErrorCaptured } from 'vue'
import { useErrorStore } from '@/stores/ErrorStore'
import ErrorBox from '@/components/Exceptions/ErrorBox.vue'
import handleUnknownError from '@/components/Exceptions/unkownErrorHandler'

const errorStore = useErrorStore()

/**
 * Handles errors captured during component lifecycle hooks or during component rendering.
 *
 * @param err The error object captured.
 * @param _vm The Vue instance where the error was captured.
 * @param _info Additional information about the error.
 * @return {boolean} Returns false to indicate that the error has been handled.
 */
onErrorCaptured((err, _vm, _info): boolean => {
  const message = handleUnknownError(err)
  errorStore.addError(message)
  return false
})
</script>
