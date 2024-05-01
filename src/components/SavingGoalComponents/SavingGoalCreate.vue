<script setup lang="ts">
import {GoalService, type CreateGoalDTO, type GoalDTO} from "@/api"
import {ref} from "vue";

const name = ref("")
const desc = ref("")
const date = ref("")
const amount = ref(0)
const createdConfirm = ref("");
const errorMessage = ref("")

const createGoalClick = async () => {
  console.log("create goal clicked")
  console.log(name.value)
  console.log(desc.value)
  console.log(date.value)
  console.log(amount.value)


  const createGoalPayload: CreateGoalDTO = {
    name: name.value,
    description: desc.value,
    targetAmount: amount.value,
    targetDate: date.value + " 00:00:00.000000000",
  };

  console.log(createGoalPayload)

  try {
    let response = await GoalService.createGoal({ requestBody: createGoalPayload });
    if(response.name != "") {
      createdConfirm.value = "Your goal has been created! Refresh the page to se it in the list"
      errorMessage.value = ""
    }
  } catch (error: any) {
    console.log(error.message);
    errorMessage.value = error.message;
  }
}

</script>

<template>
  <div class="col-lg-8">
    <h1>Create a new saving goal!</h1>
    <br>
    <p>Create a name for this saving goal </p>
    <div class="input-group mb-3">
      <span class="input-group-text" id="basic-addon1">Name</span>
      <input v-model="name" type="text" class="form-control" placeholder="Name of Saving Goal" aria-label="Username" aria-describedby="basic-addon1" required>
    </div>

    <p>Add a description to this saving goal </p>
    <div class="input-group mb-3">
      <span class="input-group-text" id="basic-addon2">Description</span>
      <textarea v-model="desc" class="form-control" aria-label="With textarea"></textarea>
    </div>

    <!--Change this to date picker?-->
    <p>When should this saving goal end?</p>
    <div class="input-group mb-3">
      <input v-model="date" type="date" class="form-control" aria-label="Amount of days" placeholder="Amount of days (as number)" required>
    </div>

    <p>How much do you want to save during this saving goal? </p>
    <div class="input-group">
      <input v-model="amount" type="number" class="form-control" aria-label="" placeholder="NOK (as number)" required>
      <span class="input-group-text">NOK</span>
    </div>

    <br>
    <button class="btn btn-primary btn-lg" @click="createGoalClick">Create goal!</button>

    <div style="color: green; font-size: 32px">
      {{ createdConfirm }}
    </div>

    <div style="color: red; font-size: 32px">
      {{ errorMessage }}
    </div>
  </div>
</template>

<style scoped>
.col-lg-8 {
  width: 63%;
  margin-top: 50px;
}
</style>