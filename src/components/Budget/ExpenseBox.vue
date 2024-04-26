<script setup lang="ts">
import Button1 from '@/components/Buttons/Button1.vue'
import { type CreateAppFunction, ref } from 'vue'

const emit = defineEmits(['deleteEvent', 'editEvent']);
const props = defineProps({
  index: {
    type: Number,
    default: 0
  },
  description: {
    type: String,
    default: ''
  },
  amount: {
    type: Number,
    default: 0
  }
})

// Reactive variables for expense description and amount
let editDescription = ref('')
let editAmount = ref('')

/**
 * Emits an event to parent component with the type 'deleteEvent' to signalize
 * that an expense with index 'index' must be removed.
 */
const emitDeleteEvent = () => {
  emit('deleteEvent', props.index)
}

/**
 * Emits an event to parent component with the type 'editEvent' to signalize
 * that an expense with index 'index' is to be edited with the values 'editDescription'
 * and 'editAmount'
 */
const emitEditEvent = () => {
  emit('editEvent', props.index, editDescription.value, editAmount.value)
}
</script>

<template>
  <div class="expense-container">
    <p>{{index + 1}}</p>
    <p>{{description}}</p>
    <p>{{amount}} kr</p>
    <button class="btn btn-success" data-bs-toggle="collapse" :data-bs-target="'#' + index" aria-expanded="false" aria-controls="editBudgetCollapse">
      <img src="../../assets/icons/edit-button.svg" alt="Edit" height="18" width="18">
      Edit
    </button>
    <button class="btn btn-danger" @click="emitDeleteEvent">
      <img src="../../assets/icons/trash-can.svg" alt="Edit" height="18" width="18">
      Delete
    </button>
  </div>

  <div class="collapse" id=index>
    <div class="container collapse-container">
      <form @submit.prevent="emitEditEvent">
        <div class="input-group">
          <span class="input-group-text">Edit expense #{{ index+1 }}: </span>
          <input type="text" class="form-control" placeholder="Expense description" required v-model="editDescription">
          <input type="number" min="0" class="form-control" placeholder="Amount (kr)" required v-model="editAmount">
          <button type="submit" class="btn btn-primary" data-bs-toggle="collapse" :data-bs-target="'#' + index">Confirm</button>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>
.expense-container {
  padding: 0 10px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr .6fr .6fr;
  border-radius: 10px;
  background-color: #2a2a34;
  align-content: center;
  justify-self: center;
  margin: 10px 5px;
}

.expense-container p {
  color: white;
  align-self: center;
  margin: 0;
}

.expense-container button {
  margin: 5px;
  padding: 0;
}
</style>