<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import BaseInput from '@/components/BaseComponents/Input/BaseInput.vue';
import { useUserInfoStore } from "@/stores/UserStore";
import { type UserDTO, UserService } from '@/api'
import type { UserUpdateDTO } from '@/api';
import handleUnknownError from '@/components/Exceptions/unkownErrorHandler';
import router from '@/router'
import SuitableChallenges from '@/components/Configuration/ConfigurationSteps/SuitableChallenges.vue'

const emailRef = ref('')
const errorMsg = ref('')
const errorMsg3 = ref('')
const confirmationMsg = ref('')
const confirmationMsg2 = ref('')
const errorMsg2 = ref('')
const commitmentRef = ref('MUCH')
const challengesRef = ref<any>([])

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
 * Handles the email input event by updating the email reference value.
 *
 * @param {any} newValue - The new value of the email input.
 */
const handleEmailInputEvent = (newValue: any) => {
  emailRef.value = newValue
}

/**
 * Sets up the form by fetching user data and populating the email field if available.
 * Clears confirmation and error messages.
 * Handles errors by displaying a generic error message and updating the error message field.
 */
async function setupForm() {
  try {
    let response: any = await UserService.getUser();
    if (response.configuration) {
      commitmentRef.value = response.configuration.commitment;
      challengesRef.value = response.configuration.challengeTypes;
    }
    if (response.email != null) {
      emailRef.value = response.email
    }
    confirmationMsg.value = '';
    errorMsg.value = '';
  } catch (err) {
    errorMsg.value = handleUnknownError(err);
    confirmationMsg.value = ''
  }
}

const handleSubmitConfig = async () => {
  // Construct payload for updating user email
  const updateUserPayload: UserUpdateDTO = {
    configuration: {
      commitment: commitmentRef.value,
      challengeTypes: challengesRef.value
    }
  };
  try {
    // Send request to update user email
    UserService.update({ requestBody: updateUserPayload })
    confirmationMsg2.value = 'Oppdatert!'
    errorMsg3.value = '';
  } catch (err) {
    errorMsg3.value = handleUnknownError(err);
    confirmationMsg2.value = ''
  }
}

/**
 * Handles form submission by updating the user's email.
 * Updates the confirmation message upon successful email update.
 * Handles errors and updates the error message accordingly.
 */
const handleSubmit = async () => {
  // Construct payload for updating user email
  const updateUserPayload: UserUpdateDTO = {
    email: emailRef.value,
  };
  try {
    // Send request to update user email
    UserService.update({ requestBody: updateUserPayload })
    // Update user info in the store
    useUserInfoStore().setUserInfo({
        email: emailRef.value,
    })
    confirmationMsg.value = 'Email updated successfully!'
    errorMsg.value = '';
  } catch (err) {
    handleUnknownError(err);
    errorMsg.value = "Error updating email, try again!";
    confirmationMsg.value = ''
  }
}

const handleSubmit2 = async () => {
  try {
    console.log("test")
    UserService.deleteUser();
    console.log("test")
    useUserInfoStore().clearUserInfo();
    await router.push("/login");
  } catch (err) {
    errorMsg2.value = handleUnknownError(err);
  }
}
onMounted(() => {
  setupForm()
})

const onChangedChallengeEvent = (value: any) => {
  // if challenge is checked then add it to the chosenChallenges variable
  if (challengesRef.value.includes(value)) {
    challengesRef.value.push(value)
  }
  // if challenge is unchecked then remove it from the chosenChallenges variable
  else {
    challengesRef.value = challengesRef.value.filter((item: string) => item !== value);
  }
  console.log(challengesRef.value)
}

const a = computed(() => {
  challengesRef.value.includes()
})
</script>

<template>
  <div class="tab-pane active" id="account">
      <h6>KONTO</h6>
      <hr>
      <form @submit.prevent="handleSubmit">
          <div class="form-group">
              <BaseInput data-cy="email-input" :model-value="emailRef"
                         @input-change-event="handleEmailInputEvent" id="emailInput-change"
                  input-id="email-new" type="email" label="E-post" placeholder="Skriv inn din e-post"
                  invalid-message="Ugyldig e-post"/>
          </div>
          <p data-cy="change-email-msg-error" class="text-danger">{{ errorMsg }}</p>
          <p data-cy="change-email-msg-confirm" class="text-success">{{ confirmationMsg }}</p>
          <br>
          <button data-cy="change-email-btn" type="submit" class="btn btn-primary classyButton">Oppdater</button>
      </form>
      <hr>
      <form @submit.prevent="handleSubmitConfig">
        <p>Grad av villighet til å gjøre endringer</p>
        <select v-model="commitmentRef" class="form-select" aria-label="Default select example">
          <option value="LITTLE">Lav</option>
          <option value="SOME">Middels</option>
          <option value="MUCH">Høy</option>
        </select>
        <p>Hvilke utfordringer passer deg?</p>
        <button v-for="challenge in challenges"
                :class="['btn', challengesRef.includes(challenge) ? 'btn-primary' : 'btn-secondary']"
                @click="onChangedChallengeEvent" type="button">
          {{ challengeMapper[challenge] }}
        </button>
        <p data-cy="change-email-msg-error" class="text-danger">{{ errorMsg3 }}</p>
        <p data-cy="change-email-msg-confirm" class="text-success">{{ confirmationMsg2 }}</p>
        <br>
        <button data-cy="change-email-btn" type="submit" class="btn btn-primary classyButton">Oppdater</button>
      </form>
      <form @submit.prevent="handleSubmit2" style="margin-top: 20px;">
        <div class="form-group">
          <label class="d-block text-danger">Slett Bruker</label>
          <p class="text-muted font-size-sm">Obs: Når du først har slettet kontoen din, er det ingen vei tilbake.</p>
        </div>
        <p data-cy="delete-user-msg-error" class="text-danger">{{ errorMsg2 }}</p>
        <button class="btn btn-danger" type="submit">Slett Bruker</button>
      </form>
  </div>
</template>

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
