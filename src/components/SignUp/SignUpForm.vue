<script setup lang="ts">
import BaseInput from '@/components/BaseComponents/Input/BaseInput.vue'
import BaseButton from '@/components/BaseComponents/Buttons/BaseButton.vue'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { AuthenticationService } from '@/api'
import handleUnknownError from '@/components/Exceptions/unkownErrorHandler'
import { useUserInfoStore } from '@/stores/UserStore'
import LoginLink from '@/components/Login/LoginLink.vue'

const router = useRouter();
const userStore = useUserInfoStore();

// Reactive variables for the form
const firstNameRef = ref('')
const surnameRef = ref('')
const emailRef = ref('')
const passwordRef = ref('')
const confirmPasswordRef = ref('')
const formRef = ref()
let samePasswords = ref(true)
let errorMsg = ref('');
const isSubmitting = ref(false);

/**
 * Handles the event when the first name input changes.
 * Updates the reference value of the first name input.
 *
 * @param {any} newValue - The new value of the first name input.
 */
const handleFirstNameInputEvent = (newValue: any) => {
  firstNameRef.value = newValue
}

/**
 * Handles the event when the surname input changes.
 * Updates the reference value of the surname input.
 *
 * @param {any} newValue - The new value of the surname input.
 */
const handleSurnameInputEvent = (newValue: any) => {
  surnameRef.value = newValue
}

/**
 * Handles the event when the email input changes.
 * Updates the reference value of the email input.
 *
 * @param {any} newValue - The new value of the email input.
 */
const handleEmailInputEvent = (newValue: any) => {
  emailRef.value = newValue
}

/**
 * Handles the event when the password input changes.
 * Updates the reference value of the password input.
 *
 * @param {any} newValue - The new value of the password input.
 */
const handlePasswordInputEvent = (newValue: any) => {
  passwordRef.value = newValue
}

/**
 * Handles the event when the confirm-password input changes.
 * Updates the reference value of the confirm-password input.
 *
 * @param {any} newValue - The new value of the confirm-password input.
 */
const handleConfirmPasswordInputEvent = (newValue: any) => {
  confirmPasswordRef.value = newValue
}

/**
 * Handles form submission for user registration.
 * Validates form inputs, checks password matching, and submits user information for registration.
 * Updates user information in the store upon successful registration.
 * Redirects the user to the configuration page after registration.
 */
const handleSubmit = async () => {
  if (isSubmitting.value) return;
  isSubmitting.value = true;

  // Validates form and displays validation
  samePasswords.value = (passwordRef.value === confirmPasswordRef.value)
  formRef.value.classList.add("was-validated")

  const form = formRef.value;
  if (form.checkValidity()) {
    if (samePasswords.value) {
      try {
        // Validates email
        await AuthenticationService.validateEmail({email: emailRef.value});
        // Set userInfo details in user store
        userStore.setUserInfo({
          firstname: firstNameRef.value,
          lastname: surnameRef.value,
          email: emailRef.value,
        });
        userStore.setPassword(passwordRef.value)
        await router.push('/configuration')
      } catch (error) {
        errorMsg.value = handleUnknownError(error);
        console.log(error)
      }
    }
  }
  isSubmitting.value = false;
}

</script>

<template>
  <div class="container-fluid">
    <div class="container-fluid d-flex justify-content-center align-items-center flex-column mt-5">
      <h1>Registrer deg</h1>
    </div>
    <form ref="formRef" id="signUpForm" @submit.prevent="handleSubmit" novalidate>
      <div class="row">
        <div class="col-sm">
          <BaseInput :model-value=firstNameRef
                     @input-change-event="handleFirstNameInputEvent"
                     id="firstNameInput"
                     input-id="first-name"
                     type="text"
                     pattern="^(?=.{4,16}$)[^\d]+$"
                     label="Fornavn"
                     placeholder="Skriv inn ditt fornavn"
                     invalid-message="Ugyldig fornavn, husk ingen tall, må være mellom 4 og 16 bokstaver"/>
          <BaseInput :model-value="surnameRef"
                     @input-change-event="handleSurnameInputEvent"
                     id="surnameInput"
                     input-id="surname"
                     type="text"
                     pattern="^(?=.{4,16}$)[^\d]+$"
                     label="Etternavn"
                     placeholder="Skriv inn ditt etternavn"
                     invalid-message="Ugyldig etternavn, må være mellom 4 og 16 bokstaver"/>
          <BaseInput :model-value="emailRef"
                     @input-change-event="handleEmailInputEvent"
                     id="emailInput"
                     input-id="email"
                     type="email"
                     label="E-post"
                     placeholder="Skriv inn din e-post"
                     invalid-message="Ugyldig e-post"/>
        </div>
        <div class="col-sm">
          <BaseInput :model-value="passwordRef"
                     @input-change-event="handlePasswordInputEvent"
                     id="passwordInput"
                     input-id="password"
                     type="password"
                     pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{4,16}"
                     label="Passord"
                     placeholder="Skriv inn passord"
                     invalid-message="Passordet må være mellom 4 og 16 tegn og inneholde én stor bokstav, liten bokstav og et tall"/>
          <BaseInput :modelValue="confirmPasswordRef"
                     @input-change-event="handleConfirmPasswordInputEvent"
                     id="confirmPasswordInput"
                     input-id="confirmPassword"
                     type="password"
                     pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{4,16}"
                     label="Bekreft Passord"
                     placeholder="Bekreft passord"
                     invalid-message="Passordet må være mellom 4 og 16 tegn og inneholde én stor bokstav, liten bokstav og et tall"
          />
        </div>
      </div>
      <p class="text-danger">{{ errorMsg }}</p>
      <p v-if="!samePasswords" class="text-danger">Passordene er ikke like</p>
      <BaseButton id="confirmButton" @click="handleSubmit" :disabled="isSubmitting" button-text="Registrer deg"></BaseButton>
      <LoginLink/>
    </form>
  </div>

</template>

<style scoped>

.container-fluid {
  max-width: 950px;
}

#signUpForm {
  display: flex;
  flex-direction: column;
  justify-items: center;
  width: 100%;
}

#firstNameInput, #surnameInput, #emailInput, #passwordInput, #confirmButton, #confirmPasswordInput {
  margin: 1rem 0;
}

h1 {
  font-size: 2rem;
  font-weight: bold;
}
</style>