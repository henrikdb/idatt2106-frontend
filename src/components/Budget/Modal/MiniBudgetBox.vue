<script setup lang="ts">
import { ref } from 'vue'

const emit = defineEmits(['importBudgetEvent'])
const props = defineProps({
  budgetId: {
    type: Number,
    required: true
  },
  budgetTitle: {
    type: String,
    default: ''
  },
  budgetAmount: {
    type: Number,
    default: 0
  },
  expenseAmount: {
    type: Number,
    default: 0
  }
})
const balance = ref<number>(props.budgetAmount - props.expenseAmount);

/**
 * Emits an importBudgetEvent to the parent in order to signalize that
 * a budget with id has been chosen to be imported.
 */
const emitImportBudgetEvent = () => {
  emit('importBudgetEvent', props.budgetId)
}

</script>

<template>
  <div class="container-fluid" @click="emitImportBudgetEvent">
    <h3>{{budgetTitle}}</h3>

    <div class="info budget">
      <i>
        <img src="../../../assets/icons/money2.svg" width="30px" height="30px">
      </i>
      <div class="amount budget-container">
        <h5>{{budgetAmount}} kr</h5>
      </div>
    </div>

    <div class="info expenses">
      <i>
        <img src="../../../assets/icons/credit-card.svg" width="30px" height="30px">
      </i>
      <div class="amount expenses-container">
        <h5>{{expenseAmount}} kr</h5>
      </div>
    </div>

    <div class="info balance">
      <i ref="iRef">
        <img src="../../../assets/icons/scale.svg" width="30px" height="30px">
      </i>
      <div class="amount balance-container">
        <h5>{{balance}} kr</h5>
      </div>
    </div>

  </div>
</template>

<style scoped>
div.container-fluid {
  display: grid;
  grid-template-columns: 0.4fr 0.3fr 0.3fr 0.3fr;
  margin: 4px 9px;
  border-radius: 10px;
  background-color: #2a2a34;
  cursor: pointer;
  transition: transform 150ms ease-in-out;
}

div.container-fluid:hover {
  transform: scale(1.02);
}

div.info {
  display: grid;
  grid-template-columns: 1fr 2fr;
}

div.amount {
  align-content: center;
}

h3, h5 {
  color: white;
  margin-bottom: 0;
  align-self: center;
}

i {
  display: grid;
  justify-content: center;
  align-content: center;
  width: 40px;
  height: 40px;
  margin: 5px;
  padding: 5px;
  border-radius: 7px;
}

.budget i {
  background-color: rgba(78, 107, 239, 0.43);
}

.expenses i {
  background-color: rgba(238, 191, 43, 0.43);
}

.balance i {
  background-color: rgba(232, 14, 14, 0.43);
}
</style>