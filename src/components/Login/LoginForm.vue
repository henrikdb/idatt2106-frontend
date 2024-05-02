<script setup lang="ts">
import BaseInput from '@/components/BaseComponents/Input/BaseInput.vue'
import BaseButton from '@/components/BaseComponents/Buttons/BaseButton.vue'
import { ref } from 'vue'
import { useUserInfoStore } from '@/stores/UserStore';
import { AuthenticationService, OpenAPI, type LoginRequest } from '@/api';
import { useRouter, useRoute } from 'vue-router';
import handleUnknownError from '@/components/Exceptions/unkownErrorHandler';
import { useErrorStore } from '@/stores/ErrorStore';
import SignUpLink from '@/components/SignUp/SignUpLink.vue'

const emailRef = ref('')
const passwordRef = ref('')
const formRef = ref()
let errorMsg = ref('');
const isSubmitting = ref(false);

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
  console.log(emailRef.value)
  console.log(passwordRef.value)
  if (isSubmitting.value) return;
  isSubmitting.value = true;

  formRef.value.classList.add("was-validated")

  const form = formRef.value;
  if (!form.checkValidity()) {
    isSubmitting.value = false;
    return;
  }

  const loginUserPayload: LoginRequest = {
    email: emailRef.value,
    password: passwordRef.value
  };

  try {
    let response = await AuthenticationService.login({ requestBody: loginUserPayload });
    if (response.token == null || response.token == undefined) {
      errorMsg.value = 'A valid token could not be created';
      isSubmitting.value = false;
      return;
    }

    OpenAPI.TOKEN = response.token;

    userStore.setUserInfo({
      id: response.userId,
      accessToken: response.token,
      firstname: response.firstName,
      lastname: response.lastName,
      email: emailRef.value,
      role: response.role,
      subscriptionLevel: response.subscriptionLevel,
      profileImage: response.profileImage
    });

    console.log(response.token)

    await router.push({ name: 'roadmap' });
  } catch (error: any) {
    errorMsg.value = handleUnknownError(error);
    isSubmitting.value = false;
  }
}

</script>

<template>
  <div class="container-fluid">
    <div class="container-fluid d-flex justify-content-center align-items-center flex-column mt-5">
      <h1>Logg inn</h1>
    </div>
    <form ref="formRef" id="loginForm" @submit.prevent="handleSubmit" novalidate>

      <BaseInput :model-value="emailRef"
                 @input-change-event="handleEmailInputEvent"
                 id="emailInput"
                 input-id="email"
                 type="email"
                 label="E-post"
                 placeholder="Skriv inn din e-post"
                 invalid-message="Ugyldig e-post"
      />

      <BaseInput :model-value="passwordRef"
                 @input-change-event="handlePasswordInputEvent"
                 id="passwordInput"
                 input-id="password"
                 type="password"
                 pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{4,16}"
                 label="Passord"
                 placeholder="Skriv inn ditt passord"
                 invalid-message="Passordet må være mellom 4 og 16 tegn og inneholde én stor bokstav, liten bokstav og et tall"
      />

      <div class="password-reset-link">
        <RouterLink to="/forgotten-password">Glemt passord?</RouterLink>
      </div>

      <p class="text-danger" data-cy="error">{{ errorMsg }}</p>
      <BaseButton id="confirmButton" type="submit" @click="handleSubmit" :disabled="isSubmitting" button-text="Logg inn"></BaseButton>

      <a class="btn bankid-btn" href="https://preprod.signicat.com/oidc/authorize?response_type=code&scope=openid+profile+signicat.national_id&client_id=demo-preprod&redirect_uri=http%3A%2F%2Flocalhost%3A8080%2Fredirect&acr_values=urn:signicat:oidc:method:nbid&state=nbid:auth_demo_bankid:123456789">
        <img src="/src/assets/bankid.svg" width="26" height="26">
        Fortsett med BankID
      </a>

      <SignUpLink/>
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
  align-items: center;
}

#emailInput,
#passwordInput,
#confirmButton {
  margin: 1rem 10rem;
  width: 100%;
}

h1 {
  font-size: 2rem;
  font-weight: bold;
}

.bankid-btn {
  margin: 15px;
  font-weight: 500;
}

.password-reset-link {
  width: 100%;
  display: flex;
  justify-content: flex-start;
  font-size: 14px;
}
</style>