<script setup lang="ts">
import BaseInput from '@/components/InputFields/BaseInput.vue'
import Button1 from '@/components/Buttons/Button1.vue'

const handleSubmit = () => {
  alert("Expected to be logged in when backend are finished") // Todo remove this line
}
</script>

<template>
  <div class="container-fluid">
    <form id="loginForm" @submit.prevent="handleSubmit">
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
      <button1 id="confirmButton" @click="handleSubmit" button-text="Login"></button1>
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