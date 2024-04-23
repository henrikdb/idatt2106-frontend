<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-lg-5">
                <div class="card shadow-lg border-0 rounded-lg mt-5">
                    <div class="card-header">
                        <h3 class="text-center font-weight-light my-4">Password Recovery</h3>
                    </div>
                    <div class="card-body">
                        <div class="small mb-3 text-muted">Enter your email address and we will send you a link to reset
                            your password.</div>
                        <form @submit.prevent="submitForm">
                            <div class="form-floating mb-3">
                                <input v-model="email" class="form-control" id="inputEmail" type="email"
                                    placeholder="name@example.com" required>
                                <label for="inputEmail">Enter email address</label>
                            </div>
                            <div class="d-flex align-items-center justify-content-between mt-4 mb-0">
                                <router-link to="/login" class="small">Return to login</router-link>
                                <button class="btn btn-primary" type="submit">Reset Password</button>
                            </div>
                            <div class="text-success">
                                {{ confirmationMessage }}
                            </div>
                        </form>
                    </div>
                    <div class="card-footer text-center py-3">
                        <div class="small"><router-link to="/sign-up">Need an account? Sign up!</router-link></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import axios from 'axios';
import { UserService } from '@/api';

const router = useRouter();

const email = ref('');
let confirmationMessage = ref('');

const submitForm = async () => {
    try {
        const response = await UserService.resetPassword({
            requestBody: email.value 
        });
        console.log('Success:', response.data);
        confirmationMessage.value = 'An email has been sent to your email address with a link to reset your password.';
    } catch (error) {
        console.error('Error:', error);
    }
};

</script>