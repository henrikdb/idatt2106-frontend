<script setup lang="ts">
import {ref} from "vue";

const savingGoalList = ref([
  { title: 'Spain trip', MoneyTarget: '200kr', description: 'You wanted to save 200kr on a spain trip' },
  { title: 'Italy Escapade', MoneyTarget: '200kr', description: 'Experience the magic of Italy with us! Our goal is to save 200kr for an amazing trip to Italy.' },
  { title: 'French Getaway', MoneyTarget: '200kr', description: 'Join us as we plan to save 200kr for a delightful trip to France!' },
  { title: 'Exploring Greece', MoneyTarget: '200kr', description: 'Dreaming of Greece? Lets work together to save 200kr for that unforgettable trip!' },
  { title: 'German Adventure', MoneyTarget: '200kr', description: 'Discover the charm of Germany with us! We are aiming to save 200kr for this exciting adventure.' },
  { title: 'German Adventure', MoneyTarget: '200kr', description: 'Discover the charm of Germany with us! We are aiming to save 200kr for this exciting adventure.' },
  { title: 'German Adventure', MoneyTarget: '200kr', description: 'Discover the charm of Germany with us! We are aiming to save 200kr for this exciting adventure.' },
  { title: 'German Adventure', MoneyTarget: '200kr', description: 'Discover the charm of Germany with us! We are aiming to save 200kr for this exciting adventure.' }
])

const emits = defineEmits(['goToSavingGoal']);

const goToSavingGoal = () => {
  emits('goToSavingGoal');
};
</script>

<template>
  <div v-for="(savingGoal, index) in savingGoalList" :key="index" class="card bg-primary">
    <div class="card-header">
      Saving goal {{ index + 1 }}
    </div>
    <div class="card-body">
      <h5 class="card-title">{{ savingGoal.title }}</h5>
      <p class="card-text">{{ savingGoal.description }}</p>
      <a href="#" class="btn btn-light" @click="goToSavingGoal">Go to saving goal</a>
    </div>
  </div>
</template>

<style scoped>
.card-header, .card-text, .card-title {
  color: white;
}

* {
  font-weight: 600;
}

.card {
  margin-bottom: 20px;
}
</style>