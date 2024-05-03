<template>
  <div class="tab-pane active" id="security">
    <h6>SIKKERHET</h6>
    <hr />
    <form @submit.prevent="handleSubmit">
      <div class="form-group">
        <h5 class="d-block">Endre passord</h5>
        <BaseInput
          data-cy="old-password-input"
          :model-value="oldPasswordRef"
          @input-change-event="handleOldPasswordInputEvent"
          id="passwordInput-change"
          input-id="password-old"
          type="password"
          pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{4,16}"
          label="Gammelt passord"
          placeholder="Skriv inn passord"
          invalid-message="Passordet må være mellom 4 og 16 tegn og inneholde en stor bokstav, en liten bokstav og et tall"
        />

        <BaseInput
          data-cy="new-password-input"
          :model-value="newPasswordRef"
          @input-change-event="handleNewPasswordInputEvent"
          id="passwordInput-change"
          input-id="password-new"
          type="password"
          pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{4,16}"
          label="Nytt passord"
          placeholder="Skriv inn passord"
          invalid-message="Passordet må være mellom 4 og 16 tegn og inneholde en stor bokstav, en liten bokstav og et tall"
        />

        <BaseInput
          data-cy="confirm-password-input"
          :model-value="confirmPasswordRef"
          @input-change-event="handleConfirmPasswordInputEvent"
          id="passwordInput-change"
          input-id="password-confirm"
          type="password"
          pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{4,16}"
          label="Bekreft nytt passord"
          placeholder="Skriv inn passord"
          invalid-message="Passordet må være mellom 4 og 16 tegn og inneholde en stor bokstav, en liten bokstav og et tall"
        />
      </div>
      <p class="text-danger" data-cy="error">{{ errorMsg }}</p>
      <button data-cy="update-password-btn" type="submit" class="btn btn-primary classyButton">
        Oppdater passord
      </button>
    </form>
    <hr />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import BaseInput from '@/components/BaseComponents/Input/BaseInput.vue'
import { type PasswordUpdateDTO, UserService } from '@/api'
import handleUnknownError from '@/components/Exceptions/unkownErrorHandler'

const oldPasswordRef = ref('')
const newPasswordRef = ref('')
const confirmPasswordRef = ref('')
let errorMsg = ref('')

/**
 * Handles the event when the old password input changes.
 * Updates the old password reference value.
 *
 * @param {any} newValue - The new value of the old password input.
 */
const handleOldPasswordInputEvent = (newValue: any) => {
  oldPasswordRef.value = newValue
}

/**
 * Handles the event when the new password input changes.
 * Updates the new password reference value.
 *
 * @param {any} newValue - The new value of the new password input.
 */
const handleNewPasswordInputEvent = (newValue: any) => {
  newPasswordRef.value = newValue
}

/**
 * Handles the event when the confirm-password input changes.
 * Updates the confirm-password reference value.
 *
 * @param {any} newValue - The new value of the confirm-password input.
 */
const handleConfirmPasswordInputEvent = (newValue: any) => {
  confirmPasswordRef.value = newValue
}

/**
 * Handles form submission for password update.
 * Validates if the new password matches the confirm-password.
 */
const handleSubmit = async () => {
  if (newPasswordRef.value.length === 0 || newPasswordRef.value !== confirmPasswordRef.value) {
    errorMsg.value = 'Passordene er ikke identiske'
    return
  }
  errorMsg.value = ''
  try {
    const updateUserPayload: PasswordUpdateDTO = {
      oldPassword: oldPasswordRef.value,
      newPassword: newPasswordRef.value
    }
    await UserService.updatePassword({ requestBody: updateUserPayload })
    errorMsg.value = ''
  } catch (err: any) {
    errorMsg.value = err.body.message
  }
}
</script>

<style scoped>
.classyButton {
  background-color: #003a58;
  border: #003a58;
}

.classyButton:hover {
  background-color: #003b58ec;
  border: #003a58;
}

.classyButton:active {
  background-color: #003b58d6;
  border: #003a58;
}

#passwordInput-change {
  margin-bottom: 15px;
}
</style>
