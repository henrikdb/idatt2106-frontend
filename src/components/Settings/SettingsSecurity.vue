<template>
    <div class="tab-pane active" id="security">
        <h6>SIKKERHETSINNSTILLINGER</h6>
        <hr>
        <form @submit.prevent="handleSubmit" novalidate>
            <div class="form-group">
                <label class="d-block">Endre passord</label>
                <BaseInput data-cy="old-password-input" :model-value="oldPasswordRef"
                            @input-change-event="handleOldPasswordInputEvent"
                    id="passwordInput-change" input-id="password-old" type="password"
                    pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{4,16}" label="Gammelt passord" placeholder="Skriv inn passord"
                    invalid-message="Passordet må være mellom 4 og 16 tegn og inneholde en stor bokstav, en liten bokstav og et tall" />

                <BaseInput data-cy="new-password-input" :model-value="newPasswordRef"
                            @input-change-event="handleNewPasswordInputEvent"
                    id="passwordInput-change" input-id="password-new" type="password"
                    pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{4,16}" label="Nytt passord" placeholder="Skriv inn passord"
                    invalid-message="Passordet må være mellom 4 og 16 tegn og inneholde en stor bokstav, en liten bokstav og et tall" />

                <BaseInput data-cy="confirm-password-input" :model-value="confirmPasswordRef"
                            @input-change-event="handleConfirmPasswordInputEvent"
                    id="passwordInput-change" input-id="password-confirm" type="password"
                    pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{4,16}" label="Bekreft nytt passord" placeholder="Skriv inn passord"
                    invalid-message="Passordet må være mellom 4 og 16 tegn og inneholde en stor bokstav, en liten bokstav og et tall" />
            </div>
            <button data-cy="update-password-btn" type="submit" class="btn btn-primary">Oppdater
              passord</button>
            <button data-cy="reset-fields-btn" type="reset" class="btn btn-light">Tilbakestill
              endringer</button>
        </form>
        <hr>
    </div>
</template>


<script setup lang="ts">
import { ref } from 'vue'
import BaseInput from '@/components/BaseComponents/Input/BaseInput.vue'
import { type PasswordUpdateDTO, UserService } from '@/api'
import handleUnknownError from '@/components/Exceptions/unkownErrorHandler';

const oldPasswordRef = ref('');
const newPasswordRef = ref('');
const confirmPasswordRef = ref('');

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
  if (newPasswordRef.value !== confirmPasswordRef.value) {
      console.error('Passwords do not match')
      return
  }

  const updateUserPayload: PasswordUpdateDTO = {
      oldPassword: oldPasswordRef.value,
      newPassword: newPasswordRef.value,
  };

  try {
      const response = UserService.updatePassword({ requestBody: updateUserPayload })
      console.log(response)
  } catch (err) {
      handleUnknownError(err);
      console.error(err)
  }
}
</script>