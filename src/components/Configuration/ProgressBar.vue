<script setup lang="ts">
const props = defineProps({
  percentage: {
    type: Number,
    default: 0
  }
})
</script>

<template>
  <div class="container">
    <div class="progress">
      <div id="configuration-progress"
           class="progress-bar progress-bar-striped bg-info progress-bar-animated"
           role="progressbar"
           :aria-valuenow="props.percentage"
           :style="{ width: Math.round(props.percentage*100) + '%' }"
           aria-valuemin="0"
           aria-valuemax="100"/>
    </div>
    <label class="row text-info font-bold display-5">{{ Math.round(props.percentage*100) + '%' }} Completed</label>
  </div>
</template>

<style scoped>
.progress {
  height: 35px;
  border-radius: 12px;
}

.row {
  justify-content: center;
}
</style>