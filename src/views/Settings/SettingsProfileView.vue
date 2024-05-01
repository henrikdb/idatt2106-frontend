<script setup lang="ts">
import { ref, onMounted } from 'vue';
import BaseInput from '@/components/InputFields/BaseInput.vue';
import { useUserInfoStore } from "@/stores/UserStore";
import { UserService, ImageService } from '@/api';
import type { UserUpdateDTO } from '@/api';

const firstNameRef = ref()
const surnameRef = ref('')
const emailRef = ref('')
const passwordRef = ref('')
const formRef = ref()
let samePasswords = ref(true)

const iconSrc = ref('../src/assets/userprofile.png');
const fileInputRef = ref();

const handleFirstNameInputEvent = (newValue: any) => {
  firstNameRef.value = newValue
}


const handleSurnameInputEvent = (newValue: any) => {
  surnameRef.value = newValue
}

const triggerFileUpload = () => {
  fileInputRef.value.click();
};

const handleFileChange = (event: any) => {
  const file = event.target.files[0];
  if (file) {
    uploadImage(file);
  }
};

const uploadImage = async (file: any) => {
  const formData = { file: new Blob([file]) }

  try {
    const response = await ImageService.uploadImage({ formData });
    iconSrc.value = "http://localhost:8080/api/images/" + response;

    const updateUserPayload: UserUpdateDTO = {
      profileImage: response,
    };
    UserService.update({ requestBody: updateUserPayload })
    useUserInfoStore().setUserInfo({
      profileImage: response,
    })
  } catch (error) {
    console.error('Failed to upload image:', error);
  }
};

async function setupForm() {
  try {
    const response = await UserService.getUser();
    console.log(response.firstName)

    firstNameRef.value = response.firstName;
    if (response.lastName != null) {
      surnameRef.value = response.lastName;
    }
    console.log(response.profileImage)
    if(response.profileImage != null){
      iconSrc.value = "http://localhost:8080/api/images/" + response.profileImage;
    } else {
      iconSrc.value = "../src/assets/userprofile.png";
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
    <h6>DIN PROFILINFORMASJON</h6>
    <hr>
    <form @submit.prevent="handleSubmit" novalidate>
      <div class="user-avatar">
        <input type="file" ref="fileInputRef" @change="handleFileChange" accept=".jpg, .jpeg, .png"
          style="display: none;" />
        <img :src="iconSrc" alt="Brukeravatar" style="width: 300px">
        <div class="mt-2">
          <button type="button" class="btn btn-primary" @click="triggerFileUpload"><img
              src="@/assets/icons/download.svg"> Last opp bilde</button>
        </div>
      </div>
      <div class="form-group">
        <BaseInput data-cy="first-name" :model-value="firstNameRef"
                   @input-change-event="handleFirstNameInputEvent" id="firstNameInputChange"
                   input-id="first-name-new" type="text" label="Fornavn" placeholder="Skriv inn ditt fornavn"
                   invalid-message="Vennligst skriv inn ditt fornavn" />
      </div>
      <br>
      <div class="form-group">
        <BaseInput data-cy="last-name" :model-value="surnameRef"
                   @input-change-event="handleSurnameInputEvent"
                    id="surnameInput-change"
                   input-id="surname-new" type="text" label="Etternavn"
                   placeholder="Skriv inn ditt etternavn"
                   invalid-message="Vennligst skriv inn ditt etternavn" />
      </div>
      <br>
      <button data-cy="profile-submit-btn" type="submit" class="btn btn-primary">Oppdater
        profil</button>
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