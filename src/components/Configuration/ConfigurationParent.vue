<script setup lang="ts">
import ProgressBar from '@/components/Configuration/ConfigurationProgressBar.vue'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useRoute } from 'vue-router'

const router = useRouter()

// The configuration steps with path and order value.
const configurationSteps = {'/bank-account': 1,'/commitment': 2, '/suitable-challenges': 3, '/first-saving-goal': 4, '/finished-configuration': 5}
const length = Object.keys(configurationSteps).length
let percentage = ref(1/length);

// Initially pushes to the commitment-RouterView and sets current path to this path.
router.push(Object.keys(configurationSteps)[0])
let currentRoute = useRoute()
let currentPath = currentRoute.fullPath
type ConfigurationStepPath = keyof typeof configurationSteps;

/**
 * Sets the current path variable to the child component's route path.
 * Maps the path with its value and updates the percentage value for the progressbar.
 *
 * @param path The path of the newly navigated route.
 */
const onNewRouteEvent = (path: ConfigurationStepPath) => {
  currentPath = path
  percentage.value = (1/length) * configurationSteps[path]
}

</script>

<template>
  <div class="container">
    <div class="progress-bar-container">
      <ProgressBar id="progressbar" :percentage="percentage"/>
    </div>
    <div class="configuration-container">
      <RouterView @changeRouterEvent="onNewRouteEvent"/>
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