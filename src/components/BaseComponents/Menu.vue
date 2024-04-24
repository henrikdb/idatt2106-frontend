<template>
    <nav id="navBar" class="navbar navbar-expand-xl">
        <div class="container-fluid">
            <a class="navbar-brand" href="/" @click="toHome" id="home">
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
                        <a class="nav-link text-white" href="#" @click="toSavingGoals"><img
                                src="@/assets/icons/saving.svg">Saving goals</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link text-white" href="#" @click="toLeaderboard"><img
                                src="@/assets/icons/leaderboard.svg">Leaderboard</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link text-white" href="#" @click="toNews"><img
                                src="@/assets/icons/newsletter.svg">News</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link text-white" href="#" @click="toStore"><img
                                src="@/assets/icons/storefront.svg">Store</a>
                    </li>
                    <li v-if="userStore.isLoggedIn" class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle username-text text-white " href="#" role="button"
                            data-bs-toggle="dropdown" aria-expanded="false">
                            <img src="@/assets/icons/person.svg">{{ userStore.firstname }}
                        </a>
                        <ul class="dropdown-menu dropdown-username-content">
                            <li><a class="dropdown-item text-white dropdown-username-link" href="#"
                                    @click="toUserProfile"><img src="@/assets/icons/person.svg">User Profile</a></li>
                            <li><a class="dropdown-item text-white dropdown-username-link" href="#"
                                    @click="toBudget">Budget</a></li>
                            <li><a class="dropdown-item text-white dropdown-username-link" href="#"
                                    @click="toFriends"><img src="@/assets/icons/friends.svg">Friends</a></li>
                            <li><a class="dropdown-item text-white dropdown-username-link" href="#"
                                    @click="toSetting"><img src="@/assets/icons/settings.svg">Setting</a></li>
                            <li><a class="dropdown-item text-white dropdown-username-link" href="#"
                                    @click="toFeedback"><img src="@/assets/icons/feedback.svg">Feedback</a></li>
                            <li><a class="dropdown-item text-white dropdown-username-link" href="#"
                                    @click="toSetting"><img src="@/assets/icons/admin.svg">Admin table</a></li>
                            <li><a class="dropdown-item text-white dropdown-username-link" href="#"
                                    @click="toLogout" data-testid="logout"><img src="@/assets/icons/logout.svg">Log out</a></li>
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

const userStore = useUserInfoStore();

function toHome() {
    router.push('/')
}

function toBudget() {
  router.push('/budget-overview')
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
    router.push('/news')
}

function toFeedback() {
    router.push('/feedback')
}

function toFriends() {
    router.push('/friends')
}

function toUserProfile() {
    router.push('/profile')
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