<script setup lang="ts">
import { onMounted } from 'vue'
import { type AuthenticationResponse, OpenAPI } from '@/api'
import { useUserInfoStore } from '@/stores/UserStore'
import axios from 'axios'
import router from '@/router'

onMounted(() => {
  const query = new URLSearchParams(window.location.search);
  const code = query.get('code');
  const state = query.get('state');

  if (code && state) {
    exchangeCodeForToken(code, state);
  } else {
    console.error("Authorization code or state missing.");
  }
});

async function exchangeCodeForToken(code: string, state: string) {
  axios.post<AuthenticationResponse>('http://localhost:8080/api/auth/bank-id', { code: code, state: state })
    .then(response => {
      OpenAPI.TOKEN = response.data.token;
      useUserInfoStore().setUserInfo({
        accessToken: response.data.token,
        role: response.data.role,
        firstname: response.data.firstName,
        lastname: response.data.lastName,
      });
      router.push({ name: 'home' });
    })
    .catch(error => {
      console.error("Authentication error:", error);
      router.push({ name: 'login' });
    });
}
</script>