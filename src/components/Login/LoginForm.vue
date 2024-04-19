<script setup lang="ts">
import BaseInput from '@/components/InputFields/BaseInput.vue'
import Button1 from '@/components/Buttons/Button1.vue'
import { ref } from 'vue'
import { useUserInfoStore } from '@/stores/UserStore';
import { AuthenticationService, OpenAPI, LoginRequest } from '@/api';
import { useRouter, useRoute } from 'vue-router';
import handleUnknownError from '@/components/Exceptions/unkownErrorHandler';
import { useErrorStore } from '@/stores/ErrorStore';

const emailRef = ref('')
const passwordRef = ref('')
const formRef = ref()
let errorMsg = ref('');

const errorStore = useErrorStore();
const router = useRouter();
const userStore = useUserInfoStore();

const handleEmailInputEvent = (newValue: any) => {
  emailRef.value = newValue
  console.log(emailRef.value)
}

const handlePasswordInputEvent = (newValue: any) => {
  passwordRef.value = newValue
  console.log(passwordRef.value)
}

const handleSubmit = async () => {
  console.log(emailRef.value)
  console.log(passwordRef.value)

  formRef.value.classList.add("was-validated")
  const loginUserPayload: LoginRequest = {
    email: emailRef.value,
    password: passwordRef.value
  };

  try {
    let response = await AuthenticationService.login({ requestBody: loginUserPayload });

    if (response.token == null || response.token == undefined) {
      errorMsg.value = 'A valid token could not be created';
      return;
    }

    OpenAPI.TOKEN = response.token;

    userStore.setUserInfo({
      accessToken: response.token,
      firstname: response.firstName,
      lastname: response.lastName,
      email: emailRef.value,
      role: response.role,
    });
    router.push({ name: 'home' });
  } catch (error: any) {
    errorMsg.value = handleUnknownError(error);
  }
}

</script>

<template>
  <div class="container-fluid">
    <div class="container-fluid d-flex justify-content-center align-items-center flex-column mt-5">
      <img src="@/assets/Sparesti-logo.png" style="width: 300px">
      <h1>Sparesti.no</h1>
    </div>
    <form ref="formRef" id="loginForm" @submit.prevent="handleSubmit" novalidate>

      <BaseInput :model-value="emailRef"
                 @input-change-event="handleEmailInputEvent"
                 id="emailInput"
                 input-id="email"
                 type="email"
                 label="Email"
                 placeholder="Enter your email"
                 valid-message="Valid email"
                 invalid-message="Invalid email"
      />

      <BaseInput :model-value="passwordRef"
                 @input-change-event="handlePasswordInputEvent"
                 id="passwordInput"
                 input-id="password"
                 type="password"
                 pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{4,16}"
                 label="Password"
                 placeholder="Enter password"
                 valid-message="Valid password"
                 invalid-message="Password must be between 4 and 16 characters and contain one capital letter, small letter and a number"
      />

      <p class="text-danger">{{ errorMsg }}</p>
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

#emailInput,
#passwordInput,
#confirmButton {
  margin: 1rem 0;
}

h1 {
  font-size: 4rem;
}
</style>