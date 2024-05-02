<script setup lang="ts">
import { useRouter } from 'vue-router'
import BaseButton from '@/components/BaseComponents/Buttons/BaseButton.vue'
import { ref } from 'vue'
import BaseInput from '@/components/BaseComponents/Input/BaseInput.vue'
import { useConfigurationStore } from '@/stores/ConfigurationStore'

const router = useRouter();

const formRef = ref();
const spendingAccount = ref<number>();
const savingsAccount = ref<number>();
let errorMsg = ref('');

// Updates progress bar in the parent Configuration component.
const emit = defineEmits(['changeRouterEvent'])
emit('changeRouterEvent', '/bank-account')

const handleSpendingInputEvent = (newValue: any) => {
  spendingAccount.value = newValue
}

const handleSavingInputEvent = (newValue: any) => {
  savingsAccount.value = newValue
}
const handleSubmit = () => {
  formRef.value.classList.add("was-validated")
  const form = formRef.value;
  if (form.checkValidity()) {
    useConfigurationStore().setSpendingAccount(spendingAccount.value)
    useConfigurationStore().setSavingsAccount(savingsAccount.value)
    router.push("/commitment")
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
                 :model-value="spendingAccount"
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