<script setup lang="ts">
import { ref, onMounted } from 'vue';
import BaseInput from '@/components/BaseComponents/Input/BaseInput.vue';
import { useUserInfoStore } from "@/stores/UserStore";
import { UserService, ImageService } from '@/api';
import type { UserUpdateDTO } from '@/api';

const firstNameRef = ref()
const surnameRef = ref('')
const emailRef = ref('')
const passwordRef = ref('')
const formRef = ref()
let samePasswords = ref(true)

const imageRange = ref([10, 11, 12, 13, 14, 15]);

const iconSrc = ref('../src/assets/userprofile.png');
const fileInputRef = ref();

/**
 * Handles the event when the first name input changes.
 * Updates the first name reference value.
 *
 * @param {any} newValue - The new value of the first name input.
 */
const handleFirstNameInputEvent = (newValue: any) => {
  firstNameRef.value = newValue
}

/**
 * Handles the event when the surname input changes.
 * Updates the surname reference value.
 *
 * @param {any} newValue - The new value of the surname input.
 */
const handleSurnameInputEvent = (newValue: any) => {
  surnameRef.value = newValue
}

/**
 * Triggers the file upload dialog.
 */
const triggerFileUpload = () => {
  fileInputRef.value.click();
};

/**
 * Handles the file change event.
 * Uploads the selected image file.
 *
 * @param {any} event - The file change event.
 */
const handleFileChange = (event: any) => {
  const file = event.target.files[0];
  if (file) {
    uploadImage(file);
  }
};

/**
 * Uploads the image file to the server.
 * Updates user profile information upon successful image upload.
 *
 * @param {any} file - The image file to upload.
 */

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

/**
 * Sets up the user profile form.
 * Fetches user data and populates the form fields.
 */
async function setupForm() {
  try {
    const response = await UserService.getUser();
    console.log(response.firstName)
    firstNameRef.value = response.firstName;
    if (response.lastName != null) {
      surnameRef.value = response.lastName;
    }
    if (response.profileImage != null) {
      iconSrc.value = "http://localhost:8080/api/images/" + response.profileImage;
    } else {
      iconSrc.value = "../src/assets/userprofile.png";
    }
  } catch (err) {
    console.error(err)
  }
}


/**
 * Handles form submission.
 * Updates user profile information with the provided first name and surname.
 */
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
        <img :src="iconSrc" alt="Brukeravatar" style="width: 200px; height: 200px;">
        <div class="mt-2">
          <button type="button" class="btn btn-primary" @click="triggerFileUpload"><img
              src="../../assets/icons/download.svg"> Last opp bilde</button>
        </div>
      </div>
      <div class="form-group">
        <BaseInput data-cy="first-name" :model-value="firstNameRef" @input-change-event="handleFirstNameInputEvent"
          id="firstNameInputChange" input-id="first-name-new" type="text" label="Fornavn"
          placeholder="Skriv inn ditt fornavn" invalid-message="Vennligst skriv inn ditt fornavn" />
      </div>
      <br>
      <div class="form-group">
        <BaseInput data-cy="last-name" :model-value="surnameRef" @input-change-event="handleSurnameInputEvent"
          id="surnameInput-change" input-id="surname-new" type="text" label="Etternavn"
          placeholder="Skriv inn ditt etternavn" invalid-message="Vennligst skriv inn ditt etternavn" />
      </div>
      <br>
      <button data-cy="profile-submit-btn" type="submit" class="btn btn-primary">Oppdater
        profil</button>
    </form>
    <hr>
    <div>
      <h6>Stilsett din profil banner</h6>
      <div class="bannerHolder">
        <div v-for="x in imageRange" :key="x">
          <img :src="'http://localhost:8080/api/images/' + x" style="width: 400px; height: 40px; margin: 10px">
        </div>
      </div>
    </div>
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

.bannerHolder {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin-top: 20px;
}
</style>