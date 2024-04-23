<script setup lang="ts">
import LoginForm from '@/components/Login/LoginForm.vue'
</script>

<template>
  <div class="containers">
    <div class="box">
      <LoginForm/>
    </div>
  </div>
</template>

<style scoped>
  .containers {
    background-color: #A2CC99;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .box {
    background-color: white;
    border-radius: 3rem;
    max-width: 450px;
    padding: 1rem 4rem;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  }

  
</style>