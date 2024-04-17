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
      <BaseInput id="usernameInput"
                 input-id="username"
                 type="text"
                 label="Username"
                 placeholder="Enter username"/>
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
  height: 91vh;
  display: grid;
  justify-items: center;
  align-items: center;
}

#usernameInput, #passwordInput, #confirmButton {
  margin: 15px 0;
}

#confirmButton {
  justify-content: center;
}

#loginForm {
  display: flex;
  flex-direction: column;
  min-width: 280px;
  width: 40%;
}
</style>