<script setup lang="ts">
import type { BudgetResponseDTO } from '@/api'
import MiniBudgetBox from '@/components/Budget/Modal/MiniBudgetBox.vue'

const emit = defineEmits(['importBudgetEvent'])
const props = defineProps({
  modalId: {
    type: String,
    required: true
  },
  listOfBudgetResponseDTO: {
    type: Array as () => BudgetResponseDTO[],
    default: () => []
  }
})

/**
 * Emits an importBudgetEvent to the parent in order to signalize that
 * a budget with id has been imported.
 *
 * @param budgetId The id of the imported budget.
 */
const emitImportBudgetEvent = (budgetId: number) => {
  emit('importBudgetEvent', budgetId)
}
</script>

<template>
  <div class="modal fade" :id="modalId">
    <div class="modal-dialog modal-dialog-centered modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h3>Velg et budget du vil importere</h3>
          <button class="btn btn-close" data-bs-dismiss="modal"></button>
        </div>
        <div class="modal-body">
          <h6 v-if="listOfBudgetResponseDTO.length === 0" class="text-center">Du har ingen budsjetter du kan importere</h6>
          <div v-else>
            <MiniBudgetBox v-for="(item, index) in listOfBudgetResponseDTO"
                           :key="index"
                           :budget-id="Number(item.id) || 0"
                           :budget-title="item.budgetName"
                           :budget-amount="Number(item.budgetAmount)"
                           :expense-amount="Number(item.expenseAmount)"
                           @importBudgetEvent="emitImportBudgetEvent"
                           data-bs-dismiss="modal">
            </MiniBudgetBox>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

div.modal-body {
  padding-left: 0;
}

</style>