<template>
    <nav class="navbar navbar-expand-lg bg-success">
        <div class="container-fluid" >
            <a class="navbar-brand" href="#">
              <img src="/src/assets/Sparesti-logo.png" alt="Sparesti-logo" width="60">
            </a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav ms-auto mb-2 mb-lg-0 ui-menu">
                    <li class="nav-item">
                        <a class="nav-link text-white" href="/news" @click="toSavingGoals">Saving goals</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link text-white" href="/news" @click="toLeaderboard">Leaderboard</a>
                    </li>
                  <li class="nav-item">
                    <a class="nav-link text-white" href="/news" @click="toNews">News</a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link text-white" href="/news" @click="toStore">Store</a>
                  </li>
                </ul>
              <nav class="navbar bg-success">
              <div class="container-fluid">
                <a class="nav-link dropdown-toggle username-text text-white " href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  <img src="/src/assets/userprofile.png" alt="Userprofile" width="30" height="30" class="d-inline-block align-text-top">
                  Username
                </a>
                <ul class="dropdown-menu bg-success dropdown-username-content">
                  <li><a class="dropdown-item text-white dropdown-username-link" href="/news" @click="toUserProfile">User Profile</a></li>
                  <li><a class="dropdown-item text-white dropdown-username-link" href="/news" @click="toSetting">Setting</a></li>
                  <li><a class="dropdown-item text-white dropdown-username-link" href="/news" @click="toFeedback">Feedback</a></li>
                </ul>
              </div>
              </nav>
            </div>
        </div>
    </nav>
</template>
<script setup lang="ts">


/**
 * May need to change from a-links to routerlinks to avoid complications with href.
 */

import {useRouter} from "vue-router";

const router = useRouter();

function toSavingGoals(){
  router.push('/news')
}

function toLeaderboard(){
  router.push('/news')
}

function toNews(){
  router.push('/news')
}

function toStore(){
  router.push('/news')
}

function toSetting(){
  router.push('/news')
}

function toFeedback(){
  router.push('/news')
}

function toUserProfile(){
  router.push('/news')
}


</script>
<style scoped>
.ui-menu{
  font-size: 150%;
}

.username-text{
  font-size: 150%;

}

.dropdown-username-content{
  font-size: 150%;
}

.dropdown-username-link:hover{
  background-color: #538d53
}
</style>