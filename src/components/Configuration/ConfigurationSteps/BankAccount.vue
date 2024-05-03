<script setup lang="ts">
import { useRouter } from 'vue-router'
import BaseButton from '@/components/BaseComponents/Buttons/BaseButton.vue'
import { ref } from 'vue'
import BaseInput from '@/components/BaseComponents/Input/BaseInput.vue'
import { useConfigurationStore } from '@/stores/ConfigurationStore'
import { AccountControllerService } from '@/api'
import handleUnknownError from '@/components/Exceptions/unkownErrorHandler'

const router = useRouter();

// Declaring reactive variables
const formRef = ref();
const checkingAccount = ref<string>('');
const savingsAccount = ref<string>('');
let errorMsg = ref<string>('');

// Updates progress bar in the parent Configuration component.
const emit = defineEmits(['changeRouterEvent'])
emit('changeRouterEvent', '/bank-account')

/**
 * Handles the input event for spending account.
 *
 * @param {any} newValue - The new value of the spending account.
 */
const handleSpendingInputEvent = (newValue: any) => {
  checkingAccount.value = newValue
}

/**
 * Handles the input event for saving account.
 *
 * @param {any} newValue - The new value of the saving account.
 */
const handleSavingInputEvent = (newValue: any) => {
  savingsAccount.value = newValue
}

/**
 * Adds the "was-validated" class to the form element and then checks if the form is valid.
 * If the form is valid, it updates the spending and savings account values in the configuration store
 * and navigates the user to the "/commitment" route.
 */
const handleSubmit = async () => {
  formRef.value.classList.add("was-validated")
  const form = formRef.value;
  if (form.checkValidity()) {
    try {
      await AccountControllerService.getAccountsByBban({bban: Number(checkingAccount.value)})
      await AccountControllerService.getAccountsByBban({bban: Number(savingsAccount.value)})
      useConfigurationStore().setChekingAccountBBAN(Number(checkingAccount.value))
      useConfigurationStore().setSavingsAccountBBAN(Number(savingsAccount.value))
      await router.push("/commitment")
    } catch (error) {
      errorMsg.value = handleUnknownError(error)
    }
  }
}
</script>

<template>
  <div class="container">
    <h3 id="bankAccountText" class="d-flex align-items-center justify-content-center">
      Velg forburkskonto og sparekonto
    </h3>
    <form ref="formRef">
      <BaseInput data-cy="spending-account-input"
                 :model-value="checkingAccount"
                 @input-change-event="handleSpendingInputEvent"
                 id="spending-account-base-input"
                 input-id="spending-account-input"
                 type="number"
                 min="10000000000"
                 max="99999999999"
                 label="Brukskonto"
                 placeholder="Skriv inn din brukskonto"
                 invalid-message="Vennligst skriv inn din brukskonto (11 siffer)"/>

      <BaseInput data-cy="savings-account-input"
                 :model-value="savingsAccount"
                 @input-change-event="handleSavingInputEvent"
                 id="saving-account-base-input"
                 input-id="savings-account-input"
                 type="number"
                 min="10000000000"
                 max="99999999999"
                 label="Sparekonto"
                 placeholder="Skriv inn din sparekonto"
                 invalid-message="Vennligst skriv inn din sparekonto (11 siffer)"/>
    </form>
    <div style="color: red">{{ errorMsg }}</div>
    <div class="confirm-button-container">
      <BaseButton id="confirmButton" @click="handleSubmit" button-text="Fortsett"></BaseButton>
    </div>
  </div>
</template>

<style scoped>
#confirmButton {
  margin: 2rem 0 ;
  height: 38px;
  width: 300px;
}

#spending-account-base-input, #spending-account-base-input {
  margin: 1rem 0;
}

.confirm-button-container {
  display: flex;
  justify-content: center;
}
</style>