<script setup lang="ts">
import BaseInput from '@/components/BaseComponents/Input/BaseInput.vue'
import { ref } from 'vue'
import BaseButton from '@/components/BaseComponents/Buttons/BaseButton.vue'
import { useRouter } from 'vue-router'
import {type CreateGoalDTO, GoalService} from "@/api";
import handleUnknownError from '@/components/Exceptions/unkownErrorHandler';

const router = useRouter();
const emit = defineEmits(['changeRouterEvent'])
emit('changeRouterEvent', '/first-saving-goal')

const formRef = ref<any>()
const titleRef = ref<string>()
let descriptionRef = ref<string>()
const sumRef = ref<number>()
const dateRef = ref<string>()
const errorMessage = ref("")

const handleSubmit = async () => {
  formRef.value.classList.add("was-validated")
  const form = formRef.value
  if (!form.checkValidity()) {
    return;
  }

  // TODO integrate user creation and goal creation with backend.
  const createGoalPayload: CreateGoalDTO = {
    name: titleRef.value,
    description: descriptionRef.value,
    targetAmount: sumRef.value,
    targetDate: dateRef.value + " 00:00:00.000000000",
  };

  try {
    await GoalService.createGoal({ requestBody: createGoalPayload });
    await router.push("/")
  } catch (error: any) {
    handleUnknownError(error);
    console.log(error.message);
    errorMessage.value = error.message;
  }
}

const getTodayDate = () => {
  const today = new Date();
  const year = today.getFullYear();
  let month: string | number = today.getMonth() + 1;
  let day: string | number = today.getDate();
  // Ensure month and day are in double digits
  month = month < 10 ? `0${month}` : month;
  day = day < 10 ? `0${day}` : day;
  return `${year}-${month}-${day}`;
};

const handleTitleInputEvent = (newTitle: string) => {
  titleRef.value = newTitle;
}

const handleDateInputEvent = (newDate: string) => {
  dateRef.value = newDate;
}

const handleSumInputEvent = (newSum: number) => {
  sumRef.value = newSum;
}

</script>

<template>

  <div class="container">
    <div>
      <h3 class="d-flex align-items-center justify-content-center">
        Now it remains only one step
      </h3>
      <h5 class="d-flex align-items-center justify-content-center">
        Create your first saving goal
      </h5>
    </div>

    <form ref="formRef" id="loginForm">
      <BaseInput :model-value="titleRef"
                 @input-change-event="handleTitleInputEvent"
                 id="titleInput"
                 input-id="title"
                 label="Title"
                 placeholder="Enter the title of the saving goal"/>
      <div>
        <label for="description">Description</label>
        <textarea v-model="descriptionRef"
                  type="text"
                  maxlength="150"
                  class="form-control"
                  placeholder="Enter description of the saving goal here (optional)"
                  id="description"/>
      </div>
      <BaseInput :model-value="dateRef"
                 @input-change-event="handleDateInputEvent"
                 id="dueDateInput"
                 input-id="dueDate"
                 type="date"
                 :min="getTodayDate()"
                 label="Due date"/>
      <BaseInput :model-value="sumRef"
                 @input-change-event="handleSumInputEvent"
                 id="sumToSaveInput"
                 input-id="sumToSpareInput"
                 type="number"
                 label="Sum to save"
                 min="0"
                 placeholder="Enter the sum you would like to spare (kr)"/>
    </form>

    <div class="confirm-button-container">
      <BaseButton id="confirmButton" @click="handleSubmit" button-text="Continue"></BaseButton>
    </div>
    <div style="color: red">
      {{ errorMessage }}
    </div>
  </div>

</template>

<style scoped>

#description {
  resize: none;
  height: auto;
}

#confirmButton {
  margin-top: 1rem;
  margin-bottom: 2rem;
  width: 300px;
}

.confirm-button-container {
  display: flex;
  justify-content: center;
}

</style>