<template>
    <main>
      <div class="wrapper">
      <div id="formFrame">
          <h1>Feedback</h1>
      <form @submit.prevent="submitForm">
        <BaseInput v-model="email" label="Email" type="email" placeholder="Enter your email" inputId="email" required />
        <br>
        <label for="feedback">Your feedback:</label>
        <textarea v-model="message" placeholder="Write here" rows="5" name="comment[text]" id="comment_text" cols="33"
          required></textarea>
        <Button1 button-text="Send" @click="submitForm">Submit</Button1>
        <p v-if="submissionStatus">{{ submissionStatus }}</p>
      </form>
    </div>
    </div>
    </main>
  </template>

<script setup lang="ts">
import { ref } from 'vue';
import BaseInput from '@/components/InputFields/BaseInput.vue';
import Button1 from '@/components/Buttons/Button1.vue';

const email = ref("");
const message = ref("");
const submissionStatus = ref("");

const submitForm = async () => {
  
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