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
    <div class="tab-pane active" id="account">
        <h6>ACCOUNT SETTINGS</h6>
        <hr>
        <form>
            <div class="form-group">
                <BaseInput :model-value="firstNameRef" @input-change-event="handleFirstNameInputEvent"
                    id="firstNameInputChange" input-id="first-name-new" type="text" label="Username"
                    placeholder="Enter your username" invalid-message="Please enter your username" />
            </div>
            <br>
            <div class="form-group">
                <BaseInput :model-value="emailRef" @input-change-event="handleEmailInputEvent" id="emailInput-change"
                    input-id="email-new" type="email" label="Email" placeholder="Enter your email"
                    invalid-message="Invalid email" />
            </div>
            <hr>
            <div class="form-group">
                <label class="d-block text-danger">Delete Account</label>
                <p class="text-muted font-size-sm">Once you delete your account, there is no going
                    back. Please be certain.</p>
            </div>
            <button class="btn btn-danger" type="button">Delete Account</button>
        </form>
    </div>
</template>