<script setup lang="ts">
import { useRouter } from 'vue-router'
import ChallangeCheckBox from '@/components/Configuration/ChallangeCheckBox.vue'
import BaseButton from '@/components/BaseComponents/Buttons/BaseButton.vue'
import { ref } from 'vue'
import { useConfigurationStore } from '@/stores/ConfigurationStore'
import { useUserInfoStore } from '@/stores/UserStore'
import { AuthenticationService, type BankAccountDTO, OpenAPI, type SignUpRequest, UserService } from '@/api'
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
 * Converts the given enum value to a formatted text representation.
 *
 * @param {string} enumValue the enum value to be converted
 * @return {string} The formatted text representation of the enum value
 */
const convertEnumToText = (enumValue: String): string => {
  return enumValue.charAt(0).toUpperCase() + enumValue.slice(1).replace(/_/g, ' ').toLowerCase();
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
    }
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
 * Updates the bank accounts for the user.
 *
 * @throws {Error} Throws an error if selectBankAccount fails.
 */
const updateBankAccounts = async () => {

  // Request payload for spending account
  const spendingRequest: BankAccountDTO = {
    bban: useConfigurationStore().getSpendingAccount,
    bankAccountType: "CHECKING_ACCOUNT"
  }
  // Request payload for saving account
  const savingRequest: BankAccountDTO = {
    bban: useConfigurationStore().getSavingsAccount,
    bankAccountType: "SAVING_ACCOUNT"
  }
  await UserService.selectBankAccount({requestBody: spendingRequest})
  await UserService.selectBankAccount({requestBody: savingRequest})
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
    await updateBankAccounts();

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
                         :text="convertEnumToText(item)"
                         :enum-value="item"
                         @challengeChangedEvent="onChangedChallengeEvent"/>
    </div>

    <p class="text-danger">{{ errorMsg }}</p>

    <div class="confirm-button-container">
      <BaseButton id="confirmButton" @click="handleSubmit" button-text="Continue"/>
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