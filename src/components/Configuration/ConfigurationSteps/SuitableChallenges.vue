<script setup lang="ts">
import { useRouter } from 'vue-router'
import ChallangeCheckBox from '@/components/Configuration/ChallangeCheckBox.vue'
import BaseButton from '@/components/BaseComponents/Buttons/BaseButton.vue'
import { ref } from 'vue'
import { useConfigurationStore } from '@/stores/ConfigurationStore'
import { useUserInfoStore } from '@/stores/UserStore'
import { AuthenticationService, OpenAPI, type SignUpRequest, UserService } from '@/api'
import handleUnknownError from '@/components/Exceptions/unkownErrorHandler'

const router = useRouter();

// Updates progress bar in the parent Configuration component.
const emit = defineEmits(['changeRouterEvent'])
emit('changeRouterEvent', '/suitable-challenges')

// Reactive variables for chosen challenges and error message.
let chosenChallenges = ref<string[]>([])
let errorMsg = ref('')

// Represents a list of available challenges.
const challenges: string[] = ['NO_COFFEE' , 'NO_CAR' , 'SHORTER_SHOWER' , 'SPEND_LESS_ON_FOOD' , 'BUY_USED_CLOTHES' , 'LESS_SHOPPING' , 'DROP_SUBSCRIPTION' , 'SELL_SOMETHING' , 'BUY_USED' , 'EAT_PACKED_LUNCH' , 'STOP_SHOPPING' , 'ZERO_SPENDING' , 'RENT_YOUR_STUFF' , 'MEATLESS' , 'SCREEN_TIME_LIMIT' , 'UNPLUGGED_ENTERTAINMENT']

/**
 * Mapping between challenge enum and norwegian translation.
 */
const challengeMapper: any = {
  "NO_COFFEE": "Droppe kaffe",
  "NO_CAR": "Droppe bil",
  "SHORTER_SHOWER": "Ta kortere dusjer",
  "SPEND_LESS_ON_FOOD": "Bruk mindre penger på mat",
  "BUY_USED_CLOTHES": "Kjøp brukte klær",
  "LESS_SHOPPING": "Handle mindre",
  "DROP_SUBSCRIPTION": "Si opp abonnement",
  "SELL_SOMETHING": "Selg noe",
  "BUY_USED": "Kjøp brukt",
  "EAT_PACKED_LUNCH": "Lag niste",
  "STOP_SHOPPING": "Shoppestopp",
  "ZERO_SPENDING": "Null-forbruk",
  "RENT_YOUR_STUFF": "Lei ut ting",
  "MEATLESS": "Kjøttfritt",
  "SCREEN_TIME_LIMIT": "Skjerm tidsgrense",
  "UNPLUGGED_ENTERTAINMENT": "Strømløs underholdning"
}

/**
 * Handles the event when a challenge is selected or deselected.
 * @param {Array} value - An array containing the challenge value and its checked status.
 *                        The first element is the challenge value, and the second element
 *                        indicates whether the challenge is checked (true) or unchecked (false).
 */
const onChangedChallengeEvent = (value: never) => {
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
const signUpUser = async () => {
  // Saves the chosen challenges to the configuration store
  useConfigurationStore().setChallenges(chosenChallenges.value)

  // Declares the request payload
  const signUpPayLoad: SignUpRequest  = {
    firstName: useUserInfoStore().getFirstName,
    lastName: useUserInfoStore().getLastname,
    email: useUserInfoStore().getEmail,
    password: useUserInfoStore().getPassword,
    configuration: {
      commitment: useConfigurationStore().getCommitment,
      experience: useConfigurationStore().getExperience,
      challengeTypes: useConfigurationStore().getChallenges
    },
    checkingAccountBBAN: useConfigurationStore().getCheckingAccountBBAN,
    savingsAccountBBAN: useConfigurationStore().getSavingsAccountBBAN,
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
}

/**
 * Handles form submission by signing up the user,
 * updating bank accounts, and navigating to the next configuration step.
 * If an error occur, an error message will be displayed.
 */
const handleSubmit = async () => {
  // Check if there are no chosen challenges
  if (chosenChallenges.value.length === 0) {
    // if so sets chosen challenges to all, so a goal can be created.
    chosenChallenges.value = challenges
  }
  useConfigurationStore().setChallenges(chosenChallenges.value)
  try {
    await signUpUser();

    useUserInfoStore().resetPassword()
    await router.push("/first-saving-goal")

  } catch (error) {
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

    <div class="challenge-container row justify-content-center">
      <ChallangeCheckBox v-for="(item, index) in challenges"
                         :id="String(index)"
                         :text="challengeMapper[item]"
                         :enum-value="item"
                         @challengeChangedEvent="onChangedChallengeEvent"/>
    </div>

    <p class="text-danger">{{ errorMsg }}</p>

    <div class="confirm-button-container">
      <BaseButton id="confirmButton" @click="handleSubmit" button-text="Fortsett"/>
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
  height: 38px;
}

.confirm-button-container {
  display: flex;
  justify-content: center;
}

</style>