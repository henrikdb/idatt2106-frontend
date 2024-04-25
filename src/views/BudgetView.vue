<script setup lang="ts">
import { onMounted, ref } from 'vue'
import Button1 from '@/components/Buttons/Button1.vue'
import ExpenseBox from '@/components/Budget/ExpenseBox.vue'
import router from '@/router'

// TODO Need endpoint in order to retrieve budget
// Mocked values
let title = ref('Mai 2024');
let budget = ref(10000);
let expenses = ref(0);
let balance = ref(budget.value - expenses.value);
let expenseJSONObject = ref({
  "expenses": [
    {
      "title": "Ost",
      "value": 30
    },
    {
      "title": "Skinke",
      "value": 20
    },
    {
      "title": "Bread",
      "value": 15
    }
  ]
});

// Initially updates the total expense display
for (let expense of expenseJSONObject.value.expenses) {
  expenses.value += expense.value
}

// Reactive input values
let budgetTitle = ref('')
let budgetValue = ref()
let expenseDescription = ref('')
let expenseAmount = ref()
// Reactive background variable
const iRef = ref()

/**
 * Checks the value of the balance and adjust background color depending
 * on negative or positive value after rendering.
 */
onMounted(() => {
  if (balance.value >= 0) {
    iRef.value.style.backgroundColor = 'rgba(34, 231, 50, 0.43)';
  }
  balance.value = budget.value - expenses.value
})

/**
 * Updates the balance and background color based on the budget and expenses.
 */
const updateBalance = () => {
  // Resets expenses and then re-calculates it
  expenses.value = 0
  for (let expense of expenseJSONObject.value.expenses) {
    expenses.value += expense.value
  }
  // Updates balance value and background
  balance.value = budget.value - expenses.value
  if (balance.value >= 0) {
    iRef.value.style.backgroundColor = 'rgba(34, 231, 50, 0.43)';
  } else  {
    iRef.value.style.backgroundColor= 'rgba(232, 14, 14, 0.43)';
  }
}

/**
 * Calculates a new budget and updates the balance.
 *
 * @param newBudget The new budget value.
 */
const calculateNewBudget = (newBudget: number) => {
  budget.value = newBudget
  updateBalance()
}

/**
 * TODO update javadoc when backend integration is done
 * Adds a new expense to the expense JSON object and updates the balance.
 *
 * @param expenseDescription The description of the expense.
 * @param expenseValue The value of the expense.
 */
const addNewExpense = (expenseDescription: string, expenseValue: number) => {
  expenseJSONObject.value.expenses.push({
    "title": expenseDescription,
    "value": expenseValue
  });
  updateBalance()
}


/**
 * Updates the title of the budget.
 *
 * @param newTitle The new title for the budget.
 */
const editBudgetTitle = (newTitle: string) => {
  title.value = newTitle
}

/**
 * Deletes an expense from the list of expenses.
 *
 * @param index The index of the expense to delete.
 */
const deleteExpense = (index: number) => {
  expenseJSONObject.value.expenses.splice(index, 1);
  updateBalance()
}

/**
 * Edits an existing expense in the list of expenses.
 *
 * @param index          The index of the expense to edit.
 * @param newDescription The new description for the expense.
 * @param newAmount      The new amount for the expense.
 */
const editExpense = (index: number, newDescription: string, newAmount: number) => {
  console.log('Reached')
  expenseJSONObject.value.expenses[index].title = newDescription
  expenseJSONObject.value.expenses[index].value = newAmount
  updateBalance()
}

// TODO add delete functionality
const onDeleteBudgetPressed = () => {
  router.push('/budget-overview')
}

</script>

<template>
  <div class="container">
    <h1 class="text-center">{{ title }}</h1>

    <div class="button-container">
      <button1 id="optionButton" button-text="Options" data-bs-toggle="modal"
               data-bs-target="#modal"/>
      <button1 id="saveChanges" button-text="Save changes"/>
    </div>

    <div class="modal fade" id="modal">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h3>Options</h3>
            <button class="btn btn-close" data-bs-dismiss="modal"></button>
          </div>
          <div class="modal-body">
            <button id="importButton" class="btn btn-primary"><img src="../assets/icons/import.svg" height="20" width="20">Import budget</button>
            <button id="editBudget" class="btn btn-primary" data-bs-toggle="collapse" data-bs-target="#editBudgetCollapse" aria-expanded="false" aria-controls="editBudgetCollapse"><img src="../assets/icons/edit-button.svg" alt="editButton">Rename budget</button>
            <div class="collapse" id="editBudgetCollapse">
              <div class="container collapse-container">
                <form @submit.prevent="editBudgetTitle(budgetTitle)">
                  <div class="input-group">
                    <input id="collapseInput" class="col-5 form-control" type="text" placeholder="Enter new name of budget" v-model="budgetTitle">
                    <button1 id="collapseButton" type="submit" button-text="Edit" data-bs-dismiss="modal"  />
                  </div>
                </form>
              </div>
            </div>
            <button id="deleteButton" class="btn btn-primary" data-bs-toggle="modal" @click="onDeleteBudgetPressed"><img src="../assets/icons/trash-can.svg" height="20" width="20">Delete budget</button>
          </div>
        </div>
      </div>
    </div>

    <div class="budget-info-container">
      <div class="info budget-container">
        <i><img src="../assets/icons/money2.svg" width="48px" height="48px"></i>
        <div class="budget-text-container">
          <h5>{{budget}} kr</h5>
          <p>Budget</p>
        </div>
      </div>

      <div class="info expenses-container">
        <i><img src="../assets/icons/credit-card.svg" width="48px" height="48px"></i>
        <div class="expenses-text-container">
          <h5>{{expenses}} kr</h5>
          <p>Expenses</p>
        </div>
      </div>

      <div class="info balance-container">
        <i ref="iRef"><img src="../assets/icons/scale.svg" width="48px" height="48px"></i>
        <div class="balance-text-container">
          <h5>{{balance}} kr</h5>
          <p>Balance</p>
        </div>
      </div>
    </div>


    <div class="budget-content-container">
      <form class="budget-from" @submit.prevent="calculateNewBudget(budgetValue)">
        <div class="input-group">
          <span class="input-group-text">Your budget: </span>
          <input type="text" class="form-control" placeholder="Enter your budget" required v-model="budgetValue">
          <button type="submit" class="btn btn-primary">Calculate</button>
        </div>
      </form>

      <form class="expenses-form" @submit.prevent="addNewExpense(expenseDescription, expenseAmount)">
        <div class="input-group">
          <span class="input-group-text">Add new expense: </span>
          <input type="text" class="form-control" placeholder="Name of expense" required v-model="expenseDescription">
          <input type="number" min="0" class="form-control" placeholder="Amount (kr)" required v-model="expenseAmount">
          <button type="submit" class="btn btn-primary">Calculate</button>
        </div>
      </form>
    </div>

    <div class="expenses-details-container">
      <h3>Expenses details</h3>
      <div class="expense-box-container">
        <expense-box v-for="(expense, index) in expenseJSONObject.expenses"
                     :key="index"
                     :index="index"
                     :description="expense.title"
                     :amount="expense.value"
                     @deleteEvent="deleteExpense"
                     @editEvent="editExpense"/>
      </div>
    </div>

  </div>
</template>

<style scoped>

.button-container {
  display: flex;
  gap: 10px;
}

.container.collapse-container {
  padding: 0;
  margin: 0;
}

.modal-header {
  display: flex;
}

.modal-body {
  display: grid;
  gap: 10px
}

div.budget-info-container {
  margin-top: 2rem;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  justify-content: center;
  gap: 1rem;
}

div.info {
  display: flex;
  flex-direction: row;
  background-color: rgba(221, 221, 224, 0.5);
  border-radius: 10px;
  padding: 10px;
  transition: transform 150ms ease-in-out;
}

div.info:hover {
  transform: scale(1.03);
}

i {
  display: grid;
  justify-content: center;
  align-content: center;
  margin: 5px;
  border-radius: 7px;
  min-width: 90px;
}

.budget-container i {
  background-color: rgba(78, 107, 239, 0.43);
}

.expenses-container i {
  background-color: rgba(238, 191, 43, 0.43);
}

.balance-container i {
  background-color: rgba(232, 14, 14, 0.43);
}

.budget-content-container {
  margin: 2rem 0;
  display: grid;
  gap: 5px;
}
.budget-content-container label {
  display: flex;
  align-items: center;
}


.expenses-details-container {
  margin: 1rem 0;
  min-height: 80px;
  border-radius: 8px;
  background-color: rgba(234, 234, 234, 0.8);
}

.expenses-details-container h3 {
  margin-top: 1rem;
  padding: 10px;
}

.expense-box-container {
  overflow-y: auto;
  overflow-x: hidden;
  max-height: 100vh;
}

</style>