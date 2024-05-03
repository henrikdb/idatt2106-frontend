<script setup lang="ts">
import BaseInput from '@/components/BaseComponents/Input/BaseInput.vue'
import { ref } from 'vue'
import BaseButton from '@/components/BaseComponents/Buttons/BaseButton.vue'
import { useRouter } from 'vue-router'
import {type CreateGoalDTO, GoalService} from "@/api";
import handleUnknownError from '@/components/Exceptions/unkownErrorHandler';

const router = useRouter();

// Updates progress bar in the parent Configuration component
const emit = defineEmits(['changeRouterEvent'])
emit('changeRouterEvent', '/first-saving-goal')

// Declaration of reactive variables for the form
const formRef = ref<any>()
const titleRef = ref<string>()
let descriptionRef = ref<string>()
const sumRef = ref<number>()
const dateRef = ref<string>()
const errorMessage = ref("")

/**
 * Adds the "was-validated" class to the form element, validates the form,
 * creates a payload for creating a goal, and then attempts to create the goal using GoalService.
 * If successful, it navigates the user to the home page ("/"), otherwise it handles any errors.
 */
const handleSubmit = async () => {
  // Check form validation
  formRef.value.classList.add("was-validated")
  const form = formRef.value
  if (!form.checkValidity()) {
    return;
  }

  // Declares the goal payload
  const createGoalPayload: CreateGoalDTO = {
    name: titleRef.value,
    description: descriptionRef.value,
    targetAmount: sumRef.value,
    targetDate: dateRef.value + " 00:00:00.000000000",
  };

  try {
    // Creates new goal with the payload
    await GoalService.createGoal({ requestBody: createGoalPayload });
    await router.push("/")
  } catch (error: any) {
    handleUnknownError(error);
    errorMessage.value = error.message;
  }
}

/**
 * Gets today's date in the format "YYYY-MM-DD".
 *
 * @returns Today's date in "YYYY-MM-DD" format.
 */
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

/**
 * Handles the input event for the goal title.
 *
 * @param newTitle The new title value entered by the user.
 */
const handleTitleInputEvent = (newTitle: string) => {
  titleRef.value = newTitle;
}

/**
 * Handles the input event for the goal date.
 *
 * @param newDate The new date value entered by the user.
 */
const handleDateInputEvent = (newDate: string) => {
  dateRef.value = newDate;
}

/**
 * Handles the input event for the goal sum.
 *
 * @param newSum The new sum value entered by the user.
 */
const handleSumInputEvent = (newSum: number) => {
  sumRef.value = newSum;
}

</script>

<template>

  <div class="container">
    <div>
      <h3 class="d-flex align-items-center justify-content-center">
        Nå gjenstår det kun ett steg
      </h3>
      <h5 class="d-flex align-items-center justify-content-center">
        Lag ditt første sparemål
      </h5>
    </div>

    <form ref="formRef" id="loginForm">
      <BaseInput :model-value="titleRef"
                 @input-change-event="handleTitleInputEvent"
                 id="titleInput"
                 input-id="title"
                 label="Navn"
                 placeholder="Oppgi navnet på sparemålet"/>
      <div>
        <label for="description">Description</label>
        <textarea v-model="descriptionRef"
                  type="text"
                  maxlength="150"
                  class="form-control"
                  placeholder="Oppgi en beskrivelse på sparemålet her (valgfritt)"
                  id="description"/>
      </div>
      <BaseInput :model-value="dateRef"
                 @input-change-event="handleDateInputEvent"
                 id="dueDateInput"
                 input-id="dueDate"
                 type="date"
                 :min="getTodayDate()"
                 label="Utløpsdato"/>
      <BaseInput :model-value="sumRef"
                 @input-change-event="handleSumInputEvent"
                 id="sumToSaveInput"
                 input-id="sumToSpareInput"
                 type="number"
                 label="Sum"
                 min="0"
                 placeholder="Oppgi summen du ønsker å spare (kr)"/>
    </form>

    <div class="confirm-button-container">
      <BaseButton id="confirmButton" @click="handleSubmit" button-text="Fortsett"></BaseButton>
    </div>
    <div style="color: red">
      {{ errorMessage }}
    </div>
  </div>

</template>

<style scoped>

#titleInput, #description, #dueDateInput, #sumToSaveInput {
  margin-top: 5px;
}

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