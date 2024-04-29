<template>
    <div class="tab-pane active" id="security">
        <h6>SECURITY SETTINGS</h6>
        <hr>
        <form @submit.prevent="handleSubmit" novalidate>
            <div class="form-group">
                <label class="d-block">Change Password</label>
                <BaseInput :model-value="oldPasswordRef" @input-change-event="handleOldPasswordInputEvent"
                    id="passwordInput-change" input-id="password-old" type="password"
                    pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{4,16}" label="Old Password" placeholder="Enter password"
                    invalid-message="Password must be between 4 and 16 characters and contain one capital letter, small letter and a number" />

                <BaseInput :model-value="newPasswordRef" @input-change-event="handleNewPasswordInputEvent"
                    id="passwordInput-change" input-id="password-new" type="password"
                    pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{4,16}" label="New Password" placeholder="Enter password"
                    invalid-message="Password must be between 4 and 16 characters and contain one capital letter, small letter and a number" />

                <BaseInput :model-value="confirmPasswordRef" @input-change-event="handleConfirmPasswordInputEvent"
                    id="passwordInput-change" input-id="password-confirm" type="password"
                    pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{4,16}" label="Confirm New Password" placeholder="Enter password"
                    invalid-message="Password must be between 4 and 16 characters and contain one capital letter, small letter and a number" />
            </div>
            <button type="submit" class="btn btn-primary">Update Password</button>
            <button type="reset" class="btn btn-light">Reset Changes</button>
        </form>
        <hr>
    </div>
</template>

<script setup lang="ts">
    import { ref } from 'vue'
    import BaseInput from '@/components/InputFields/BaseInput.vue'
    import { type PasswordUpdateDTO, UserService } from '@/api'

    const oldPasswordRef = ref('');
    const newPasswordRef = ref('');
    const confirmPasswordRef = ref('');


    const handleOldPasswordInputEvent = (newValue: any) => {
        oldPasswordRef.value = newValue
}

    const handleNewPasswordInputEvent = (newValue: any) => {
        newPasswordRef.value = newValue
}

    const handleConfirmPasswordInputEvent = (newValue: any) => {
        confirmPasswordRef.value = newValue
}

const handleSubmit = async () => {
    if (newPasswordRef.value !== confirmPasswordRef.value) {
        console.error('Passwords do not match')
        return
    }


    const updateUserPayload: PasswordUpdateDTO = {
        oldPassword: oldPasswordRef.value,
        newPassword: newPasswordRef.value,
    };

    try {
        const response = UserService.updatePassword({ requestBody: updateUserPayload })
        console.log(response)
    } catch (err) {
        console.error(err)
    }
}




</script>

<style scoped></style>