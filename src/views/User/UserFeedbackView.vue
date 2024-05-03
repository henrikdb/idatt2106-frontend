<template>
    <main>
      <div class="wrapper">
      <div id="formFrame">
          <h1>Tilbakemelding</h1>
      <form  ref="formRef" id="loginForm" @submit.prevent="submitForm" novalidate>
        <BaseInput :model-value="emailRef"
                   @input-change-event="handleEmailInputEvent"
                   id="emailInput"
                   input-id="email"
                   type="email"
                   label="E-post"
                   placeholder="Skriv inn din e-post"
                   invalid-message="Ugyldig e-post"
        />

        <br>
        <label for="feedback">Din tilbakemelding:</label>
        <textarea v-model="messageRef" placeholder="Skriv meldingen din her" rows="5" name="comment[text]" id="comment_text" cols="33"
          required></textarea>
        <p data-cy="change-email-msg-error" class="text-danger">{{ errorMsg }}</p>
        <BaseButton button-text="Send" @click="submitForm" style="padding: 10px 30px; font-size: 18px; font-weight: normal;">Send inn</BaseButton>
        <p data-cy="change-email-msg-confirm" class="text-success">{{ confirmationMsg }}</p>
      </form>
    </div>
    </div>
    </main>
  </template>

<script setup lang="ts">
import { ref } from 'vue';
import BaseInput from '@/components/BaseComponents/Input/BaseInput.vue';
import BaseButton from '@/components/BaseComponents/Buttons/BaseButton.vue';
import { type FeedbackRequestDTO, UserService } from '@/api'
import handleUnknownError from '@/components/Exceptions/unkownErrorHandler'

const emailRef = ref("");
const messageRef = ref("");
const errorMsg = ref('')
const confirmationMsg = ref('')

const handleEmailInputEvent = (newValue: any) => {
  emailRef.value = newValue
}

const submitForm = async () => {
  try {
    const feedbackRequest: FeedbackRequestDTO = {
      email: emailRef.value,
      message: messageRef.value
    };
    console.log("feedbackRequest", feedbackRequest);
    UserService.sendFeedback({ requestBody: feedbackRequest });
    messageRef.value = ''
    errorMsg.value = ''
    confirmationMsg.value = 'Tilbakemeldingen ble sendt!'
  } catch (err) {
    errorMsg.value = handleUnknownError(err);
    confirmationMsg.value = ''
  }
};
</script>

<style scoped>
main {
    display: flex;
    flex-direction: column;
    align-items: center;
    font-family: 'Poppins', sans-serif;
}

.wrapper {
  width: 60%;
  height: 100%;
  margin: 30px;
  margin-bottom: 4rem;
  display: flex;
  justify-content: center;
  align-items: center;
}

#formFrame {
  width: 400px;
  padding: 40px;
  border-radius: 50px;
  color: #101010;
}

textarea {
  padding: 10px;
  max-width: 100%;
  line-height: 1.5;
  border-radius: 5px;
  border: 1px solid #ccc;
  box-shadow: 1px 1px 1px #999;
}

textarea {
  width: 500px;
  height: 100px;
  background: none repeat scroll 0 0 rgba(255, 255, 255, 0.151);
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.12) inset;
  color: #555555;
  font-size: 0.9em;
  line-height: 1.4em;
  padding: 5px 8px;
  transition: background-color 0.2s ease 0s;
}

textarea:focus {
  background: none repeat scroll 0 0 #FFFFFF;
  outline-width: 0;
}
</style>