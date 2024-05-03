<template>
  <nav id="navBar" class="navbar navbar-expand-xl">
    <div class="container-fluid">
      <router-link class="navbar-brand" id="home" :to="toSavingGoals()">
        <img id="logoImg" src="/src/assets/Sparesti-logo.png" alt="Sparesti-logo" width="60">
        <span id="logo" class="text-white">SpareSti</span>
      </router-link>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
        aria-expanded="false" aria-label="Bytt navigasjon">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav ms-auto mb-2 mb-lg-0 ui-menu">
          <li class="nav-item">
            <router-link data-cy="savingGoals" class="nav-link text-white"
              :to="toSavingGoals()" exact-active-class="active-nav">
              <img src="@/assets/icons/saving.svg">Sparemål
            </router-link>
          </li>
          <li class="nav-item">
            <router-link data-cy="leaderboard" class="nav-link text-white"
              :to="toLeaderboard()" exact-active-class="active-nav">
              <img src="@/assets/icons/leaderboard.svg">Ledertavle
            </router-link>
          </li>
          <li class="nav-item">
            <router-link data-cy="news" class="nav-link text-white"
              :to="toNews()" exact-active-class="active-nav">
              <img src="@/assets/icons/newsletter.svg">Nyheter
            </router-link>
          </li>
          <li class="nav-item">
            <router-link data-cy="store" class="nav-link text-white"
              :to="toStore()" exact-active-class="active-nav">
              <img src="@/assets/icons/storefront.svg">Butikk
            </router-link>
          </li>
          <li class="nav-item dropdown">
                        <a data-mdb-dropdown-init class=" nav-link dropdown-toggle hidden-arrow notification" href="#" id="navbarDropdownMenuLink"
                           role="button" data-bs-toggle="dropdown" aria-expanded="false">
                          <img src="/src/assets/icons/bell-white.svg">
                          <span v-if="notificationListRef.length > 0" class="badge rounded-pill badge-notification bg-danger">{{ notificationListRef.length }}</span>
                        </a>
                        <ul v-if="notificationListRef.length > 0" class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                          <li v-for="(item, index) in notificationListRef" :key="index" >
                            <router-link :to="notificationPathMapper[String(item.notificationType)]"
                                         class="d-flex align-items-center"
                                         @click="readNotification(item)">
                              <div class="flex-shrink-0">
                                <img :src="notificationImageMapper[String(item.notificationType)]" alt="Varslingsikon"          class="notification-icon">
                              </div>
                              <div class="flex-grow-1 ms-3">
                                <div class="not-item dropdown-item">{{item.message}}</div>
                              </div>
                            </router-link>
                          </li>
                        </ul>
                        <ul v-else-if="notificationListRef.length === 0" class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                          <li>Ingen varslinger</li>
                        </ul>
                    </li>
          <li v-if="userStore.isLoggedIn" class="nav-item dropdown">
            <a
              data-cy="user"
              :class="['nav-link', 'dropdown-toggle', 'username-text', 'text-white', { 'underline-active': !isAnyActivePage() }]"
              href="#"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false">
              <img src="@/assets/icons/person.svg">{{ useUserInfoStore().firstname }}
            </a>

            <ul class="dropdown-menu dropdown-username-content">


              <li>
                <router-link data-cy="profile"
                  class="dropdown-item dropdown-username-link"
                  :to="toUserProfile()"
                  exact-active-class="active-link"
                  @click="toggleDropdown">
                  <img src="@/assets/icons/black_person.svg">Min profil
                </router-link>
              </li>
              <li v-if="useUserInfoStore().isPremium">
                <router-link data-cy="budget"
                  class="dropdown-item dropdown-username-link"
                  :to="toBudget()"
                  exact-active-class="active-link"
                  @click="toggleDropdown">
                  <img src="@/assets/icons/budget.svg">Budjsett
                </router-link>
              </li>
              <li>
                <router-link data-cy="friends"
                  class="dropdown-item dropdown-username-link"
                  :to="toFriends()"
                  exact-active-class="active-link"
                  @click="toggleDropdown">
                  <img src="@/assets/icons/black_friends.svg">Venner
                </router-link>
              </li>
              <li>
                <router-link data-cy="settings"
                  class="dropdown-item dropdown-username-link"
                  :to="toSetting()"
                  exact-active-class="active-link"
                  @click="toggleDropdown">
                  <img src="@/assets/icons/settings.svg">Innstillinger
                </router-link>
              </li>
              <li>
                <router-link data-cy="feedback"
                  class="dropdown-item dropdown-username-link"
                  :to="toFeedback()"
                  exact-active-class="active-link"
                  @click="toggleDropdown">
                  <img src="@/assets/icons/feedback.svg">Tilbakemelding
                </router-link>
              </li>
              <li>
                <router-link data-cy="admin"
                  class="dropdown-item dropdown-username-link"
                  :to="toSetting()"
                  exact-active-class="active-link"
                  @click="toggleDropdown">
                  <img src="@/assets/icons/admin.svg">Admin
                </router-link>
              </li>
              <li style="cursor: pointer">
                <a data-testid="logout"
                   class="dropdown-item dropdown-username-link"
                   href="#"
                   @click="toLogout()">
                  <img src="@/assets/icons/logout.svg">Logg ut
                </a>
              </li>

              
            </ul>
          </li>
          <li v-else class="nav-item">
            <a class="nav-link" style="cursor: pointer;" href="#"
               @click="toLogout">Logg inn
            </a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>


<script setup lang="ts">
import { useRouter, useRoute } from "vue-router";
import { useUserInfoStore } from '@/stores/UserStore';
import {onMounted, ref} from "vue";
import { BadgeService, type NotificationDTO, NotificationService } from '@/api'
import handleUnknownError from '@/components/Exceptions/unkownErrorHandler';

const router = useRouter();
const route = useRoute();

const userStore: any = useUserInfoStore();

let path = ref('#');

let notificationListRef = ref<NotificationDTO[]>([]);


 function isAnyActivePage() {
  const activeRoutes = ['/roadmap', '/leaderboard', '/news', '/shop']; // Add other pages here
  return activeRoutes.includes(route.path);
}

function toggleDropdown(event: any) {
  const dropdownMenu = event.target.closest('.dropdown-menu');
  if (dropdownMenu) {
    dropdownMenu.classList.remove('show');
  }
}


const notificationImageMapper: any = {
  "FRIEND_REQUEST": "/src/assets/userprofile.png",
  "BADGE": "/src/assets/icons/medal.png",
  "COMPLETED_GOAL": "/src/assets/icons/piggybank.svg"
}

const notificationPathMapper: any = {
  "FRIEND_REQUEST": "/friends",
  "BADGE": "/profile",
  "COMPLETED_GOAL": "/roadmap"
}

const getNotifications = async () => {
  try {
    await BadgeService.updateUnlockedBadges();
    notificationListRef.value = await NotificationService.getUnreadNotificationByUser()
  } catch (error) {
    handleUnknownError(error);
    notificationListRef.value = []
  }
}

const readNotification = async (notification: NotificationDTO) => {
  try {
    notification.unread = false;
    await NotificationService.updateNotification({requestBody: notification});
    notificationListRef.value = await NotificationService.getUnreadNotificationByUser()
  } catch (error) {
    handleUnknownError(error);
    notificationListRef.value = [];
  }
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

  return '#';
}

function updateNotification(){
  //Axios get request to the getFunction
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
  getNotifications()
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
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0.1rem 0.3rem;
    font-size: 1.7rem;
}

.active-nav {
  border-radius: 0rem;
  border-bottom: 4px solid #f3f3f3;
}

.active-link {
  background-color: #f3f3f6;
  border-bottom: 3px solid #01476b;
}

.underline-active {
  border-bottom: 4px solid white;
}

.dropdown-item img {
  height: 35px;
  width: 35px;
  margin-right: 5px;
}

.nav-item:hover {
    background-color: #01476b;
  border-radius: 1rem;
}

.not-item:hover {
  background-color: #f3f3f3;
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
    justify-content: left;
}

.dropdown-item:hover {
  width: 100%;
}

.dropdown-menu {
  padding: 5px;
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
    background-color: #f3f3f3;
}

.dropdown-item img {
  height: 35px;
  width: 35px;
  margin-right: 5px;
}

#navBar {
    background-color: #003A58;
}

.notification-icon {
  height: 35px;
  width: 35px;
}

.nav-item a {
  font-size: 19px;
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
  height: 35px;
  width: 35px;
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