<template>
    <div class="tab-pane active" id="billing">
        <h6>BANKKONTO INNSTILLINGER</h6>
        <hr>
        <form @submit.prevent="handleSpendingSubmit">
            <div class="form-group">
                <BaseInput :model-value="spendingAccount" @input-change-event="handleSpendingInputEvent" id="firstNameInputChange" input-id="first-name-new"
                    type="Number" label="Brukskonto" placeholder="Skriv inn din brukskonto"
                    invalid-message="Vennligst skriv inn din brukskonto" />
            </div>
            <br>
            <button type="submit" class="btn btn-primary">Oppdater brukskonto</button>
        </form>
        <br>
        <form @submit.prevent="handleSavingSubmit">
            <div class="form-group">
                <BaseInput :model-value="savingsAccount" @input-change-event="handleSavingInputEvent" id="firstNameInputChange" input-id="first-name-new" type="Number"
                    label="Sparekonto" placeholder="Skriv inn din sparekonto"
                    invalid-message="Vennligst skriv inn din sparekonto" />
            </div>
            <br>
            <button type="submit" class="btn btn-primary">Oppdater sparekonto</button>
        </form>
        <hr>
        <div class="form-group mb-0">
            <label class="d-block">Betalingshistorikk</label>
            <div class="border border-gray-500 bg-gray-200 p-3 text-center font-size-sm">Du har ikke foretatt noen betaling.</div>
        </div>
    </div>
</template>


<script setup lang="ts">
import { ref } from 'vue';
import BaseInput from '@/components/InputFields/BaseInput.vue';
import type { BankAccountDTO } from '@/api';
import { UserService } from '@/api';


const spendingAccount = ref()
const savingsAccount = ref()


const handleSpendingInputEvent = (newValue: any) => {
    console.log(newValue);
  spendingAccount.value = newValue
}


const handleSavingInputEvent = (newValue: any) => {
    console.log(newValue);
  savingsAccount.value = newValue
}


const handleSavingSubmit = async () => {

    const updateSaving: BankAccountDTO = {
        bban: savingsAccount.value,
        bankAccountType: "SAVING_ACCOUNT",
    };
    try {
        UserService.selectBankAccount({ requestBody: updateSaving })
    } catch (err) {
        console.error(err)
    }
}

const handleSpendingSubmit = async () => {
    console.log(savingsAccount.value)

    const updateSaving: BankAccountDTO = {
        bban: spendingAccount.value,
        bankAccountType: "CHECKING_ACCOUNT",
    };
    try {
        UserService.selectBankAccount({ requestBody: updateSaving })
    } catch (err) {
        console.error(err)
    }
}
</script>