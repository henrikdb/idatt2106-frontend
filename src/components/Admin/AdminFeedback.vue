<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { type FeedbackResponseDTO, UserService } from '@/api'
import handleUnknownError from '@/components/Exceptions/unkownErrorHandler'

const feedbacks = ref<FeedbackResponseDTO[]>([])

onMounted(async () => {
  try {
    feedbacks.value = await UserService.getFeedback()
    console.log(feedbacks.value)
  } catch (error) {
    handleUnknownError(error)
  }
})

const formattedDate = (dateStr?: string): string => {
  if (!dateStr) return ''
  return new Date(dateStr).toLocaleString()
}
</script>

<template>
  <div class="feedback-container">
    <h1>Feedback List</h1>
    <div class="feedback-list">
      <!-- Loop through feedback items -->
      <div class="feedback-item" v-for="feedback in feedbacks" :key="feedback.id">
        <div class="email">{{ feedback.email }}</div>
        <div class="message">{{ feedback.message }}</div>
        <div class="created-at">{{ formattedDate(feedback.createdAt) }}</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.feedback-container {
  max-width: 800px;
  margin: auto;
  padding: 20px;
}

.feedback-list {
  margin-top: 20px;
  border-top: 1px solid #ccc;
}

.feedback-item {
  padding: 10px;
  border-bottom: 1px solid #ccc;
}

.email,
.message,
.created-at {
  padding: 5px 0;
}

.email {
  font-weight: bold;
  color: #333;
}

.message {
  margin: 5px 0;
  line-height: 1.5;
  color: #666;
}

.created-at {
  font-size: 0.8rem;
  color: #999;
}
</style>
