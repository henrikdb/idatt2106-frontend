<script setup lang="ts">
import ProgressBar from '@/components/Configuration/ProgressBar.vue'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useRoute } from 'vue-router'

// Configuration variables
let bankId = ref('')
let commitment = ref('')
let experience = ref('')
let suitableChallenges = ref([])
let savingGoalTitle = ref('')
let sumToSpare = ref(0)
let dueDate = ref(null)

const router = useRouter()
// The configuration steps with path and order value.
const configurationSteps = {'/bank-id': 1, '/commitment': 2, '/experience': 3, '/suitable-challenges': 4, '/first-saving-goal': 5}
const length = Object.keys(configurationSteps).length
let percentage = ref(1/length);

// Initially pushes to '/bank-id' RouterView and sets current path to this path.
router.push(Object.keys(configurationSteps)[0])
let currentRoute = useRoute()
let currentPath = currentRoute.fullPath

// Sets the current path to a new path and updates progressbar
const onNewRouteEvent = (path) => {
  currentPath = path
  percentage.value = (1/length) * configurationSteps[path]
}

const onBankIdSelectedEvent = (value) => {
  bankId.value = value
}

const onCommitmentSelectedEvent = (value) => {
  commitment.value = value
}

const onExperienceSelectedEvent = (value) => {
  experience.value = value
}

const onChallengesSelectedEvent = (value) => {
  suitableChallenges.value = value
}

</script>

<template>
  <div class="container">
    <div class="progress-bar-container">
      <ProgressBar id="progressbar" :percentage="percentage"/>
    </div>
    <div class="configuration-container">
      <RouterView @changeRouterEvent="onNewRouteEvent"
                  @bankIdSelectedEvent="onBankIdSelectedEvent"
                  @commitmentSelectedEvent="onCommitmentSelectedEvent"
                  @experienceSelectedEvent="onExperienceSelectedEvent"
                  @challengesSelectedEvent="onChallengesSelectedEvent"
      />
    </div>
  </div>
</template>

<style scoped>
.container {
  display: grid;
  grid-template-rows: 0.5fr 2.3fr 0.2fr;
}

#progressbar {
  padding-top: 2rem;
}
</style>