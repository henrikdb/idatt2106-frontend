<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { GoalService, type GoalDTO, type ChallengeDTO } from '@/api'

const savingGoalList = ref(null as any)
const oldSavingGoalList = ref(null as any)

const getGoals = async () => {
  try {
    let response = await GoalService.getGoals()
    savingGoalList.value = []
    oldSavingGoalList.value = []
    const date = new Date()
    response.forEach((goal: GoalDTO) => {
      if (goal.targetDate) {
        const targetDate = new Date(goal.targetDate)
        if (targetDate < date) {
          console.log('old')
          oldSavingGoalList.value.push(goal)
        } else {
          console.log('current')
          savingGoalList.value.push(goal)
        }
      }
    })
  } catch (error: any) {
    console.log(error.message)
  }
}

onMounted(getGoals)

const emits = defineEmits(['goToSavingGoal'])

const goToSavingGoal = (savingGoal: GoalDTO) => {
  emits('goToSavingGoal', savingGoal)
}

const deleteSavingGoal = () => {}

function calculateSavedSoFar(goal: GoalDTO) {
  console.log('hehe')
  let savedSoFar = 0 // Reset savedSoFar before calculating again
  if (goal.challenges) {
    console.log('hehehe')
    goal.challenges.forEach((challenge: ChallengeDTO) => {
      // Check if progressList exists before accessing its elements
      if (challenge.progressList) {
        challenge.progressList.forEach((progress: any) => {
          // Assuming 'amount' is the property you want to add from progressList
          savedSoFar += progress.amount
          console.log('he')
        })
      }
    })
  }
  return savedSoFar
}

function formatDate(date: string) {
  const date1 = new Date(date)
  return date1.toISOString().split('T')[0]
}
</script>

<template>
  <div v-if="savingGoalList">
    <div v-if="oldSavingGoalList.lenght > 0">
      <h3>Current:</h3>
    </div>
    <div v-for="(savingGoal, index) in savingGoalList" :key="index" class="card bg-body">
      <div class="card-header">Sparemål {{ index + 1 }}</div>
      <div class="card-body">
        <h5 class="card-title">{{ savingGoal.name }}</h5>
        <p class="card-text">{{ savingGoal.description }}</p>
        <p class="card-text">
          Spart: {{ calculateSavedSoFar(savingGoal) }}/{{ savingGoal.targetAmount }} Kr
        </p>
        <p class="card-text">Avsluttes: {{ formatDate(savingGoal.targetDate) }}</p>
        <a class="btn btn-primary" @click="goToSavingGoal(savingGoal)">Gå til sparemål</a>
        <a class="btn btn-danger" @click="deleteSavingGoal" style="margin-left: 8px">
          <img src="../../assets/icons/trash-can.svg" /> Slett</a
        >
      </div>
    </div>
    <div v-if="oldSavingGoalList.lenght > 0">
      <h3>Old:</h3>
      <div v-for="(savingGoal, index) in oldSavingGoalList" :key="index" class="card bg-body">
        <div class="card-header">Sparemål {{ index + 1 }}</div>
        <div class="card-body">
          <h5 class="card-title">{{ savingGoal.name }}</h5>
          <p class="card-text">{{ savingGoal.description }}</p>
          <p class="card-text">
            {{ calculateSavedSoFar(savingGoal) }}/{{ savingGoal.targetAmount }}
          </p>
          <a class="btn btn-primary" @click="goToSavingGoal(savingGoal)">Gå til sparemål</a>
          <a class="btn btn-danger" @click="deleteSavingGoal" style="margin-left: 8px">Slett</a>
        </div>
      </div>
    </div>
  </div>
  <div class="loading" v-else>
    Laster...
    <img src="../../assets/loadingPig.png" alt="loadingPig" />
  </div>
</template>

<style scoped>
.card-header,
.card-text,
.card-title {
  color: white;
}

.card-header {
  background-color: #40698a;
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

.loading {
  color: white;
  font-size: 40px;
  font-weight: 500;
}

.loading img {
  width: 50%;
  height: 50%;
}

h3 {
  color: white;
}
</style>
