<script setup lang="ts">
import '@fortawesome/fontawesome-free/css/all.css'
import { RouterLink } from 'vue-router'
import {logDOM} from "@testing-library/vue";




const ifNotLoggedInLogin  = () => {
 /* if (useUserInfoStore.isActive) {
    return '/discover'
  }
  return '/login'*/
  return '/login'
}

const ifLoggedInDiscover = () => {
  /*if (store.isActive) {
    return '/discover'
  }
  return '/'*/
  return '/'
}

const ifLoggedInReset = () => {
  /*if (store.isActive) {
    store.resetAll()
  }*/
  return '/login'
}
</script>

<template>
  <div class="footer footer-wrapper fixed-bottom" style="background-color: #3B71CA">

    <div class="links-wrapper">
      <p class="links-header">Links</p>
      <div class="links-container">
        <RouterLink class="router" id="home" :to="ifLoggedInDiscover">Home</RouterLink>
        <RouterLink class="router" id="discover" :to="ifNotLoggedInLogin()">Discover</RouterLink>
        <RouterLink class="router" id="login" to="/login" @click="ifLoggedInReset()">Login</RouterLink>
      </div>
    </div>

    <div class="support-wrapper">
      <p class="support-header">Support us</p>
      <div class="support-container">
        <a href="https://twitter.com" target="_blank">
          <i class="fab fa-twitter"></i>
          Twitter
        </a>
        <a href="https://instagram.com" target="_blank">
          <i class="fab fa-instagram"></i>
           Instagram
        </a>
        <a href="https://facebook.com" target="_blank">
          <i class="fab fa-facebook"></i>
           Facebook
        </a>
        <a href="https://discord.gg" target="_blank">
          <i class="fab fa-discord"></i>
           Discord
        </a>
      </div>
    </div>

    <div class="info-wrapper">
      <p class="info-header">Company</p>
      <div class="info-container">
        <RouterLink class="router" to="/about-us">About us</RouterLink>
        <RouterLink class="router" to="/privacy-policy">Privacy</RouterLink>
      </div>
    </div>

  </div>
</template>

<style scoped>
:root {
  --footer-margin: 2rem
}

.footer-wrapper {
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  background-size: cover;
  justify-content: center;
}

.links-header, .support-header, .info-header {
  font-family: Inter,sans-serif;
  font-size: 26px;
  font-weight: 600;
  color: #FFFFFF;
  margin: var(--footer-margin);
  padding-left: 10px;
}

.links-container, .support-container, .info-container {
  display: flex;
  flex-direction: column;
  margin: var(--footer-margin);
}

.support-container a i {
  margin-right: 0.7rem;
}

.router, .support-container a {
  width: 100%;
  height: 39px;
  font-family: 'Inter', serif;
  font-weight: 500;
  font-size: 18px;
  text-decoration: none;
  border-radius: 10px;
  align-content: center;
  color: #FFFFFF;
  border: 1px solid #3B71CA;
  padding-left: 10px;
}

.router:hover, .support-container a:hover {
  background-color: #FFFFFF;
  color: #3B71CA;
  font-weight: 500;
  font-size: 18px;
}

@media (max-width: 588px) {
  .footer-wrapper {
    display: flex;
    flex-direction: column;
  }
}
</style>
