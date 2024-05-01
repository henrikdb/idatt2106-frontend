<script setup lang="ts">
import {ref, onMounted} from "vue";
import {GoalService, type GoalDTO, type CreateGoalDTO} from "@/api"

const savingGoalList = ref([] as any)

defineProps()

const getGoals = async () => {
  try {
    let response = await GoalService.getGoals();
    savingGoalList.value = response
  } catch (error: any) {
    console.log(error.message);
  }
}

onMounted(getGoals)

const emits = defineEmits(['goToSavingGoal']);

const goToSavingGoal = (savingGoal: GoalDTO) => {
  emits('goToSavingGoal', savingGoal);
};

const deleteSavingGoal = () => {

};
</script>

<template>
  <div v-for="(savingGoal, index) in savingGoalList" :key="index" class="card bg-body">
    <div class="card-header">
      Saving goal {{ index + 1 }}
    </div>
    <div class="card-body">
      <h5 class="card-title">{{ savingGoal.goalName }}</h5>
      <p class="card-text">{{ savingGoal.description }}</p>
      <a href="#" class="btn btn-primary" @click="goToSavingGoal(savingGoal)">Go to saving goal</a>
      <a href="#" class="btn btn-danger" @click="deleteSavingGoal" style="margin-left: 8px">Delete</a>
    </div>
  </div>
</template>

<style scoped>
.card-header, .card-text, .card-title {
  color: white;
}

.card-header {
  background-color: #40698A;
}

.card-body {
  background-color: #447093;
}

* {
  font-weight: 600;
}

.card {
  margin-bottom: 20px;
  border: none;
}
</style>