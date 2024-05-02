<script setup lang="ts">
import { ref, onMounted } from 'vue';
import BaseInput from '@/components/BaseComponents/Input/BaseInput.vue';
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
      <h6>KONTO INNSTILLINGER</h6>
      <hr>
      <form  @submit.prevent="handleSubmit">
          <div class="form-group">
              <BaseInput data-cy="email-input" :model-value="emailRef"
                         @input-change-event="handleEmailInputEvent" id="emailInput-change"
                  input-id="email-new" type="email" label="E-post" placeholder="Skriv inn din e-post"
                  invalid-message="Ugyldig e-post"/>
          </div>
          <p data-cy="change-email-msg-error" class="text-danger">{{ errorMsg }}</p>
          <p data-cy="change-email-msg-confirm" class="text-success">{{ confirmationMsg }}</p>
          <br>
          <button data-cy="change-email-btn" type="submit" class="btn btn-primary">Endre
            Informasjon</button>
          <hr>
          <div class="form-group">
              <label class="d-block text-danger">Slett Bruker</label>
              <p class="text-muted font-size-sm">Når du først har slettet kontoen din, er det ingen vei tilbake. Vennligst vær sikker.</p>
          </div>
          <button class="btn btn-danger" type="button">Slett Bruker</button>
      </form>
  </div>
</template>
