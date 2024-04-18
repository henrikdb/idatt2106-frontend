<script setup lang="ts">
import BaseInput from '@/components/InputFields/BaseInput.vue'
import Button1 from '@/components/Buttons/Button1.vue'
import { ref } from 'vue'

const emailRef = ref()
const passwordRef = ref()
const formRef = ref()

const handleEmailInputEvent = (newValue: any) => {
  emailRef.value = newValue
}

const handlePasswordInputEvent = (newValue: any) => {
  passwordRef.value = newValue
}

const handleSubmit = () => {
  formRef.value.classList.add("was-validated")
  alert("Expected to be logged in when backend are finished") // Todo remove this line
}

</script>

<template>
  <div class="container-fluid">
    <form ref="formRef" id="loginForm" @submit.prevent="handleSubmit">
      <BaseInput :model-value="emailRef"
                 @input-change-event="handleEmailInputEvent"
                 id="emailInput"
                 input-id="email"
                 type="email"
                 label="Email"
                 placeholder="Enter your email"/>
      <BaseInput :model-value="passwordRef"
                 @input-change-event="handlePasswordInputEvent"
                 id="passwordInput"
                 input-id="password"
                 type="password"
                 label="Password"
                 placeholder="Enter password"/>
      <button1 id="confirmButton" type="submit" @click="handleSubmit" button-text="Login"></button1>
    </form>
  </div>
</template>

<style scoped>
.container-fluid {
    max-width: 450px;
}

#loginForm {
  display: flex;
  flex-direction: column;
  justify-items: center;
}

#emailInput, #passwordInput, #confirmButton {
  margin: 1rem 0;
}
</style>