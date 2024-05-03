<script setup lang="ts">
import { BudgetService } from '@/api'
import handleUnknownError from '@/components/Exceptions/unkownErrorHandler';

const emit = defineEmits(['errorEvent', 'deletedEvent'])
const props = defineProps({
  modalId: {
    type: String,
    required: true
  },
  budgetId: {
    type: Number,
    required: true
  },
  budgetTitle: {
    type: String,
    default: ''
  }
})

/**
 * Deletes a budget with the specified ID and emits a delete event.
 */
const deleteBudget = async () => {
  try {
    await BudgetService.deleteBudget({budgetId: props.budgetId})
    emit('deletedEvent')
  } catch (error) {
    handleUnknownError(error);
    emit('errorEvent', error)
  }
}

</script>

<template>
  <div class="modal fade" :id="modalId">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h3>Er du sikker på at du vil slette dette budgettet {{ budgetTitle }}?</h3>
          <button class="btn btn-close" data-bs-dismiss="modal"></button>
        </div>
        <div class="modal-body">
          <button class="btn btn-primary" data-bs-dismiss="modal" @click="deleteBudget">Ja</button>
          <button class="btn btn-primary" data-bs-dismiss="modal">Nei</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

.modal-header {
  display: flex;
}

.modal-body {
  display: grid;
  gap: 10px
}

</style>