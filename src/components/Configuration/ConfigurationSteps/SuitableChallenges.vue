<script setup lang="ts">
import { useRouter } from 'vue-router'
import ChallangeCheckBox from '@/components/Configuration/ChallangeCheckBox.vue'
//@ts-ignore
import Button1 from '@/components/Buttons/Button1.vue'
import { ref } from 'vue'
import { useConfigurationStore } from '@/stores/ConfigurationStore'
import { useUserInfoStore } from '@/stores/UserStore'
import { AuthenticationService, OpenAPI, } from '@/api'
import handleUnknownError from '@/components/Exceptions/unkownErrorHandler'

const router = useRouter();

// Updates progress bar in the parent Configuration component.
const emit = defineEmits(['changeRouterEvent'])
emit('changeRouterEvent', '/suitable-challenges')

// Reactive variables for chosen challenges and error message.
let chosenChallenges = ref([])
let errorMsg = ref('')

// Represents a list of available challenges.
const challenges = ['Make packed lunch', 'Stop shopping', 'Drop coffee',
  'Quit subscription', 'Drop car', 'Short showers', 'Exercise outside', 'Make budget']

/**
 * Handles the event when a challenge is selected or deselected.
 * @param {Array} value - An array containing the challenge value and its checked status.
 *                        The first element is the challenge value, and the second element
 *                        indicates whether the challenge is checked (true) or unchecked (false).
 */
const onChangedChallengeEvent = (value : never) => {
  // if challenge is checked then add it to the chosenChallenges variable
  if (value[1]) {
    chosenChallenges.value.push(value[0])
  }
  // if challenge is unchecked then remove it from the chosenChallenges variable
  else {
    chosenChallenges.value = chosenChallenges.value.filter(item => item !== value[0]);
  }
  console.log(chosenChallenges.value)
}

/**
 * Retrieves user configuration and signup information, sends a signup request to the backend.
 *
 * @throws {Error} Throws an error if signup fails.
 */
const onClick = async () => {
  try {
    // Saves the chosen challenges to the configuration store
    useConfigurationStore().setChallenges(chosenChallenges.value)

    /*
    TODO: 'changeWilling' are updated to 'commitment' in backend, must update it in frontend
    const signUpPayLoad: SignUpRequest = {
      changeWilling: useConfigurationStore().getCommitment,
      experience: useConfigurationStore().getExperience,
      challenges: useConfigurationStore().getChallenges,
      firstName: useUserInfoStore().getFirstName,
      lastName: useUserInfoStore().getLastname,
      email: useUserInfoStore().getEmail,
      password: useUserInfoStore().getPassword,
    };
     */

    const signUpPayLoad = {
      "commitment": useConfigurationStore().commitment,
      "experience": useConfigurationStore().experience,
      "challenges": useConfigurationStore().challenges,
      "firstName": useUserInfoStore().firstname,
      "lastName": useUserInfoStore().lastname,
      "email": useUserInfoStore().email,
      "password": useUserInfoStore().password,
    };

    let response = await AuthenticationService.signup({ requestBody: signUpPayLoad });
    if (response.token == null) {
      errorMsg.value = 'A valid token could not be created';
      return;
    }
    OpenAPI.TOKEN = response.token;
    useUserInfoStore().setUserInfo({
      accessToken: response.token,
      role: response.role,
    });
    useUserInfoStore().resetPassword()
    await router.push({ name: 'home' });
  }
  catch (error) {
    errorMsg.value = handleUnknownError(error);
  }
}

</script>

<template>
  <div class="container">
    <div>
      <h3 class="d-flex align-items-center justify-content-center">
        Which challenges are suitable for you?
      </h3>
    </div>

    <div class="challenge-container">
      <ChallangeCheckBox v-for="(item, index) in challenges" :id="String(index)" :text="item"
                         @challengeChangedEvent="onChangedChallengeEvent"
      />
    </div>

    <p class="text-danger">{{ errorMsg }}</p>

    <div class="confirm-button-container">
      <button1 id="confirmButton" @click="onClick" button-text="Finish configuration"></button1>
    </div>
  </div>
</template>

<style scoped>
.challenge-container {
  justify-self: center;
  max-width: 500px;
}

#confirmButton {
  margin-bottom: 2rem;
  width: 300px;
}

.confirm-button-container {
  display: flex;
  justify-content: center;
}
</style>