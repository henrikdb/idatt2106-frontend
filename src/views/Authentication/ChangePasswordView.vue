<template>
    <div class="containers">
      <div class="box">
        <div class="container-fluid">
          <div class="container-fluid d-flex justify-content-center align-items-center flex-column mt-5">
            <h1>Opprett nytt passord</h1>
          </div>
          <form ref="formRef" id="loginForm" @submit.prevent="handleSubmit" novalidate>

            <BaseInput :model-value="newPassword"
                       @input-change-event="handlePasswordInputEvent"
                       id="passwordInput"
                       input-id="password"
                       type="password"
                       pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{4,16}"
                       label="Passord"
                       placeholder="Skriv inn ditt passord"
                       invalid-message="Passordet må være mellom 4 og 16 tegn og inneholde én stor bokstav, liten bokstav og et tall"
            />

            <BaseInput :model-value="confirmPassword"
                       @input-change-event="handleConfirmPasswordInputEvent"
                       id="confirmPasswordInput"
                       input-id="password"
                       type="password"
                       pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{4,16}"
                       label="Bekreft Passord"
                       placeholder="Skriv inn ditt passord"
                       invalid-message="Passordet må være mellom 4 og 16 tegn og inneholde én stor bokstav, liten bokstav og et tall"
            />

            <p class="text-danger" data-cy="error">{{ errorMsg }}</p>
            <p v-if="!samePasswords" class="text-danger">Passordene er ikke like</p>
            <button1 id="confirmButton" type="submit" @click="handleSubmit" :disabled="isSubmitting" button-text="Oppdater passordet"></button1>

            <SignUpLink/>
          </form>
        </div>
          <!--<div class="row justify-content-center">
              <div class="col-lg-5">
                  <div class="card shadow-lg border-0 rounded-lg mt-5">
                      <div class="card-header">
                          <h3 class="text-center font-weight-light my-4">Password Recovery</h3>
                      </div>
                      <div class="card-body">
                          <div class="small mb-3 text-muted">Enter the new password for your account</div>
                          <form @submit.prevent="submitForm">
                              <div class="form-floating mb-3">
                                  <input v-model="newPassword" class="form-control" id="newPassword" type="password"
                                      placeholder="New Password" required>
                                  <label for="newPassword">Enter your new password</label>
                              </div>
                              <div class="form-floating mb-3">
                                  <input v-model="confirmPassword" class="form-control" id="confirmPassword"
                                      type="password" placeholder="Confirm Password" required>
                                  <label for="confirmPassword">Confirm your new password</label>
                              </div>
                              <div class="errorMsg">{{ errormsg }}</div>
                              <div class="d-flex align-items-center justify-content-between mt-4 mb-0">
                                  <router-link to="/login" class="small">Return to login</router-link>
                                  <button class="btn btn-primary" type="submit">Confirm Password</button>
                              </div>
                          </form>
                      </div>
                      <div class="card-footer text-center py-3">
                          <div class="small"><router-link to="/sign-up">Need an account? Sign up!</router-link></div>
                      </div>
                  </div>
              </div>
          </div>-->
      </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import axios from 'axios';
import { UserService } from '@/api';
import SignUpLink from '@/components/SignUp/SignUpLink.vue'
import Button1 from '@/components/Buttons/Button1.vue'
import BaseInput from '@/components/InputFields/BaseInput.vue'
import handleUnknownError from '@/components/Exceptions/unkownErrorHandler'

const router = useRouter();
const route = useRoute();

const token = route.params.token;

const newPassword = ref('');
const confirmPassword = ref('');
const formRef = ref()
let samePasswords = ref(true)
let errorMsg = ref('');
const isSubmitting = ref(false);

const handlePasswordInputEvent = (newValue: any) => {
  newPassword.value = newValue
}

const handleConfirmPasswordInputEvent = (newValue: any) => {
  confirmPassword.value = newValue
}

const handleSubmit = async () => {
  if (isSubmitting.value) return;
  isSubmitting.value = true;

  samePasswords.value = (newPassword.value === confirmPassword.value)
  formRef.value.classList.add("was-validated")

  const form = formRef.value;
  if (form.checkValidity()) {
    if (samePasswords.value) {
      try {
        const resetPassword = {
          password: newPassword.value,
          token: token as string,
        };
        await UserService.confirmPasswordReset({ requestBody: resetPassword });
        router.push('/login');
      } catch (error) {
        errorMsg.value = handleUnknownError(error);
      }
    }
  }
  isSubmitting.value = false;
};

</script>

<style scoped>
.containers {
  background: url('@/assets/wave.svg');
  background-repeat: no-repeat;
  background-size: cover;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.box {
  background-color: white;
  border-radius: 1rem;
  max-width: 450px;
  padding: 0 3rem 1rem 3rem;
  box-shadow: rgba(57, 57, 63, 0.5) 0px 1px 20px 0px;
}

h1 {
  font-size: 2rem;
  font-weight: bold;
}

.container-fluid {
  max-width: 450px;
}

#loginForm {
  display: flex;
  flex-direction: column;
  align-items: center;
}

#passwordInput,
#confirmPasswordInput {
  margin: 1rem 10rem;
  width: 100%;
}
</style>