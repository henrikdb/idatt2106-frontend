<script setup lang="ts">
import { onMounted, ref } from 'vue'
import BaseButton from '@/components/BaseComponents/Buttons/BaseButton.vue'
import ExpenseBox from '@/components/Budget/ExpenseBox.vue'
import { useRouter } from 'vue-router'
import { useBudgetStore } from '@/stores/BudgetStore'
import { type BudgetResponseDTO, BudgetService, type ExpenseRequestDTO, type ExpenseResponseDTO } from '@/api'
import handleUnknownError from '@/components/Exceptions/unkownErrorHandler'
import ConfirmDeleteModal from '@/components/Budget/Modal/ConfirmDeleteModal.vue'
import ImportBudgetModal from '@/components/Budget/Modal/ImportBudgetModal.vue'

const router = useRouter();

// Reactive header values
let title = ref('');
let budget = ref(0);
let expenses = ref(0);
let balance = ref(0);
// Reactive error message and form value
let errorMsg = ref('');
let renameFormRef = ref(null)
// Reactive expense list
let expenseDTOList = ref<ExpenseResponseDTO[]>([])
// Reactive import budget list
let budgetDTOList = ref<BudgetResponseDTO[]>([])
// Reactive background variable
const iRef = ref<any>()
// Reactive input values
let budgetTitle = ref('')
let budgetValue = ref<any>()
let expenseDescription = ref('')
let expenseAmount = ref<any>()

/**
 * Executes necessary updates on component mount.
 * Updates the header, expenses, balance asynchronously,
 * and gets budgets that are available to import.
 */
onMounted(async () => {
  try {
    await updateHeader();
    await updateExpenses();
    await updateBalance();
    // Gets budgets which can be imported
    budgetDTOList.value = await BudgetService.getBudgetsByUser();
    budgetDTOList.value = budgetDTOList.value.filter(item => item.id !== useBudgetStore().getActiveBudgetId);
  } catch (error) {
    errorMsg.value = handleUnknownError(error);
  }
})

/**
 * Updates the header information asynchronously based on the active budget.
 * Fetches the budget details using the UserService and updates the title,
 * budget amount, and expense amount accordingly.
 */
const updateHeader = async () => {
  const budgetResponse: BudgetResponseDTO = await BudgetService.getBudget({budgetId: useBudgetStore().getActiveBudgetId});
  if (budgetResponse.budgetName != null) {
    title.value = budgetResponse.budgetName;
  }
  if (budgetResponse.budgetAmount != null) {
    budget.value = budgetResponse.budgetAmount;
  }
  if (budgetResponse.expenseAmount != null) {
    expenses.value = budgetResponse.expenseAmount;
  }
}

/**
 * Updates the list of expenses asynchronously based on the active budget.
 * Fetches the expenses associated with the active budget using the UserService.
 */
const updateExpenses = async () => {
  expenseDTOList.value = await BudgetService.getExpenses({budgetId: useBudgetStore().getActiveBudgetId});
  // Resets expenses and then re-calculates it
  expenses.value = 0;
  for (let expenseDTO of expenseDTOList.value) {
    expenses.value += Number(expenseDTO.amount);
  }
}

/**
 * Updates the balance and the belonging background color based on the budget and expenses.
 */
const updateBalance = async () => {
  // Updates balance value and background
  balance.value = budget.value - expenses.value
  if (balance.value >= 0) {
    iRef.value.style.backgroundColor = 'rgba(34, 231, 50, 0.43)';
  } else  {
    iRef.value.style.backgroundColor= 'rgba(232, 14, 14, 0.43)';
  }
}

/**
 * Updates the budget information asynchronously with the provided new budget amount and name.
 * Updates the local budget and title values, then sends a request to update the budget information
 * using the UserService.
 *
 * @param {number} newBudget - The new budget amount to set.
 * @param {string} newBudgetName - The new budget name to set.
 */
const updateBudget = async (newBudget: number, newBudgetName: string) => {
  try {
    budget.value = newBudget;
    title.value = newBudgetName;
    // Prepare request body for updating budget
    const request: BudgetResponseDTO = {
      budgetName: title.value,
      budgetAmount: budget.value,
      expenseAmount: expenses.value
    }
    // Send request to update budget information
    await BudgetService.updateBudget({budgetId: useBudgetStore().getActiveBudgetId, requestBody: request})
  } catch (error) {
    errorMsg.value = handleUnknownError(error)
  }
}

/**
 * Adds a new expense with the provided description and value to the active budget.
 * Sends a request to update the expense information using the UserService.
 * Subsequently, triggers updates of the expenses, budget, and the balance.
 *
 * @param {string} expenseDescription - The description of the new expense.
 * @param {number} expenseValue - The value of the new expense.
 */
const addNewExpense = async (expenseDescription: string, expenseValue: number) => {
  try {
    // Prepare request body for adding new expense
    const request: ExpenseRequestDTO = {
      description: expenseDescription,
      amount: expenseValue
    }
    // Send request to update expense information
    await BudgetService.updateExpense({budgetId: useBudgetStore().getActiveBudgetId, requestBody: request});
    // Trigger updates of expenses and balance and budget
    await updateExpenses();
    await updateBudget(budget.value, title.value)
    await updateBalance();
  } catch (error) {
    errorMsg.value = handleUnknownError(error);
  }
}

/**
 * Deletes an expense from the list of expenses.
 * Sends a request to the UserService to delete the expense.
 * Subsequently, triggers updates of the expenses, budget, and the balance.
 *
 * @param {number} id - The ID of the expense to delete.
 */
const deleteExpense = async (id: number) => {
  try {
    await BudgetService.deleteExpense({expenseId: id});
    await updateExpenses();
    await updateBudget(budget.value, title.value)
    await updateBalance();
  } catch (error) {
    errorMsg.value = handleUnknownError(error);
  }
}

/**
 * Edits the details of an expense with the specified ID.
 * Sends a request to the UserService to update the expense with new description and amount.
 * Subsequently, triggers updates of the expenses and the balance.
 *
 * @param {number} id - The ID of the expense to edit.
 * @param {string} newDescription - The new description for the expense.
 * @param {number} newAmount - The new amount for the expense.
 */
const editExpense = async (id: number, newDescription: string, newAmount: number) => {
  try {
    // Prepare request body with updated details
    const request: ExpenseRequestDTO = {
      expenseId: id,
      description: newDescription,
      amount: newAmount
    }
    // Send request to update the expense using the UserService
    await BudgetService.updateExpense({budgetId: useBudgetStore().getActiveBudgetId, requestBody: request});
    await updateExpenses();
    await updateBudget(budget.value, title.value)
    await updateBalance();
  } catch (error) {
    errorMsg.value = handleUnknownError(error);
  }
}

/**
 * Imports a budget by updating the current budget with the data from the specified budget ID.
 *
 * @param {number} budgetId - The ID of the budget to import.
 */
const importBudget = async (budgetId: number) => {
  try {
    // Update current budget value from the imported budget
    const budgetResponse: BudgetResponseDTO = await BudgetService.getBudget({budgetId: budgetId});
    if (budgetResponse.budgetAmount != null) {
      budget.value += budgetResponse.budgetAmount;
    }
    // Get all the expenses from imported budget, and copy them to current budget
    const expenses: ExpenseResponseDTO[] = await BudgetService.getExpenses({budgetId: budgetId})
    for (let expense of expenses) {
      const expenseRequest: ExpenseRequestDTO = {
        description: expense.description,
        amount: Number(expense.amount) || 0
      }
      await BudgetService.updateExpense({budgetId: useBudgetStore().getActiveBudgetId, requestBody: expenseRequest});
    }
    // Update display and budget
    await updateExpenses();
    await updateBudget(budget.value, title.value)
    await updateBalance();
  } catch (error) {
    errorMsg.value = handleUnknownError(error)
  }
}
</script>

<template>
  <div class="container">
    <h1 class="text-center">{{ title }}</h1>

    <div class="button-container">
      <BaseButton id="goBack" @click="router.push('/budget-overview')" button-text="Gå tilbake"/>
      <BaseButton id="optionButton" button-text="Alternativer" data-bs-toggle="modal" data-bs-target="#modal"/>
    </div>

    <p class="text-danger">{{ errorMsg }}</p>

    <div class="modal fade" id="modal">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h3>Alternativer</h3>
            <button class="btn btn-close" data-bs-dismiss="modal"></button>
          </div>
          <div class="modal-body">
            <button id="importButton" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#import-modal"><img src="../../assets/icons/import.svg" height="20" width="20" alt="bilde">Importer budsjett</button>
            <button id="editBudget" class="btn btn-primary" data-bs-toggle="collapse" data-bs-target="#editBudgetCollapse" aria-expanded="false" aria-controls="editBudgetCollapse"><img src="../../assets/icons/edit-button.svg" alt="redigerKnapp">Endre navn på budsjett</button>
            <div class="collapse" id="editBudgetCollapse">
              <div class="container collapse-container">
                <form ref="renameFormRef" @submit.prevent="updateBudget(budget, budgetTitle)">
                  <div class="input-group">
                    <input id="collapseInput" class="col-5 form-control" type="text" required minlength="1" placeholder="Skriv inn nytt navn på budsjettet" v-model="budgetTitle">
                    <BaseButton id="collapseButton" type="submit" button-text="Bekreft" data-bs-dismiss="modal"/>
                  </div>
                </form>
              </div>
            </div>
            <button id="deleteButton" class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#confirm-modal"><img src="../../assets/icons/trash-can.svg" height="20" width="20" alt="bilde">Slett budsjett</button>
          </div>
        </div>
      </div>
    </div>

    <confirm-delete-modal :budget-id="useBudgetStore().getActiveBudgetId"
                          modal-id="confirm-modal"
                          :budgetTitle="title"
                          @deletedEvent="router.push('/budget-overview')"/>

    <import-budget-modal modal-id="import-modal"
                         :listOfBudgetResponseDTO="budgetDTOList"
                         @importBudgetEvent="importBudget"/>

    <div class="budget-info-container">
      <div class="info budget-container">
        <i><img src="../../assets/icons/money2.svg" width="48px" height="48px" alt="bilde"></i>
        <div class="budget-text-container">
          <h5>{{budget}} kr</h5>
          <p>Budsjett</p>
        </div>
      </div>

      <div class="info expenses-container">
        <i><img src="../../assets/icons/credit-card.svg" width="48px" height="48px" alt="bilde"></i>
        <div class="expenses-text-container">
          <h5>{{expenses}} kr</h5>
          <p>Utgifter</p>
        </div>
      </div>

      <div class="info balance-container">
        <i ref="iRef"><img src="../../assets/icons/scale.svg" width="48px" height="48px" alt="bilde"></i>
        <div class="balance-text-container">
          <h5>{{balance}} kr</h5>
          <p>Balanse</p>
        </div>
      </div>
    </div>


    <div class="budget-content-container">
      <form class="budget-from" @submit.prevent="updateBudget(budgetValue, title)">
        <div class="input-group">
          <span class="input-group-text">Ditt budsjett </span>
          <input type="text" class="form-control" placeholder="Skriv inn ditt budsjett" required v-model="budgetValue">
          <BaseButton id="calculate-budget" type="submit" class="btn" button-text="Beregn"></BaseButton>
        </div>
      </form>

      <form class="expenses-form" @submit.prevent="addNewExpense(expenseDescription, expenseAmount)">
        <div class="input-group">
          <span class="input-group-text">Legg til ny utgift </span>
          <input type="text" class="form-control" placeholder="Navn på utgift" required v-model="expenseDescription">
          <input type="number" min="0" class="form-control" placeholder="Beløp (kr)" required v-model="expenseAmount">
          <BaseButton id="calculate-expense" type="submit" class="btn" button-text="Beregn"></BaseButton>
        </div>
      </form>
    </div>

    <div v-if="expenseDTOList.length != 0" class="expenses-details-container">
      <h3>Utgiftsdetaljer</h3>
      <div class="expense-box-container">
        <expense-box v-for="(expenseDTO, index) in expenseDTOList"
                     :id="Number(expenseDTO.expenseId) || 0"
                     :key="index"
                     :index="index"
                     :description="expenseDTO.description"
                     :amount="Number(expenseDTO.amount) || 0"
                     @deleteEvent="deleteExpense"
                     @editEvent="editExpense"/>
      </div>
    </div>
    <h5 v-else class="text-center">Du har ingen utgifter</h5>

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

.info i {
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

@media (max-width: 550px) {
  div.budget-info-container {
    display: flex;
    flex-direction: column;
  }
}

@media (max-width: 400px) {
  div.budget-info-container {
    display: flex;
    flex-direction: column;
  }

  .input-group {
    display: block; /* Change display to block to stack vertically */
    margin-bottom: 10px; /* Add some spacing between stacked input groups */
    gap: 5px;
  }

  .input-group input {
    min-width: 100%;
  }
}
</style>