<script setup lang="ts">
import { ref, onMounted } from 'vue'
import BaseInput from '@/components/BaseComponents/Input/BaseInput.vue';
import { useUserInfoStore } from "@/stores/UserStore";
import { UserService } from '@/api'
import type { UserUpdateDTO } from '@/api';
import handleUnknownError from '@/components/Exceptions/unkownErrorHandler';
import router from '@/router'

const emailRef = ref('');
const errorMsg = ref('');
const errorMsg3 = ref('');
const confirmationMsg = ref('');
const confirmationMsg2 = ref('');
const errorMsg2 = ref('');
const commitmentRef = ref('MUCH');
const challengesRef = ref<any>([]);

// Represents a list of available challenges.
const challenges: string[] = [
  'NO_COFFEE', 'NO_CAR', 'SHORTER_SHOWER', 'SPEND_LESS_ON_FOOD',
  'BUY_USED_CLOTHES', 'LESS_SHOPPING', 'DROP_SUBSCRIPTION', 'SELL_SOMETHING',
  'BUY_USED', 'EAT_PACKED_LUNCH', 'STOP_SHOPPING', 'ZERO_SPENDING',
  'RENT_YOUR_STUFF', 'MEATLESS', 'SCREEN_TIME_LIMIT', 'UNPLUGGED_ENTERTAINMENT'
];

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
};

const handleEmailInputEvent = (newValue: any) => {
  emailRef.value = newValue;
};

async function setupForm() {
  try {
    const response: any = await UserService.getUser();
    console.log(response);
    if (response.configuration) {
      commitmentRef.value = response.configuration.commitment;
      challengesRef.value = response.configuration.challengeTypes;
    }
    if (response.email != null) {
      emailRef.value = response.email;
    }
    confirmationMsg.value = '';
    errorMsg.value = '';
  } catch (err) {
    errorMsg.value = handleUnknownError(err);
    confirmationMsg.value = '';
  }
}

const handleSubmitConfig = async () => {
  const updateUserPayload: UserUpdateDTO = {
    configuration: {
      commitment: commitmentRef.value,
      challengeTypes: challengesRef.value
    }
  };
  try {
    await UserService.update({ requestBody: updateUserPayload });
    confirmationMsg2.value = 'Oppdatert!';
    errorMsg3.value = '';
  } catch (err) {
    errorMsg3.value = handleUnknownError(err);
    confirmationMsg2.value = '';
  }
};

const handleSubmit = async () => {
  const updateUserPayload: UserUpdateDTO = {
    email: emailRef.value,
  };
  try {
    await UserService.update({ requestBody: updateUserPayload });
    useUserInfoStore().setUserInfo({
      email: emailRef.value,
    });
    confirmationMsg.value = 'Email updated successfully!';
    errorMsg.value = '';
  } catch (err) {
    handleUnknownError(err);
    errorMsg.value = "Error updating email, try again!";
    confirmationMsg.value = '';
  }
};

const handleSubmit2 = async () => {
  try {
    await UserService.deleteUser();
    useUserInfoStore().clearUserInfo();
    await router.push("/login");
  } catch (err) {
    errorMsg2.value = handleUnknownError(err);
  }
};

onMounted(() => {
  setupForm();
});

const onChangedChallengeEvent = (value: string) => {
  if (challengesRef.value.includes(value)) {
    challengesRef.value = challengesRef.value.filter((item: string) => item !== value);
  } else {
    challengesRef.value.push(value);
  }
};
</script>


<template>
  <div class="tab-pane active" id="account">
    <h6>KONTO</h6>
    <hr>
    <form @submit.prevent="handleSubmit">
      <div class="form-group">
        <BaseInput data-cy="email-input" :model-value="emailRef" @input-change-event="handleEmailInputEvent"
          id="emailInput-change" input-id="email-new" type="email" label="E-post" placeholder="Skriv inn din e-post"
          invalid-message="Ugyldig e-post" />
      </div>
      <p data-cy="change-email-msg-error" class="text-danger">{{ errorMsg }}</p>
      <p data-cy="change-email-msg-confirm" class="text-success">{{ confirmationMsg }}</p>
      <br>
      <button data-cy="change-email-btn" type="submit" class="btn btn-primary classyButton">Oppdater</button>
    </form>
    <hr>
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
