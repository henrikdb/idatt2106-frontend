<template>
    <div class="tab-pane active" id="billing">
        <h6>BANK</h6>
        <hr>
        <form @submit.prevent="handleSpendingSubmit" novalidate>
            <div class="form-group">
                <BaseInput data-cy="spending-account-input" :model-value="spendingAccount"
                            @input-change-event="handleSpendingInputEvent" id="firstNameInputChange" input-id="first-name-new"
                    type="Number" label="Brukskonto" placeholder="Skriv inn din brukskonto"
                    invalid-message="Vennligst skriv inn din brukskonto" />
            </div>
            <br>
            <p data-cy="change-email-msg-error" class="text-danger">{{ errorMsg }}</p>
            <p data-cy="change-email-msg-confirm" class="text-success">{{ confirmationMsg }}</p>
            <button data-cy="update-spending-btn" type="submit" class="btn btn-primary classyButton">Oppdater
              brukskonto</button>
        </form>
        <br>
        <form @submit.prevent="handleSavingSubmit">
            <div class="form-group">
                <BaseInput data-cy="savings-account-input" :model-value="savingsAccount"
                           @input-change-event="handleSavingInputEvent" id="firstNameInputChange" input-id="first-name-new" type="Number"
                    label="Sparekonto" placeholder="Skriv inn din sparekonto"
                    invalid-message="Vennligst skriv inn din sparekonto" />
            </div>
            <br>
            <button data-cy="update-savings-btn" type="submit" class="btn btn-primary classyButton">Oppdater
              sparekonto</button>
        </form>
        <hr>
        <div class="form-group mb-0">
            <label class="d-block">Saldooversikt</label>
            <div class="border border-gray-500 bg-gray-200 p-3 text-center font-size-sm">
              <div class="row">
                <div class="col-sm-6">
                  <div class="card-box tilebox-one"><i class="icon-rocket float-right text-muted"></i>
                    <h6 class="text-muted text-uppercase mt-0">Brukskonto</h6>
                    <h2 class="">{{spendingAccountBalance}} Kr</h2></div>
                </div>
                <div class="col-sm-6">
                  <div class="card-box tilebox-one"><i class="icon-rocket float-right text-muted"></i>
                    <h6 class="text-muted text-uppercase mt-0">Sparekonto</h6>
                    <h2 class="">{{savingsAccountBalance}} Kr</h2></div>
                </div>
              </div>
            </div>
        </div>
    </div>
</template>


<script setup lang="ts">
import { ref, onMounted } from 'vue';
import BaseInput from '@/components/BaseComponents/Input/BaseInput.vue';
import type { UserUpdateDTO } from '@/api'
import { UserService } from '@/api';
import  handleUnknownError from '@/components/Exceptions/unkownErrorHandler'


const spendingAccount = ref()
const savingsAccount = ref()
const spendingAccountBalance = ref(0 as any)
const savingsAccountBalance = ref(0 as any)
const errorMsg = ref('')
const confirmationMsg = ref('')

/**
 * Handles the event when spending input changes by updating the spending account value.
 *
 * @param {any} newValue - The new value of the spending input.
 */
const handleSpendingInputEvent = (newValue: any) => {
  spendingAccount.value = newValue
}

/**
 * Handles the event when saving input changes by updating the saving account value.
 *
 * @param {any} newValue - The new value of the saving input.
 */
const handleSavingInputEvent = (newValue: any) => {
  savingsAccount.value = newValue
}

/**
 * Submits the updated saving account information to the UserService.
 * Handles errors by calling the handleUnknownError function.
 */
const handleSavingSubmit = async () => {
    try {
      const updateUserPayload: UserUpdateDTO = {
        savingsAccountBBAN: savingsAccount.value
      };
        UserService.update({ requestBody: updateUserPayload })
      errorMsg.value = ''
      confirmationMsg.value = 'Kontonummer ble oppdatert'
    } catch (err) {
      errorMsg.value = handleUnknownError(err);
      confirmationMsg.value = ''
    }
}

/**
 * Submits the updated spending account information to the UserService.
 * Handles errors by calling the handleUnknownError function.
 */
const handleSpendingSubmit = async () => {
    try {
      const updateUserPayload: UserUpdateDTO = {
        checkingAccountBBAN: spendingAccount.value
      };
      UserService.update({ requestBody: updateUserPayload })
      errorMsg.value = ''
      confirmationMsg.value = 'Kontonummer ble oppdatert'
    } catch (err) {
      errorMsg.value = handleUnknownError(err);
      confirmationMsg.value = ''
    }
}

onMounted(getAccountInfo)

/**
 * Retrieves account information for the user upon component mounting.
 * Handles errors by calling the handleUnknownError function.
 */
async function getAccountInfo() {
  try {
    let response = await UserService.getUser();
    savingsAccount.value = response.savingsAccountBBAN;
    /*if (response.savingsAccount?.balance) {
      savingsAccountBalance.value = response.savingsAccount?.balance
    }*/
    spendingAccount.value = response.checkingAccountBBAN;
    /*if (response.checkingAccount?.balance) {
      spendingAccountBalance.value = response.checkingAccountBBAN?.balance
    }*/
  } catch (err) {
    handleUnknownError(err)
  }
}
</script>

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