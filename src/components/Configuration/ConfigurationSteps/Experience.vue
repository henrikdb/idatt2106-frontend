<script setup lang="ts">

import Button1 from '@/components/Buttons/Button1.vue'

import { useRouter } from 'vue-router'
import { ref } from 'vue'

const router = useRouter();
const formRef = ref()
const onClick = () => {
  const radios = formRef.value.querySelectorAll('input[type="radio"]');
  const checkedRadios = Array.from(radios).filter(radio => radio.checked);

  if (checkedRadios.length === 0) {
    alert('Please select an option.');
    return;
  }

  router.push('/suitable-challenges')
}

const emit = defineEmits(['changeRouterEvent'])
emit('changeRouterEvent', '/experience')

</script>

<template>
  <div class="container">
    <div>
      <h3 class="d-flex align-items-center justify-content-center">
        How much experice do you have with saving money?
      </h3>
    </div>

    <form class="btn-group-vertical" ref="formRef" @submit.prevent="onClick">

      <input type="radio" class="btn-check" name="experience" id="btn-check-outlined" autocomplete="off">
      <label class="btn btn-outline-primary d-flex align-items-center justify-content-center" for="btn-check-outlined">Beginner</label>

      <input type="radio" class="btn-check" name="experience" id="btn-check2-outlined" autocomplete="off">
      <label class="btn btn-outline-primary d-flex align-items-center justify-content-center" for="btn-check2-outlined">Some experience</label>

      <input type="radio" class="btn-check" name="experience" id="btn-check3-outlined" autocomplete="off">
      <label class="btn btn-outline-primary d-flex align-items-center justify-content-center" for="btn-check3-outlined">Expert</label>
    </form>

    <div class="confirm-button-container">
      <button1 id="confirmButton" @click="onClick" button-text="Continue"></button1>
    </div>
</div>
</template>

<style scoped>
#confirmButton {
  margin-bottom: 2rem;
  width: 300px;
}

.confirm-button-container {
  display: flex;
  justify-content: center;
}
</style>