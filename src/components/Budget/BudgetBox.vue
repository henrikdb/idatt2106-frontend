<script setup lang="ts">
import { onMounted, ref } from 'vue'
import ConfirmDeleteModal from '@/components/Budget/Modal/ConfirmDeleteModal.vue'

const emit = defineEmits(['deletedBudgetEvent', 'budgetPressedEvent'])
const props = defineProps({
  id: {
    type: Number,
    required: true
  },
  title: {
    type: String,
    default: ''
  },
  createdAt: {
    type: String,
    default: ''
  },
  budget: {
    type: Number,
    default: 0
  },
  expenses: {
    type: Number,
    default: 0
  }
})

// Calculated balance variable
let balance = props.budget - props.expenses
// Reactive variable for determining background color
const iRef = ref<Element | null>(null)

/**
 * Checks if the balance is positive, and depending on the value
 * changes background color to green (positive) or red (negative)
 */
onMounted(() => {
  if (iRef.value !== null && balance >= 0) {
    // By default, the background is set to red
    const element = iRef.value as HTMLElement
    element.style.backgroundColor = 'rgba(34, 231, 50, 0.43)'
  }
})

/**
 * Navigates to the pressed budget with its id.
 */
const onBudgetContainerPressed = () => {
  emit('budgetPressedEvent', props.id)
}

/**
 * Emits an event to tell parent component to delete budget with its id.
 */
const onBudgetDeleted = () => {
  emit('deletedBudgetEvent')
}
</script>

<template>
  <confirm-delete-modal
    :budget-id="id"
    :modal-id="String(id)"
    :budgetTitle="title"
    @deletedEvent="onBudgetDeleted"
  />

  <div class="container-fluid row" @click="onBudgetContainerPressed">
    <div class="col-12">
      <div class="title-container">
        <h2>{{ title }}</h2>
        <p>Created {{ createdAt.substring(0, 10).replace(/-/g, '/') }}</p>
      </div>
      <button
        id="deleteButton"
        class="btn btn-danger"
        data-bs-toggle="modal"
        :data-bs-target="'#' + id"
        @click.stop=""
      >
        <img src="../../assets/icons/trash-can.svg" height="20" width="20" alt="picture" />Delete
      </button>
    </div>

    <div class="col-4 budget">
      <i>
        <img src="../../assets/icons/money2.svg" width="48px" height="48px" />
      </i>
      <div class="budget-container">
        <h5>{{ budget }} kr</h5>
        <p>Budget</p>
      </div>
    </div>

    <div class="col-4 expenses">
      <i>
        <img src="../../assets/icons/credit-card.svg" width="48px" height="48px" />
      </i>
      <div class="expenses-container">
        <h5>{{ expenses }} kr</h5>
        <p>Utgifter</p>
      </div>
    </div>

    <div class="col-4 balance">
      <i ref="iRef">
        <img src="../../assets/icons/scale.svg" width="48px" height="48px" />
      </i>
      <div class="balance-container">
        <h5>{{ balance }} kr</h5>
        <p>Saldo</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.title-container,
.budget-container,
.expenses-container,
.balance-container {
  display: grid;
  align-self: center;
}

.container-fluid {
  border: 4px solid #003a58;
  min-height: 90px;
  border-radius: 15px;
  transition:
    transform 150ms ease-in-out,
    border 200ms ease-in-out;
  cursor: pointer;
}

.container-fluid:hover {
  border: 4px solid #01476b;
  transform: scale(1.03);
}

h2,
h5,
p {
  color: black;
  align-self: center;
}

i {
  display: grid;
  justify-content: center;
  align-content: center;
  margin: 5px;
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

div.col-4 {
  display: grid;
  grid-template-columns: 1fr 1fr;
  border-radius: 10px;
  margin: 5px 0;
}

div.col-12 {
  display: grid;
  grid-template-columns: 1fr 1fr;
}

div.col-12 p {
  margin: 0;
  padding: 0;
}

#deleteButton {
  z-index: 999;
  align-self: center;
  justify-self: right;
}

div.container-fluid.row {
  display: flex;
}

@media (max-width: 405px) {
  .col-4 {
    width: 100%; /* Make each column take up full width */
    margin-bottom: 10px; /* Add some spacing between columns */
  }
}
</style>
