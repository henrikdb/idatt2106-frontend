<script setup lang="ts">
import BaseInput from '@/components/InputFields/BaseInput.vue'
import Button1 from '@/components/Buttons/Button1.vue'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { AuthenticationService } from '@/api'
import handleUnknownError from '@/components/Exceptions/unkownErrorHandler'
import { useUserInfoStore } from '@/stores/UserStore'
import LoginLink from '@/components/Login/LoginLink.vue'

const router = useRouter();
const userStore = useUserInfoStore();

const firstNameRef = ref('')
const surnameRef = ref('')
const emailRef = ref('')
const passwordRef = ref('')
const confirmPasswordRef = ref('')
const formRef = ref()
let samePasswords = ref(true)
let errorMsg = ref('');

const handleFirstNameInputEvent = (newValue: any) => {
  firstNameRef.value = newValue
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

const handleSubmit = async () => {

  samePasswords.value = (passwordRef.value === confirmPasswordRef.value)
  formRef.value.classList.add("was-validated")

  const form = formRef.value;
  if (form.checkValidity()) {
    if (samePasswords.value) {
      try {
        let response = await AuthenticationService.validateEmail({email: emailRef.value});
        userStore.setUserInfo({
          firstname: firstNameRef.value,
          lastname: surnameRef.value,
          email: emailRef.value,
        });
        userStore.setPassword(passwordRef.value)
        await router.push('/configuration')
      } catch (error) {
        errorMsg.value = handleUnknownError(error);
      }
    }
  }
}

</script>

<template>
  <div class="container">
    <form ref="formRef" id="signUpForm" @submit.prevent="handleSubmit" novalidate>
      <BaseInput :model-value=firstNameRef
                 @input-change-event="handleFirstNameInputEvent"
                 id="firstNameInput"
                 input-id="first-name"
                 type="text"
                 label="First name"
                 placeholder="Enter your first name"
                 invalid-message="Please enter your first name"/>
      <BaseInput :model-value="surnameRef"
                 @input-change-event="handleSurnameInputEvent"
                 id="surnameInput"
                 input-id="surname"
                 type="text"
                 label="Surname"
                 placeholder="Enter your surname"
                 invalid-message="Please enter your surname"/>
      <BaseInput :model-value="emailRef"
                 @input-change-event="handleEmailInputEvent"
                 id="emailInput"
                 input-id="email"
                 type="email"
                 label="Email"
                 placeholder="Enter your email"
                 invalid-message="Invalid email"/>
      <BaseInput :model-value="passwordRef"
                 @input-change-event="handlePasswordInputEvent"
                 id="passwordInput"
                 input-id="password"
                 type="password"
                 pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{4,16}"
                 label="Password"
                 placeholder="Enter password"
                 invalid-message="Password must be between 4 and 16 characters and contain one capital letter, small letter and a number"/>
      <BaseInput :modelValue="confirmPasswordRef"
                 @input-change-event="handleConfirmPasswordInputEvent"
                 id="confirmPasswordInput"
                 input-id="confirmPassword"
                 type="password"
                 pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{4,16}"
                 label="Confirm Password"
                 placeholder="Confirm password"
                 invalid-message="Password must be between 4 and 16 characters and contain one capital letter, small letter and a number"/>
      <p class="text-danger">{{ errorMsg }}</p>
      <p v-if="!samePasswords" class="text-danger">The passwords are not identical</p>
      <button1 id="confirmButton" @click="handleSubmit" button-text="Sign up"></button1>
      <LoginLink/>
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