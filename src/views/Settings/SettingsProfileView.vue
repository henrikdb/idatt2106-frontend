<script setup lang="ts">
import { ref, onMounted } from 'vue';
import BaseInput from '@/components/InputFields/BaseInput.vue';
import { useUserInfoStore } from "@/stores/UserStore";

const firstNameRef = ref()
const surnameRef = ref('')
const emailRef = ref('')
const passwordRef = ref('')
const confirmPasswordRef = ref('')
const formRef = ref()
let samePasswords = ref(true)

</script>


<template>
    <div class="tab-pane active" id="profile">
        <h6>YOUR PROFILE INFORMATION</h6>
        <hr>
        <form>
            <div class="user-avatar">
                  <img id="icon" src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="Maxwell Admin">
                </div>
                <div class="btn">
                  <div class="mt-2">
                    <span class="btn btn-primary"><img src="@/assets/icons/download.svg"></span>
                  </div>
                </div>
            <div class="form-group">
                <BaseInput :model-value="firstNameRef" @input-change-event="handleFirstNameInputEvent"
                    id="firstNameInputChange" input-id="first-name-new" type="text" label="First name"
                    placeholder="Enter your first name" invalid-message="Please enter your first name" />
            </div>
            <br>
            <div class="form-group">
                <BaseInput :model-value="surnameRef" @input-change-event="handleSurnameInputEvent"
                    id="surnameInput-change" input-id="surname-new" type="text" label="Surname"
                    placeholder="Enter your surname" invalid-message="Please enter your surname" />
            </div>
            <br>
            <button type="button" class="btn btn-primary">Update Profile</button>
            <button type="reset" class="btn btn-light">Reset Changes</button>
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