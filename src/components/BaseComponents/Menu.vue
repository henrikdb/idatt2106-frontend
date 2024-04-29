<template>
    <nav id="navBar" class="navbar navbar-expand-xl">
        <div class="container-fluid">
            <a class="navbar-brand" href="#" @click="toSavingGoals" id="home">
                <img id="logoImg" src="/src/assets/Sparesti-logo.png" alt="Sparesti-logo" width="60">
                <span id="logo" class="text-white">Sparesti</span>
            </a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav ms-auto mb-2 mb-lg-0 ui-menu">
                    <li class="nav-item">
                      <router-link class="nav-link text-white" to="/roadmap"><img
                                src="@/assets/icons/saving.svg">Saving goals</router-link>
                    </li>
                    <li class="nav-item">
                      <router-link class="nav-link text-white" to="/leaderboard"><img
                                src="@/assets/icons/leaderboard.svg">Leaderboard</router-link>
                    </li>
                    <li class="nav-item">
                      <router-link class="nav-link text-white" to="/news"><img
                          src="@/assets/icons/newsletter.svg">News</router-link>
                    </li>
                    <li class="nav-item">
                      <router-link class="nav-link text-white" to="/shop"><img
                          src="@/assets/icons/storefront.svg">Store</router-link>
                    </li>
                    <li v-if="userStore.isLoggedIn" class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle username-text text-white " href="#" role="button"
                            data-bs-toggle="dropdown" aria-expanded="false">
                            <img src="@/assets/icons/person.svg">{{ useUserInfoStore().firstname}}
                        </a>
                        <ul class="dropdown-menu dropdown-username-content">
                            <li><router-link class="dropdown-item text-white dropdown-username-link" :to="toUserProfile()"><img
                                  src="@/assets/icons/person.svg">User Profile</router-link></li>
                            <li><router-link class="dropdown-item text-white dropdown-username-link" :to="toBudget()"><img>Budget</router-link></li>
                            <li><router-link class="dropdown-item text-white dropdown-username-link" :to="toFriends()"><img
                                src="@/assets/icons/friends.svg">Friends</router-link></li>
                            <li><router-link class="dropdown-item text-white dropdown-username-link" :to="toSetting()"><img
                                src="@/assets/icons/settings.svg">Settings</router-link></li>
                            <li><router-link class="dropdown-item text-white dropdown-username-link" :to="toFeedback()"><img
                                src="@/assets/icons/feedback.svg">Feedback</router-link></li>
                            <li><router-link class="dropdown-item text-white dropdown-username-link" :to="toSetting()"><img
                                src="@/assets/icons/admin.svg">Admin</router-link></li>
                            <li><a data-testid="logout" class="dropdown-item text-white dropdown-username-link" ref="#" @click="toLogout()"><img
                                src="@/assets/icons/logout.svg">Log out</a></li>
                        </ul>
                    </li>
                    <li v-else class="nav-item">
                        <a class="nav-link text-white" href="#" @click="toLogout">Login</a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>
<script setup lang="ts">
import { useRouter } from "vue-router";
import { useUserInfoStore } from '@/stores/UserStore';

const router = useRouter();

const userStore : any = useUserInfoStore();

function toHome() {
    router.push('/')
}

function toBudget() {
  return '/budget-overview'
}

function toSavingGoals() {
    router.push('/roadmap')
}

function toLeaderboard() {
    router.push('/leaderboard')
}

function toNews() {
    router.push('/news')
}

function toStore() {
    router.push('/shop')
}

function toSetting() {
    return '/settings/profile'
}

function toFeedback() {
    return '/feedback'
}

function toFriends() {
    return '/friends'
}

function toUserProfile() {
   return '/profile'
}

function toLogout() {
    userStore.clearUserInfo();
    router.push('login')
}


</script>
<style scoped>
.navbar-brand {
    display: flex;
    align-items: center;
}

.navbar-toggler-icon {
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 30'%3E%3Cpath stroke='rgba(255, 255, 255)' stroke-width='2' stroke-linecap='round' d='M4 7h22M4 15h22M4 23h22'/%3E%3C/svg%3E");
}

.nav-item {
    padding: 0.3rem 0.6rem;
    font-size: 1.7rem;
}

.nav-item:hover {
    background-color: #2b6ac7;
}

.nav-item .dropdown {
    display: flex;
    justify-content: center;
}

.nav-link {
    display: flex;
    align-items: center;
    justify-content: center;
}

.dropdown-item {
    width: 100%;
    display: flex;
    justify-content: center;
}

.dropdown-menu {
    background-color: #0A58CA;
    right: -0.5rem;
}

.dropdown-menu[data-bs-popper] {
    left: auto;
}

.dropdown-username-link {
    font-size: 1.7rem;
    display: flex;
    justify-self: center;
}

.dropdown-username-link:hover {
    background-color: #2b6ac7;
}

#navBar {
    background-color: #0A58CA;
}

.navbar {
    display: flex;
    align-items: center;
}

.container-fluid {
    font-size: 1.7rem;
}

#logo {
    font-size: 2.5rem;
    height: 100%;
}

.nav-link img {
    margin-right: 5px;
}

#logoImg {
    margin-right: 0.3rem;
    width: 75px;
    height: auto;
    aspect-ratio: 1.3/1;
}
</style>