<script setup lang="ts">
import BaseInput from '@/components/InputFields/BaseInput.vue'
import { ref } from 'vue'
import Button1 from '@/components/Buttons/Button1.vue'

import { useRouter } from 'vue-router'

const router = useRouter();

const emit = defineEmits(['changeRouterEvent'])
emit('changeRouterEvent', '/first-saving-goal')

const formRef = ref()
const titleRef = ref()
const sumRef = ref()
const dateRef = ref()

const onClick = () => {
  formRef.value.classList.add("was-validated")
}

const getTodayDate = () => {
  const today = new Date();
  const year = today.getFullYear();
  let month = today.getMonth() + 1;
  let day = today.getDate();

  // Ensure month and day are in double digits
  month = month < 10 ? `0${month}` : month;
  day = day < 10 ? `0${day}` : day;

  console.log(`${year}-${month}-${day}`)

  return `${year}-${month}-${day}`;
};

</script>

<template>
  <div class="container">
    <div>
      <h3 class="d-flex align-items-center justify-content-center">
        Create your first saving goal
      </h3>
    </div>

    <form ref="formRef" id="loginForm" @submit.prevent="handleSubmit">
      <BaseInput :model-value="titleRef"
                 @input-change-event="handleEmailInputEvent"
                 id="titleInput"
                 input-id="title"
                 label="Title"
                 placeholder="Enter the title of the saving goal"/>
      <BaseInput :model-value="sumRef"
                 @input-change-event="handlePasswordInputEvent"
                 id="sumToSaveInput"
                 input-id="sumToSpareInput"
                 type="number"
                 label="Sum to save"
                 min="0"
                 placeholder="Enter the sum you would like to spare"/>
      <BaseInput :model-value="dateRef"
                 @input-change-event="handlePasswordInputEvent"
                 id="dueDateInput"
                 input-id="dueDate"
                 type="date"
                 :min="getTodayDate()"
                 label="Due date"/>
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