<script setup lang="ts">
import Button1 from '@/components/Buttons/Button1.vue'
import { useRouter } from 'vue-router'
import { ref } from 'vue'
import { useConfigurationStore } from '@/stores/ConfigurationStore'

const router = useRouter();

// Updates progress bar in the parent Configuration component.
const emit = defineEmits(['changeRouterEvent'])
emit('changeRouterEvent', '/experience')

// Declaration of reactive variables for the form and radio buttons
const formRef = ref()
const beginnerRef = ref('')
const someExperienceRef = ref('')
const expertRef = ref('')
let errorMsg = ref('');

/**
 * Validates the experience form radio buttons and updates the commitment choice in the store.
 * If form validation is successful, updates the commitment choice in the store
 * and navigates to the '/suitable challenges' route. If form validation fails, displays
 * an error message prompting the user to select an option before continuing.
 */
const onClick = () => {
  const form = formRef.value;
  if (form.checkValidity()) {
    let choice = ''
    if (beginnerRef.value.checked) choice = 'NONE'
    else if (someExperienceRef.value.checked) choice = 'SOME'
    else if (expertRef.value.checked) choice = 'EXPERT'
    useConfigurationStore().setExperience(choice)
    router.push('/suitable-challenges')
  }
  else {
    errorMsg.value = 'Please select an option before continuing'
  }
}

</script>

<template>
  <div class="container">
    <div>
      <h3 class="d-flex align-items-center justify-content-center">
        How much experience do you have with saving money?
      </h3>
    </div>

    <form class="btn-group-vertical" ref="formRef" @submit.prevent="onClick">

      <input ref="beginnerRef" type="radio" class="btn-check" name="experience" id="btn-check-outlined" autocomplete="off" required>
      <label class="btn btn-outline-primary d-flex align-items-center justify-content-center" for="btn-check-outlined">Beginner</label>

      <input ref="someExperienceRef" type="radio" class="btn-check" name="experience" id="btn-check2-outlined" autocomplete="off" required>
      <label class="btn btn-outline-primary d-flex align-items-center justify-content-center" for="btn-check2-outlined">Some experience</label>

      <input ref="expertRef" type="radio" class="btn-check" name="experience" id="btn-check3-outlined" autocomplete="off" required>
      <label class="btn btn-outline-primary d-flex align-items-center justify-content-center" for="btn-check3-outlined">Expert</label>
    </form>
    <p class="text-danger">{{ errorMsg }}</p>
    <div class="confirm-button-container">
      <button1 id="confirmButton" @click="onClick" button-text="Continue"></button1>
    </div>
</div>
</template>

<style scoped>
div.container {
  display: flex;
  flex-direction: column;
  justify-self: center;
  max-width: 500px;
}

#confirmButton {
  margin-bottom: 2rem;
  width: 300px;
}

.confirm-button-container {
  display: flex;
  justify-content: center;
}
</style>