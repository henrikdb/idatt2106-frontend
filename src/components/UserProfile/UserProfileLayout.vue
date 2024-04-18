<script setup lang="ts">

import Menu from "@/components/BaseComponents/Menu.vue";
import Footer from "@/components/BaseComponents/Footer.vue";

let points = 0;
let streak = 0;
</script>

<template>
  <Menu></Menu>
    <div class="container text-center">
    <div class="row">
      <div class="col">
        <img src="/src/assets/userprofile.png" class="img-fluid">
        <p class="h2">Username</p>
        <p><a class="link-dark" href="#">Edit profile</a></p>
      </div>
    </div>
      <div class="row">
        <div class="col">
          <img src="/src/assets/icons/fire.png" class="img-fluid" style="width: 30px; height: 30px" alt="dollar">
          <p>Streak: 10</p>
        </div>
      </div>
      <div class="row">
      <div class="col-12">
        <img src="/src/assets/icons/dollar.png" class="img-fluid" style="width: 30px; height: 30px" alt="dollar">
        <p class="">Points: 2000 </p>
      </div>
      </div>

    <div class="row">
      <div class="col">
        total points earned
      </div>
      <div class="col">
        total badges earned
      </div>
    </div>
    <div class="row">
      <div class="col">
        History
      </div>
    </div>
    <div class="row">
      <div class="col">
        Your Badges
      </div>
    </div>
  </div>
  <Footer></Footer>
</template>

<style scoped>

</style>