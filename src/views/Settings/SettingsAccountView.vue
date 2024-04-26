<script setup lang="ts">
import { ref, onMounted } from 'vue';
import BaseInput from '@/components/InputFields/BaseInput.vue';
import { useUserInfoStore } from "@/stores/UserStore";
import { UserService } from '@/api';
import type { UserUpdateDTO } from '@/api';

const emailRef = ref('')
const errorMsg = ref('')
const confirmationMsg = ref('')

const handleEmailInputEvent = (newValue: any) => {
  emailRef.value = newValue
}

async function setupForm() {
  try {
    let response = await UserService.getUser();
    if (response.email != null) {
      emailRef.value = response.email
    }
    confirmationMsg.value = '';
    errorMsg.value = '';
  } catch (err) {
    errorMsg.value = 'Error fetching email, try again!'
    confirmationMsg.value = ''
  }
}

const handleSubmit = async () => {
  console.log('Yoooo')
  const updateUserPayload: UserUpdateDTO = {
    email: emailRef.value,
  };
  try {
    UserService.update({ requestBody: updateUserPayload })
    useUserInfoStore().setUserInfo({
        email: emailRef.value,
    })
    confirmationMsg.value = 'Email updated successfully!'
    errorMsg.value = '';
  } catch (err) {
    errorMsg.value = "Error updating email, try again!";
    confirmationMsg.value = ''
  }
}
onMounted(() => {
  setupForm()
})
</script>

<template>
    <div class="tab-pane active" id="account">
        <h6>ACCOUNT SETTINGS</h6>
        <hr>
        <form  @submit.prevent="handleSubmit">
            <div class="form-group">
                <BaseInput :model-value="emailRef" @input-change-event="handleEmailInputEvent" id="emailInput-change"
                    input-id="email-new" type="email" label="Email" placeholder="Enter your email"
                    invalid-message="Invalid email"/>
            </div>
            <p class="text-danger">{{ errorMsg }}</p>
            <p class="text-success">{{ confirmationMsg }}</p>
            <br>
            <button type="submit" class="btn btn-primary">Update Profile</button>
            <hr>
            <div class="form-group">
                <label class="d-block text-danger">Delete Account</label>
                <p class="text-muted font-size-sm">Once you delete your account, there is no going
                    back. Please be certain.</p>
            </div>
            <button class="btn btn-danger" type="button">Delete Account</button>
        </form>
    </div>
</template>