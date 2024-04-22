<script setup lang="ts">
import BaseInput from '@/components/InputFields/BaseInput.vue'
import Button1 from '@/components/Buttons/Button1.vue'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter();

const firstNameRef = ref('')
const surnameRef = ref('')
const emailRef = ref('')
const passwordRef = ref('')
const confirmPasswordRef = ref('')
const formRef = ref()
let samePasswords = ref(true)

const handleFirstNameInputEvent = (newValue: any) => {
  firstNameRef.value = newValue
  console.log(firstNameRef.value)
}

const handleSurnameInputEvent = (newValue: any) => {
  surnameRef.value = newValue
}

const handleEmailInputEvent = (newValue: any) => {
  emailRef.value = newValue
}

const handlePasswordInputEvent = (newValue: any) => {
  passwordRef.value = newValue
  console.log(passwordRef.value)
}

const handleConfirmPasswordInputEvent = (newValue: any) => {
  confirmPasswordRef.value = newValue
  console.log(confirmPasswordRef.value)
}

const handleSubmit = async () => {
  console.log(firstNameRef.value)

  samePasswords.value = (passwordRef.value === confirmPasswordRef.value)
  console.log(samePasswords.value)
  const form = formRef.value;

  // Check if the form is valid
  if (form.checkValidity()) {
    // Form is valid, submit the form or perform other actions
    console.log('Form is valid');
  } else {
    console.log('Form is not valid');
  }


  formRef.value.classList.add("was-validated")
}

</script>

<template>
  <div class="container">
    <form ref="formRef" id="signUpForm" @submit.prevent="handleSubmit">
      <BaseInput :model-value="firstNameRef"
                 @input-change-event="handleFirstNameInputEvent"
                 ref="firstNameRef"
                 id="firstNameInput"
                 input-id="first-name"
                 type="text"
                 label="First name"
                 placeholder="Enter your first name"
                 invalid-message="Please enter your first name"/>
      <BaseInput :model-value="surnameRef"
                 @input-change-event="handleSurnameInputEvent"
                 ref="surnameRef"
                 id="surnameInput"
                 input-id="surname"
                 type="text"
                 label="Surname"
                 placeholder="Enter your surname"
                 invalid-message="Please enter your surname"/>
      <BaseInput :model-value="emailRef"
                 @input-change-event="handleEmailInputEvent"
                 ref="emailRef"
                 id="emailInput"
                 input-id="email"
                 type="email"
                 label="Email"
                 placeholder="Enter your email"
                 invalid-message="Invalid email"/>
      <BaseInput :model-value="passwordRef"
                 @input-change-event="handlePasswordInputEvent"
                 ref="passwordRef"
                 id="passwordInput"
                 input-id="password"
                 type="password"
                 pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{4,16}"
                 label="Password"
                 placeholder="Enter password"
                 invalid-message="Password must be between 4 and 16 characters and contain one capital letter, small letter and a number"/>
      <BaseInput :modelValue="confirmPasswordRef"
                 @input-change-event="handleConfirmPasswordInputEvent"
                 ref="confirmPasswordRef"
                 id="confirmPasswordInput"
                 input-id="confirmPassword"
                 type="password"
                 pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{4,16}"
                 label="Confirm Password"
                 placeholder="Confirm password"
                 invalid-message="Password must be between 4 and 16 characters and contain one capital letter, small letter and a number"/>
      <p v-if="samePasswords" class="text-danger">The passwords are not identical</p>
      <button1 id="confirmButton" @click="handleSubmit" button-text="Sign up"></button1>
    </form>
  </div>

</template>

<style scoped>

.container {
  max-width: 450px;
}

#signUpForm {
  display: flex;
  flex-direction: column;
  justify-items: center;
}

#firstNameInput, #surnameInput, #emailInput, #passwordInput, #confirmButton, #confirmPasswordInput {
  margin: 1rem 0;
}
</style>