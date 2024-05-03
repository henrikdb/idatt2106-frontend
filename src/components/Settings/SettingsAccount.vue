<script setup lang="ts">
import { ref, onMounted } from 'vue';
import BaseInput from '@/components/BaseComponents/Input/BaseInput.vue';
import { useUserInfoStore } from "@/stores/UserStore";
import { UserService } from '@/api';
import type { UserUpdateDTO } from '@/api';
import handleUnknownError from '@/components/Exceptions/unkownErrorHandler';
import router from '@/router'

const emailRef = ref('')
const errorMsg = ref('')
const confirmationMsg = ref('')
const errorMsg2 = ref('')

/**
 * Handles the email input event by updating the email reference value.
 *
 * @param {any} newValue - The new value of the email input.
 */
const handleEmailInputEvent = (newValue: any) => {
  emailRef.value = newValue
}

/**
 * Sets up the form by fetching user data and populating the email field if available.
 * Clears confirmation and error messages.
 * Handles errors by displaying a generic error message and updating the error message field.
 */
async function setupForm() {
  try {
    let response = await UserService.getUser();
    if (response.email != null) {
      emailRef.value = response.email
    }
    confirmationMsg.value = '';
    errorMsg.value = '';
  } catch (err) {
    errorMsg.value = handleUnknownError(err);
    confirmationMsg.value = ''
  }
}

/**
 * Handles form submission by updating the user's email.
 * Updates the confirmation message upon successful email update.
 * Handles errors and updates the error message accordingly.
 */
const handleSubmit = async () => {
  // Construct payload for updating user email
  const updateUserPayload: UserUpdateDTO = {
    email: emailRef.value,
  };
  try {
    // Send request to update user email
    UserService.update({ requestBody: updateUserPayload })
    // Update user info in the store
    useUserInfoStore().setUserInfo({
        email: emailRef.value,
    })
    confirmationMsg.value = 'Email updated successfully!'
    errorMsg.value = '';
  } catch (err) {
    handleUnknownError(err);
    errorMsg.value = "Error updating email, try again!";
    confirmationMsg.value = ''
  }
}

const handleSubmit2 = async () => {
  try {
    console.log("test")
    UserService.deleteUser();
    console.log("test")
    useUserInfoStore().clearUserInfo();
    await router.push("/login");
  } catch (err) {
    errorMsg2.value = handleUnknownError(err);
  }
}
onMounted(() => {
  setupForm()
})
</script>

<template>
  <div class="tab-pane active" id="account">
      <h6>KONTO</h6>
      <hr>
      <form @submit.prevent="handleSubmit">
          <div class="form-group">
              <BaseInput data-cy="email-input" :model-value="emailRef"
                         @input-change-event="handleEmailInputEvent" id="emailInput-change"
                  input-id="email-new" type="email" label="E-post" placeholder="Skriv inn din e-post"
                  invalid-message="Ugyldig e-post"/>
          </div>
          <p data-cy="change-email-msg-error" class="text-danger">{{ errorMsg }}</p>
          <p data-cy="change-email-msg-confirm" class="text-success">{{ confirmationMsg }}</p>
          <br>
          <button data-cy="change-email-btn" type="submit" class="btn btn-primary classyButton">Endre
            Informasjon</button>
      </form>
      <form @submit.prevent="handleSubmit2" style="margin-top: 20px;">
        <div class="form-group">
          <label class="d-block text-danger">Slett Bruker</label>
          <p class="text-muted font-size-sm">Obs: Når du først har slettet kontoen din, er det ingen vei tilbake.</p>
        </div>
        <p data-cy="delete-user-msg-error" class="text-danger">{{ errorMsg2 }}</p>
        <button class="btn btn-danger" type="submit">Slett Bruker</button>
      </form>
  </div>
</template>

<style scoped>
  .classyButton {
    background-color: #003A58;
    border: #003A58;
  }

  .classyButton:hover {
    background-color: #003b58ec;
    border: #003A58;
  }

  .classyButton:active {
    background-color: #003b58d6;
    border: #003A58;
  }
</style>
