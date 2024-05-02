<script setup lang="ts">
import {GoalService, type CreateGoalDTO, type GoalDTO} from "@/api"
import {ref, defineProps, defineEmits} from "vue";

const emits = defineEmits(['createGoalClicked']);

const name = ref("")
const desc = ref("")
const date = ref("")
const amount = ref(0)
const createdConfirm = ref("");
const errorMessage = ref("")

const createGoalClick = async () => {
  const createGoalPayload: CreateGoalDTO = {
    name: name.value,
    description: desc.value,
    targetAmount: amount.value,
    targetDate: date.value + " 00:00:00.000000000",
  };


  try {
    let response = await GoalService.createGoal({ requestBody: createGoalPayload });
    if(response.name != "") {
      createdConfirm.value = "Your goal has been created!"
      errorMessage.value = ""
      emits('createGoalClicked', response)
    }
  } catch (error: any) {
    console.log(error.message);
    errorMessage.value = error.message;
  }
}

</script>

<template>
  <div class="col-lg-8">
    <h1>Lag et nytt sparemål!</h1>
    <br>
    <p>Gi sparemålet et navn </p>
    <div class="input-group mb-3">
      <span class="input-group-text" id="basic-addon1">Navn</span>
      <input v-model="name" type="text" class="form-control" placeholder="Navn på sparemålet"
             aria-label="Username" aria-describedby="basic-addon1" required>
    </div>

    <p>Legg til en beskrivelse for sparemålet </p>
    <div class="input-group mb-3">
      <span class="input-group-text" id="basic-addon2">Beskrivelse</span>
      <textarea v-model="desc" class="form-control" aria-label="With textarea"></textarea>
    </div>

    <!--Change this to date picker?-->
    <p>Når skal pengene være spart?</p>
    <div class="input-group mb-3">
      <input v-model="date" type="date" class="form-control" aria-label="Amount of days" required>
    </div>

    <p>Hvor mye vil du spare?</p>
    <div class="input-group">
      <input v-model="amount" type="number" class="form-control" aria-label="NOK" required>
      <span class="input-group-text">NOK</span>
    </div>

    <br>
    <button class="btn btn-primary btn-lg" @click="createGoalClick">Create goal!</button>

    <div class="confirmMessage">
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
  padding-right: 56px;
  padding-bottom: 28px;
}

.confirmMessage {
  color: green;
  font-size: 32px;
  min-height: 100px;
}
</style>