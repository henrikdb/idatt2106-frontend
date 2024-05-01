<script setup lang="ts">
import SignUpForm from '@/components/SignUp/SignUpForm.vue'
</script>

<template>
  <div class="containers">
    <h1 class="title">Sparesti</h1>
    <div class="box">
      <SignUpForm />
    </div>
  </div>
</template>

<style scoped>
.containers {
  background: url('./src/assets/wave.svg');
  background-repeat: no-repeat;
  background-size: cover;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.box {
  background-color: white;
  border-radius: 1rem;
  max-width: 750px;
  padding: 0 3rem 1rem 3rem;
  box-shadow: rgba(57, 57, 63, 0.5) 0px 1px 20px 0px;
}

.title {
  font-size: 60px;
  color: white;
  margin-bottom: 40px;
  font-weight: 700;
}
</style>