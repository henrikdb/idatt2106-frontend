<script setup lang="ts">
import Button1 from '@/components/Buttons/Button1.vue'
import BudgetBox from '@/components/Budget/BudgetBox.vue'
import { onMounted, ref } from 'vue'
import handleUnknownError from '@/components/Exceptions/unkownErrorHandler'
import { useBudgetStore } from '@/stores/BudgetStore'
import { type BudgetRequestDTO, type BudgetResponseDTO, UserService } from '@/api'
import { useRouter } from 'vue-router'

const router = useRouter();

// Reactive list of budget responses
const budgetList = ref<BudgetResponseDTO[]>([]);
// Reactive variables for input value, error message, modal, and budgetList key
let budgetNameInput = ref('')
let errorMsg = ref('');
let budgetListKey = ref(0);

/**
 * Attempts to retrieve budgets for the user asynchronously and updates
 * the budget list state after rendering.
 * Handles any errors by updating the error message state.
 */
onMounted(async () => {
  try {
    budgetList.value = await UserService.getBudgetsByUser()
    console.log(budgetList.value)
  } catch (error) {
    errorMsg.value = handleUnknownError(error);
  }
})

/**
 * Creates a new budget to the database and updates the displayed budget list.
 */
const createNewBudget = async() => {
  try {
    // Prepare request body for creating budget
    const request: BudgetRequestDTO = {
      budgetName: budgetNameInput.value,
      budgetAmount: 0,
      expenseAmount: 0
    }
    // Creates new budget with the budget request body
    await UserService.createBudget({requestBody: request})
    // Updates displayed budget list after creation
    await updateBudgetList()
  } catch (error) {
    errorMsg.value = handleUnknownError(error);
  }
}

/**
 * Updates the displayed budget list.
 */
const updateBudgetList = async () => {
  budgetList.value = await UserService.getBudgetsByUser()
  budgetListKey.value++
}

/**
 * Navigates to the budget page with the specified ID.
 *
 * @param {number} id The ID of the budget to navigate to.
 */
const goToBudget = (id: number) => {
  useBudgetStore().setActiveBudgetId(id);
  router.push("/budget")
}
</script>

<template>
  <div class="container">
    <h1 class="text-center">Your Budgets</h1>
    <button1 id="createBudgetButton" button-text="Create new budget" class="btn btn-primary" type="button" data-bs-toggle="collapse" data-bs-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample"/>

    <div class="collapse" id="collapseExample">
      <div class="container collapse-container">
        <div class="input-group">
          <input id="collapseInput" class="form-control" type="text" placeholder="Enter name of budget" v-model="budgetNameInput">
          <button1 id="collapseButton" button-text="Create" data-bs-dismiss="modal" @click="createNewBudget"/>
        </div>
      </div>
    </div>

    <p class="text-danger">{{ errorMsg }}</p>

    <ul class="budgetContainer" :key="budgetListKey">
      <li v-for="(item, index) in budgetList">
        <budget-box
          :key="index"
          :id="Number(item.id) || 0"
          :title="item.budgetName"
          :created-at="item.createdAt"
          :budget="item.budgetAmount"
          :expenses="item.expenseAmount"
          @deletedBudgetEvent="updateBudgetList"
          @budgetPressedEvent="goToBudget"
        ></budget-box>
      </li>
    </ul>

    <nav id="navbar" aria-label="Page navigation example">
      <ul class="pagination">
        <li class="page-item">
          <a class="page-link" href="#" aria-label="Previous">
            <span aria-hidden="true">&laquo;</span>
          </a>
        </li>
        <li class="page-item"><a class="page-link" href="#">1</a></li>
        <li class="page-item"><a class="page-link" href="#">2</a></li>
        <li class="page-item"><a class="page-link" href="#">3</a></li>
        <li class="page-item">
          <a class="page-link" href="#" aria-label="Next">
            <span aria-hidden="true">&raquo;</span>
          </a>
        </li>
      </ul>
    </nav>

  </div>

</template>

<style scoped>
.collapse-container {
  align-content: center;
  justify-content: center;
  justify-items: center;
}

.container {
  padding: 10px;
}

.budgetContainer {
  list-style: none;
  padding-left: 10px;
}

ul > li {
  margin: 10px 0;
}
</style>