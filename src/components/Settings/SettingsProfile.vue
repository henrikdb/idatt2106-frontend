<script setup lang="ts">
import { ref, onMounted } from 'vue';
import BaseInput from '@/components/BaseComponents/Input/BaseInput.vue';
import { useUserInfoStore } from "@/stores/UserStore";
import { UserService, ImageService, ItemService } from '@/api';
import type { UserUpdateDTO } from '@/api';
import handleUnknownError from '@/components/Exceptions/unkownErrorHandler';

let apiUrl = import.meta.env.VITE_APP_API_URL;

const firstNameRef = ref()
const surnameRef = ref('')
const emailRef = ref('')
const passwordRef = ref('')
const formRef = ref()
let samePasswords = ref(true)
let banners = ref([] as any)

let hasBanners = ref(false);
let selectedBannerId = ref(0);
const selectedBanner = ref()

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
    iconSrc.value = apiUrl + "/api/images/" + response;

    const updateUserPayload: UserUpdateDTO = {
      profileImage: response,
    };
    UserService.update({ requestBody: updateUserPayload })
    useUserInfoStore().setUserInfo({
      profileImage: response,
    })
  } catch (error) {
    handleUnknownError(error);
    console.error('Failed to upload image:', error);
  }
};

const getInventory = async () => {
  try {
    const response = await ItemService.getInventory();
    console.log(response)
    banners.value = response;
    hasBanners.value = response.length > 0;
  } catch (error) {
    handleUnknownError(error);
    console.error('Failed to get inventory:', error);
  }
};

const selectItem = async (bannerId: any) => {
  try {
    const bannerImagePayload: UserUpdateDTO = {
      bannerImage: bannerId,
    };
    await UserService.update({ requestBody: bannerImagePayload })
    setupForm()
  } catch (error) {
    handleUnknownError(error)
    console.error(error)
  }
}

async function setupForm() {
  try {
    const response = await UserService.getUser();
    console.log(response.firstName)
    firstNameRef.value = response.firstName;
    if (response.lastName != null) {
      surnameRef.value = response.lastName;
    }
    if (response.profileImage != null) {
      iconSrc.value = apiUrl + "/api/images/" + response.profileImage;
    } else {
      iconSrc.value = "../src/assets/userprofile.png";
    }
    if (response.bannerImage != null) {
      selectedBanner.value = response.bannerImage;
    }
  } catch (err) {
    handleUnknownError(err);
    console.error(err)
  }
}

const handleSubmit = async () => {
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
    handleUnknownError(err);
    console.error(err)
  }
}
onMounted(() => {
  setupForm()
  getInventory()
})

</script>


<template>
  <div class="tab-pane active" id="profile">
    <h6>DIN PROFILINFORMASJON</h6>
    <hr>
    <form @submit.prevent="handleSubmit" novalidate>
      <div class="user-avatar">
        <input type="file" ref="fileInputRef" @change="handleFileChange" accept=".jpg, .jpeg, .png"
          style="display: none" />
        <img :src="iconSrc" alt="Brukeravatar" style="width: 200px; height: 200px;">
        <div class="mt-2">
          <button type="button" class="btn btn-primary classyButton" @click="triggerFileUpload"><img
              src="../../assets/icons/download.svg"> Last opp bilde</button>
        </div>
      </div>
      <div class="form-group">
        <BaseInput data-cy="first-name" :model-value="firstNameRef" @input-change-event="handleFirstNameInputEvent"
          id="firstNameInputChange" input-id="first-name-new" type="text" label="Fornavn"
          placeholder="Skriv inn ditt fornavn" invalid-message="Vennligst skriv inn ditt fornavn"
          style="max-width: 300px" />
      </div>
      <br>
      <div class="form-group">
        <BaseInput data-cy="last-name" :model-value="surnameRef" @input-change-event="handleSurnameInputEvent"
          id="surnameInput-change" input-id="surname-new" type="text" label="Etternavn"
          placeholder="Skriv inn ditt etternavn" invalid-message="Vennligst skriv inn ditt etternavn"
          style="max-width: 300px" />
      </div>
      <br>
      <button data-cy="profile-submit-btn" type="submit" class="btn btn-primary classyButton">Oppdater profil</button>
    </form>
    <hr>
    <div>
      <h6>Banners</h6>
      <div v-if="hasBanners" class="scrolling-wrapper-badges row flex-row flex-wrap mt-2 pb-2 pt-2">
        <div v-for="banner in banners" :key="banner.id" class="card text-center banner justify-content-center d-flex align-items-center" @click="selectItem(banner.id)"
          :class="{ 'selected-banner': banner.id === selectedBannerId }" data-bs-toggle="tooltip"
          data-bs-placement="top" data-bs-custom-class="custom-tooltip" :data-bs-title="banner.criteria">
          <img :src="apiUrl + `/api/images/${banner.imageId}`" class="card-img-top" alt="Banner" style="width: 100px; height: 100px" />
            <h5 class="card-title">{{ selectedBanner }}</h5>
        </div>
      </div>
      <div v-else>
        Ingen banners
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

.selected-banner {
  border: 2px solid #1a81b5;
  display: flex;
}

.banner {
  margin: 10px;
  cursor: pointer;
  width: 200px;
}
</style>