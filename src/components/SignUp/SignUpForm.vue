<script setup lang="ts">
import BaseInput from '@/components/InputFields/BaseInput.vue'
import Button1 from '@/components/Buttons/Button1.vue'

const handleSubmit = () => {
  alert("Expected to be transferred to initial configuration") // Todo remove this line
}

</script>

<template>
  <div class="container">
    <form id="signUpForm" @submit.prevent="handleSubmit">
      <BaseInput id="firstNameInput"
                 input-id="first-name"
                 type="text"
                 label="First name"
                 placeholder="Enter your first name"/>
      <BaseInput id="surnameInput"
                 input-id="surname"
                 type="text"
                 label="Surname"
                 placeholder="Enter your surname"/>
      <BaseInput id="emailInput"
                 input-id="email"
                 type="text"
                 label="Email"
                 placeholder="Enter your email"/>
      <BaseInput id="passwordInput"
                 input-id="password"
                 type="password"
                 label="Password"
                 placeholder="Enter password"/>
      <BaseInput id="confirmPasswordInput"
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