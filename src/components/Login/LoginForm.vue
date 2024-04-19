<script setup lang="ts">
import BaseInput from '@/components/InputFields/BaseInput.vue'
import Button1 from '@/components/Buttons/Button1.vue'
import { ref } from 'vue'
import { useUserInfoStore } from '@/stores/UserStore';
import { AuthenticationService, OpenAPI, LoginRequest } from '@/api';
import { useRouter, useRoute } from 'vue-router';
import handleUnknownError from '@/components/Exceptions/unkownErrorHandler';
import { useErrorStore } from '@/stores/ErrorStore';

const emailRef = ref()
const passwordRef = ref()
const formRef = ref()
let errorMsg = ref('');

const errorStore = useErrorStore();
const router = useRouter();
const userStore = useUserInfoStore();

const handleEmailInputEvent = (newValue: any) => {
  emailRef.value = newValue
}

const handlePasswordInputEvent = (newValue: any) => {
  passwordRef.value = newValue
}

const handleSubmit = async () => {
  const loginUserPayload: LoginRequest = {
    email: emailRef.value,
    password: passwordRef.value
  };

  try {
    let response = await AuthenticationService.login({ requestBody: loginUserPayload });

    if (response.token == null || response.token == undefined) {
      //errorBoxMsg.value = 'A valid token could not be created';
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
    <form ref="formRef" id="loginForm" @submit.prevent="handleSubmit" novalidate>
      <BaseInput :model-value="emailRef" @input-change-event="handleEmailInputEvent" id="emailInput" input-id="email"
        type="email" label="Email" placeholder="Enter your email" />
      <BaseInput :model-value="passwordRef" @input-change-event="handlePasswordInputEvent" id="passwordInput"
        input-id="password" type="password" label="Password" placeholder="Enter password" />
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
</style>