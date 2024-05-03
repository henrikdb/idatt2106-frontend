<script setup lang="ts">
import { RouterView } from 'vue-router'
import ErrorBoundaryCatcher from '@/components/Exceptions/ErrorBoundaryCatcher.vue'
</script>

<template>
  <main>
    <ErrorBoundaryCatcher>
      <RouterView />
    </ErrorBoundaryCatcher>
  </main>
</template>

<style>
main {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  font-weight: 600;
}
</style>
