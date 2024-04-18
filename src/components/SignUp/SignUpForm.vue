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
}

const handleConfirmPasswordInputEvent = (newValue: any) => {
  confirmPasswordRef.value = newValue
}

const handleSubmit = () => {
  formRef.value.classList.add("was-validated")
  alert("Expected to be transferred to initial configuration") // Todo remove this line
  router.push("/configuration")
}

</script>

<template>
  <div class="container">
    <form ref="formRef" id="signUpForm" @submit.prevent="handleSubmit">
      <BaseInput :model-value="firstNameRef.value"
                 @input-change-event="handleFirstNameInputEvent"
                 ref="firstNameRef"
                 id="firstNameInput"
                 input-id="first-name"
                 type="text"
                 label="First name"
                 placeholder="Enter your first name"/>
      <BaseInput :model-value="surnameRef.value"
                 @input-change-event="handleSurnameInputEvent"
                 ref="surnameRef"
                 id="surnameInput"
                 input-id="surname"
                 type="text"
                 label="Surname"
                 placeholder="Enter your surname"/>
      <BaseInput :model-value="emailRef.value"
                 @input-change-event="handleEmailInputEvent"
                 ref="emailRef"
                 id="emailInput"
                 input-id="email"
                 type="email"
                 label="Email"
                 placeholder="Enter your email"/>
      <BaseInput :model-value="passwordRef.value"
                 @input-change-event="handlePasswordInputEvent"
                 ref="passwordRef"
                 id="passwordInput"
                 input-id="password"
                 type="password"
                 label="Password"
                 placeholder="Enter password"/>
      <BaseInput :model-value="confirmPasswordRef.value"
                 @input-change-event="handleConfirmPasswordInputEvent"
                 ref="confirmPasswordRef"
                 id="confirmPasswordInput"
                 input-id="confirmPassword"
                 type="password"
                 label="Confirm Password"
                 placeholder="Confirm password"/>
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