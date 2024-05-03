<script setup lang="ts">
import { RouterView } from 'vue-router'
import Footer from '@/components/BaseComponents/BaseFooter.vue'
import Menu from '@/components/BaseComponents/NavBar.vue'
import { useUserInfoStore } from '@/stores/UserStore';
</script>

<template>
    <Menu data-cy="menu"></Menu>
    <div id="minHeight">
      <RouterView />
    </div>
  <Footer></Footer>
</template>

<style scoped>
#minHeight {
  min-height: 700px;
  margin: 0 140px;
}
</style>