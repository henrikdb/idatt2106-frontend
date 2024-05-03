<template>
    <div class="containers">
      <div class="box">
        <h1 class="title">Tilbakestill passord</h1>
        <p>Fyll inn e-posten din, så sender vi deg instruksjoner for å tilbakestille passordet ditt.</p>
        <form @submit.prevent="submitForm" id="resetForm" ref="formRef" novalidate>
          <div class="form-floating inputBox">
            <input v-model="email" class="form-control" id="inputEmail" type="email"
                   placeholder="name@example.com" required>
            <label for="emailInput">Skriv inn din e-post</label>
          </div>
  
          <div v-if="errorMessage" class="text-danger">
            {{ errorMessage }}
          </div>
          <div v-else class="text-success">
            {{ confirmationMessage }}
          </div>
          <BaseButton id="confirmButton" type="submit" :disabled="isSubmitting" button-text="Send e-post"></BaseButton>
  
          <div class="login-link">
            <Router-Link to="/login" class="small">Gå tilbake</Router-Link>
          </div>
        </form>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue';
  import { UserService } from '@/api';
  import BaseButton from '@/components/BaseComponents/Buttons/BaseButton.vue'
  import handleUnknownError from '@/components/Exceptions/unkownErrorHandler';
  
  const formRef = ref()
  const form = formRef.value;
  const email = ref('');
  const confirmationMessage = ref('');
  const errorMessage = ref('');
  const isSubmitting = ref(false);
  
  const submitForm = async () => {
    if (isSubmitting.value) return;
    isSubmitting.value = true;
  
    formRef.value.classList.add("was-validated")
  
    try {
      await UserService.resetPassword({ requestBody: email.value });
      confirmationMessage.value = 'An email has been sent to your email address with a link to reset your password.';
      errorMessage.value = '';
    } catch (error) {
      handleUnknownError(error);
      errorMessage.value = 'Failed to send email. Please try again.';
      confirmationMessage.value = '';
    }
    isSubmitting.value = false;
  };
  </script>
  
  <style scoped>
  .containers {
    background: url('@/assets/wave.svg');
    background-size: cover;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .box {
    background-color: white;
    border-radius: 1rem;
    width: 100%;
    max-width: 450px;
    padding: 2rem;
    box-shadow: rgba(57, 57, 63, 0.5) 0px 1px 20px 0px;
    text-align: center;
  }
  
  h1 {
    font-size: 2rem;
    font-weight: bold;
    text-align: center;
  }
  
  #resetForm {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  .login-link {
    width: 100%;
    font-size: 14px;
    margin-top: 10px;
    text-align: center;
  }
  
  .inputBox {
    width: 100%;
    margin: 20px;
  }
  </style>
  