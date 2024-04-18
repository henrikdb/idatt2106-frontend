<script setup lang="ts">
import { RouterView } from 'vue-router'
import Footer from '@/components/BaseComponents/Footer.vue'
import Menu from '@/components/BaseComponents/Menu.vue'
</script>

<template>
    <Menu></Menu>
    <div>
      <RouterView />
    </div>
    <Footer></Footer>
</template>