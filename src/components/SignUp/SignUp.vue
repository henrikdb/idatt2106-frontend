<script setup lang="ts">

import SignUpForm from '@/components/SignUp/SignUpForm.vue'
</script>

<template>
  <div class="containers">
    <div class="box">
      <SignUpForm />
    </div>
  </div>
</template>

<style scoped>
.containers {
  background-color: #A2CC99;
  height: 100vh;
  display: flex;
  justify-content: center;
}

.box {
  width: 450px;
  margin: 2rem;
  background-color: white;
  border-radius: 3rem;
  padding: 1rem 4rem;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
}
</style>