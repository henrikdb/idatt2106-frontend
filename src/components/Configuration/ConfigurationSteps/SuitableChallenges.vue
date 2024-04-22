<script setup lang="ts">
import { useRouter } from 'vue-router'
import ChallangeCheckBox from '@/components/Configuration/ChallangeCheckBox.vue'
import Button1 from '@/components/Buttons/Button1.vue'
import { ref } from 'vue'

const emit = defineEmits(['changeRouterEvent', 'challengesSelectedEvent'])
emit('changeRouterEvent', '/suitable-challenges')
const router = useRouter();

let chosenChallenges = ref([])
const challenges = ['Make packed lunch', 'Stop shopping', 'Drop coffee',
  'Quit subscription', 'Drop car', 'Short showers', 'Exercise outside', 'Make budget']

const onChangedChallengeEvent = (value) => {
  // if challenge is checked then add it to the chosenChallenges variable
  if (value[1]) {
    chosenChallenges.value.push(value[0])
  }
  // if challenge is unchecked then remove it from the chosenChallenges variable
  else {
    console.log('Reached')
    chosenChallenges.value = chosenChallenges.value.filter(item => item !== value[0]);
  }
  console.log(chosenChallenges.value)
}

const onClick = () => {
  emit('challengesSelectedEvent', chosenChallenges.value)
  router.push('/first-saving-goal')
}

</script>

<template>
  <div class="container">
    <div>
      <h3 class="d-flex align-items-center justify-content-center">
        Which challenges are suitable for you?
      </h3>
    </div>

    <div class="challenge-container">
      <ChallangeCheckBox v-for="(item, index) in challenges" :id="index" :text="item"
                         @challengeChangedEvent="onChangedChallengeEvent"
      />
    </div>

    <div class="confirm-button-container">
      <button1 id="confirmButton" @click="onClick" button-text="Continue"></button1>
    </div>
  </div>
</template>

<style scoped>
.challenge-container {
  justify-self: center;
  max-width: 500px;
}

#confirmButton {
  margin-bottom: 2rem;
  width: 300px;
}

.confirm-button-container {
  display: flex;
  justify-content: center;
}
</style>