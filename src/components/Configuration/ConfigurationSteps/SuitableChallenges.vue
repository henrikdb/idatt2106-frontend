<script setup lang="ts">

import { useRouter } from 'vue-router'

const router = useRouter();
const onClick = () => {
  router.push('/first-saving-goal')
}

import ChallangeCheckBox from '@/components/Configuration/ChallangeCheckBox.vue'
import Button1 from '@/components/Buttons/Button1.vue'

const emit = defineEmits(['changeRouterEvent'])
emit('changeRouterEvent', '/suitable-challenges')

const challenges = ['Make packed lunch', 'Stop shopping', 'Drop coffee',
  'Quit subscription', 'Drop car', 'Short showers', 'Exercise outside', 'Make budget', 'Others'
]

</script>

<template>
  <div class="container">
    <div>
      <h3 class="d-flex align-items-center justify-content-center">
        Which challenges are suitable for you?
      </h3>
    </div>

    <div class="challenge-container">
      <ChallangeCheckBox v-for="(item, index) in challenges" :id="index" :text="item"/>
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