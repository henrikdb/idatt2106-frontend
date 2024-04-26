<script setup lang="ts">
import { RouterView } from 'vue-router'
import Footer from '@/components/BaseComponents/Footer.vue'
import Menu from '@/components/BaseComponents/Menu.vue'
import FooterAlternative from "@/components/BaseComponents/FooterAlternative.vue";
</script>

<template>
  
    <Menu></Menu>
    <!--<div style="display: flex; flex-direction: row;">
      <img v-for="item in 7" src="@/assets/coca.webp" style="width: 100%; height: 100px; margin: 5px; border-radius: 1rem;" alt="picture">
    </div>-->
    <div>
      <RouterView />
    </div>
   <!-- <div style="display: flex; flex-direction: row;">
      <img v-for="item in 7" src="@/assets/coca.webp" style="width: 100%; height: 100px; margin: 5px; border-radius: 1rem;" alt="picture">
    </div> -->
    <FooterAlternative></FooterAlternative>
</template>