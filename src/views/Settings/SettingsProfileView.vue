<script setup lang="ts">
import { ref, onMounted } from 'vue';
import BaseInput from '@/components/InputFields/BaseInput.vue';
import { useUserInfoStore } from "@/stores/UserStore";
import { UserService } from '@/api';
import type { UserUpdateDTO } from '@/api';

const firstNameRef = ref()
const surnameRef = ref('')
const emailRef = ref('')
const passwordRef = ref('')
const formRef = ref()
let samePasswords = ref(true)

const handleFirstNameInputEvent = (newValue: any) => {
  firstNameRef.value = newValue
}


const handleSurnameInputEvent = (newValue: any) => {
  surnameRef.value = newValue
}

async function setupForm() {
  try {
    let response = await UserService.getUser();
    console.log(response.firstName)

    firstNameRef.value = response.firstName;
    if (response.lastName != null) {
      surnameRef.value = response.lastName;
    }
  } catch (err) {
    console.error(err)
  }
}

const handleSubmit = async () => {
  console.log('Yoooo')
  const updateUserPayload: UserUpdateDTO = {
    firstName: firstNameRef.value,
    lastName: surnameRef.value,
  };

  try {
    UserService.update({ requestBody: updateUserPayload })
    useUserInfoStore().setUserInfo({
      firstname: firstNameRef.value,
      lastname: surnameRef.value,
    })

  } catch (err) {
    console.error(err)
  }
}
onMounted(() => {
  setupForm()
})

</script>


<template>
  <div class="tab-pane active" id="profile">
    <h6>YOUR PROFILE INFORMATION</h6>
    <hr>
    <form @submit.prevent="handleSubmit" novalidate>
      <div class="user-avatar">
        <img id="icon" src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="Maxwell Admin">
      </div>
      <div class="btn">
        <div class="mt-2">
          <span class="btn btn-primary"><img src="@/assets/icons/download.svg"></span>
        </div>
      </div>
      <div class="form-group">
        <BaseInput :model-value="firstNameRef" @input-change-event="handleFirstNameInputEvent" id="firstNameInputChange"
          input-id="first-name-new" type="text" label="First name" placeholder="Enter your first name"
          invalid-message="Please enter your first name" />
      </div>
      <br>
      <div class="form-group">
        <BaseInput :model-value="surnameRef" @input-change-event="handleSurnameInputEvent" id="surnameInput-change"
          input-id="surname-new" type="text" label="Surname" placeholder="Enter your surname"
          invalid-message="Please enter your surname" />
      </div>
      <br>
      <button type="submit" class="btn btn-primary">Update Profile</button>
    </form>
  </div>
</template>

<style scoped>
#icon {
  width: 90px;
  height: 90px;
  -webkit-border-radius: 100px;
  -moz-border-radius: 100px;
  border-radius: 100px;
}
</style>