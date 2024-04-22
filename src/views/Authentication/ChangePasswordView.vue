<template>
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-lg-5">
          <div class="card shadow-lg border-0 rounded-lg mt-5">
            <div class="card-header"><h3 class="text-center font-weight-light my-4">Password Recovery</h3></div>
            <div class="card-body">
              <div class="small mb-3 text-muted">Enter the new password for your account</div>
              <form @submit.prevent="submitForm">
                <div class="form-floating mb-3">
                  <input v-model="newPassword" class="form-control" id="newPassword" type="password" placeholder="New Password" required>
                  <label for="newPassword">Enter your new password</label>
                </div>
                <div class="form-floating mb-3">
                  <input v-model="confirmPassword" class="form-control" id="confirmPassword" type="password" placeholder="Confirm Password" required>
                  <label for="confirmPassword">Confirm your new password</label>
                </div>
                <div class="d-flex align-items-center justify-content-between mt-4 mb-0">
                  <router-link to="/login" class="small">Return to login</router-link>
                  <button class="btn btn-primary" type="submit">Confirm Password</button>
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
  import { useRouter } from 'vue-router';
  import axios from 'axios';

  const router = useRouter();
  
  const newPassword = ref('');
  const confirmPassword = ref('');
  
  const submitForm = async () => {
    if (newPassword.value !== confirmPassword.value) {
      alert('Passwords do not match!');
      return;
    }
    try {
      const response = await axios.post('/api/reset-password', {
        password: newPassword.value,
        confirmPassword: confirmPassword.value
      });
      console.log('Success:', response.data);
        router.push('/login');
    } catch (error) {
      console.error('Error:', error);
    }
  };
  
  </script>
  