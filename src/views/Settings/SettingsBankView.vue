<template>
    <div class="tab-pane active" id="billing">
        <h6>BANK SETTINGS</h6>
        <hr>
        <form @submit.prevent="handleSpendingSubmit">
            <div class="form-group">
                <BaseInput :model-value="spendingAccount" @input-change-event="handleSpendingInputEvent" id="firstNameInputChange" input-id="first-name-new"
                    type="Number" label="Spending Account" placeholder="Enter your spending account"
                    invalid-message="Please enter your spending account" />
            </div>
            <br>
            <button type="submit" class="btn btn-primary">Update Spending Account</button>
        </form>
        <br>
        <form @submit.prevent="handleSavingSubmit">
            <div class="form-group">
                <BaseInput :model-value="savingsAccount" @input-change-event="handleSavingInputEvent" id="firstNameInputChange" input-id="first-name-new" type="Number"
                    label="Savings Account" placeholder="Enter your Savings account"
                    invalid-message="Please enter your Savings account" />
            </div>
            <br>
            <button type="submit" class="btn btn-primary">Update Savings Account</button>
        </form>
        <hr>
        <div class="form-group mb-0">
            <label class="d-block">Payment History</label>
            <div class="border border-gray-500 bg-gray-200 p-3 text-center font-size-sm">You
                have not made any payment.</div>
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