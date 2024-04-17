<script setup lang="ts">
import { RouterView } from 'vue-router'
import ErrorBoundaryCatcher from '@/components/Exceptions/ErrorBoundaryCatcher.vue';
</script>

<template>
  <main>
    <error-boundary-catcher>
      <RouterView />
    </error-boundary-catcher>
  </main>
</template>

<style>
  main {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  }
</style>