<template>
    <nav id="navBar" class="navbar navbar-expand-xl">
        <div class="container-fluid">
            <router-link class="navbar-brand" id="home" :to="toSavingGoals()">
                <img id="logoImg" src="/src/assets/Sparesti-logo.png" alt="Sparesti-logo" width="60">
                <span id="logo" class="text-white">Sparesti</span>
            </router-link>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav ms-auto mb-2 mb-lg-0 ui-menu">
                    <li class="nav-item">
                        <router-link class="nav-link text-white" :to="toSavingGoals()"><img
                                src="@/assets/icons/saving.svg">Saving goals</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link text-white" :to="toLeaderboard()"><img
                                src="@/assets/icons/leaderboard.svg">Leaderboard</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link text-white" :to="toNews()"><img
                                src="@/assets/icons/newsletter.svg">News</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link text-white" :to="toStore()"><img
                                src="@/assets/icons/storefront.svg">Store</router-link>
                    </li>
                    <li class="nav-item dropdown">
                        <a data-mdb-dropdown-init class=" nav-link me-3 dropdown-toggle hidden-arrow notification" href="#" id="navbarDropdownMenuLink"
                           role="button" data-bs-toggle="dropdown" aria-expanded="false">
                          <i class="fas fa-bell text-white"></i>
                          <span class="badge rounded-pill badge-notification bg-danger">1</span>
                        </a>
                        <ul class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                          <li v-for="(array,key) in notifMap" :key="key" >
                            <router-link class="not-item dropdown-item text-white"   :to="getPath(array[1][0])">{{array[1][1]}}</router-link>
                          </li>
                        </ul>
                    </li>
                    <li v-if="userStore.isLoggedIn" class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle username-text text-white" href="#" role="button"
                            data-bs-toggle="dropdown" aria-expanded="false">
                            <img :src="useUserInfoStore().profileImage ? 'http://localhost:8080/api/images/' + useUserInfoStore().profileImage : 'src/assets/userprofile.png'"
                                style="width: 50px; border: 2px solid black; border-radius: 50%">{{
                useUserInfoStore().firstname }}
                        </a>
                        <ul class="dropdown-menu dropdown-username-content">
                            <li><router-link class="dropdown-item text-white dropdown-username-link"
                                    :to="toUserProfile()"><img src="@/assets/icons/person.svg">User
                                    Profile</router-link></li>
                            <li><router-link class="dropdown-item text-white dropdown-username-link"
                                    :to="toBudget()"><img>Budget</router-link></li>
                            <li><router-link class="dropdown-item text-white dropdown-username-link"
                                    :to="toFriends()"><img src="@/assets/icons/friends.svg">Friends</router-link></li>
                            <li><router-link class="dropdown-item text-white dropdown-username-link"
                                    :to="toSetting()"><img src="@/assets/icons/settings.svg">Settings</router-link></li>
                            <li><router-link class="dropdown-item text-white dropdown-username-link"
                                    :to="toFeedback()"><img src="@/assets/icons/feedback.svg">Feedback</router-link>
                            </li>
                            <li><router-link class="dropdown-item text-white dropdown-username-link"
                                    :to="toSetting()"><img src="@/assets/icons/admin.svg">Admin</router-link></li>
                            <li><a data-testid="logout" class="dropdown-item text-white dropdown-username-link" ref="#"
                                    @click="toLogout()"><img src="@/assets/icons/logout.svg">Log out</a></li>
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
import {onMounted, ref} from "vue";



const router = useRouter();

const userStore: any = useUserInfoStore();

let profileImage: any = ref('');

if (useUserInfoStore().profileImage !== 0) {
    profileImage = 'http://localhost:8080/api/images/' + useUserInfoStore().profileImage;
} else {
    profileImage = 'src/assets/userprofile.png';
}

//Hashmap that contains the path to the Badges, The Friend, The dashboard etc.
//The key value pair is the message of the notification and the path of the route
let notifMap = ref (new Map<number, any[]>);

let notifId = ref(0);

let path = ref('#');


/* id: 0 -> /roadmap
   id: 1 -> /profile
   id: 2 -> /friend
 */



function getNotification(){
  //axios call
  let response = ref( ['1', 'You have recived a award for getting 200 points'])
  let response2 = ref( ['2', 'You have recived a friend request from Jens Aanestad'])
  let response3 = ref( ['3', 'You have lost your streak. Come back to try again'])
  notifMap.value.set(notifId.value,response.value)
  notifId.value++
  notifMap.value.set(notifId.value,response2.value)
  notifId.value++
  notifMap.value.set(notifId.value,response3.value)
  notifId.value++
}
function toBadges(){

}

function getPath(id : string){
  if(id === '1'){
    return path.value = '/profile'
  }
  if(id === '2'){
    return path.value = '/friends'
  }
  if(id === '3'){
    return path.value = '/roadmap'
  }
}

function removeNotification() {

}


function toHome() {
    return '/'
}

function toBudget() {
    return '/budget-overview'
}

function toSavingGoals() {
    return '/roadmap'
}

function toLeaderboard() {
    return '/leaderboard'
}

function toNews() {
    return '/news'
}

function toStore() {
    return '/shop'
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
onMounted(() => {
  getNotification()
})

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
.not-item:hover {
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

#notifyBtn  {
  background-color: #0A58CA;
  border: #0A58CA;
}

#notifyBtn:hover {
  background-color: #2b6ac7;
  border: #2b6ac7;
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
.notification.hidden-arrow::after{
  display: none;
}


</style>