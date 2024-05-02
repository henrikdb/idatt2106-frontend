<script setup lang="ts">
import { RouterView } from 'vue-router'
import Footer from '@/components/BaseComponents/FooterComponent.vue'
import Menu from '@/components/BaseComponents/MenuComponent.vue'
import { useUserInfoStore } from '@/stores/UserStore';
</script>

<template>
    <Menu data-cy="menu"></Menu>
    <div v-if="!useUserInfoStore().isPremium && !useUserInfoStore().isNoAds" style="display: flex; flex-direction: row;">
      <img v-for="item in 7" src="@/assets/coca.webp" style="width: 100%; height: 100px; margin: 5px; border-radius: 1rem;" alt="picture">
    </div>
    <div id="minHeight">
      <RouterView />
    </div>
   <div v-if="!useUserInfoStore().isPremium && !useUserInfoStore().isNoAds" style="display: flex; flex-direction: row;">
      <img v-for="item in 7" src="@/assets/coca.webp" style="width: 100%; height: 100px; margin: 5px; border-radius: 1rem;" alt="picture">
    </div>
  <Footer></Footer>
</template>

<style scoped>
#minHeight {
  min-height: 700px;
}
</style>