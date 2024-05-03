<script setup lang="ts">
import { onMounted } from 'vue'
import { type AuthenticationResponse, OpenAPI } from '@/api'
import { useUserInfoStore } from '@/stores/UserStore'
import axios from 'axios'
import router from '@/router'

let apiUrl = import.meta.env.VITE_APP_API_URL

/**
 * Retrieves the authorization code and state from the URL parameters,
 * then calls the 'exchangeCodeForToken' function with the code and state if they are present.
 * If the code or state is missing, it logs an error.
 */
onMounted(() => {
  // Extract query parameters from the URL
  const query = new URLSearchParams(window.location.search)
  const code = query.get('code')
  const state = query.get('state')

  if (code && state) {
    exchangeCodeForToken(code, state)
  } else {
    console.error('Authorization code or state missing.')
  }
})

/**
 * Exchanges an authorization code and state for an authentication token.
 * Upon successful authentication, updates the authentication token and user information in the store, and navigates to the home page.
 *
 * @param {string} code - The authorization code received from the OAuth2 authorization server.
 * @param {string} state - The state parameter received from the OAuth2 authorization server.
 */
async function exchangeCodeForToken(code: string, state: string) {
  axios
    .post<AuthenticationResponse>(apiUrl + '/api/auth/bank-id', { code: code, state: state })
    .then((response) => {
      OpenAPI.TOKEN = response.data.token
      useUserInfoStore().setUserInfo({
        accessToken: response.data.token,
        role: response.data.role,
        firstname: response.data.firstName,
        lastname: response.data.lastName
      })
      router.push({ name: 'home' })
    })
    .catch((error) => {
      console.error('Authentication error:', error)
      router.push({ name: 'login' })
    })
}
</script>
