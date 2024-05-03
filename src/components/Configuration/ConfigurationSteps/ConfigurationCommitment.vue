<script setup lang="ts">
import BaseButton from '@/components/BaseComponents/Buttons/BaseButton.vue'
import { useRouter } from 'vue-router'
import { ref } from 'vue'
import { useConfigurationStore } from '@/stores/ConfigurationStore'

const router = useRouter()

// Updates progress bar in the parent Configuration component.
const emit = defineEmits(['changeRouterEvent'])
emit('changeRouterEvent', '/commitment')

// Reactive variables for form and radio buttons.
const formRef = ref()
const lowRef = ref()
const mediumRef = ref()
const highRef = ref()
let errorMsg = ref()

/**
 * Validates the commitment form radio buttons and updates the commitment choice in the store.
 * If form validation is successful, updates the commitment choice in the store
 * and navigates to the '/experience' route. If form validation fails, displays
 * an error message prompting the user to select an option before continuing.
 */
const handleSubmit = () => {
  const form = formRef.value
  if (form.checkValidity()) {
    let choice = ''
    if (lowRef.value.checked) choice = 'LITTLE'
    else if (mediumRef.value.checked) choice = 'SOME'
    else if (highRef.value.checked) choice = 'MUCH'
    useConfigurationStore().setCommitment(choice)
    router.push('/experience')
  } else {
    errorMsg.value = 'Please select an option before continuing'
  }
}
</script>

<template>
  <div class="container">
    <h3 id="commitmentText" class="align-items-center justify-content-center">
      I hvilken grad er du villig til å gjøre endringer?
    </h3>
    <form class="btn-group-vertical" ref="formRef">
      <input
        ref="lowRef"
        type="radio"
        class="btn-check"
        name="commitment"
        id="btn-check-outlined"
        autocomplete="off"
        required
      />
      <label
        class="btn btn-outline-primary d-flex align-items-center justify-content-center"
        for="btn-check-outlined"
        >Lav</label
      >

      <input
        ref="mediumRef"
        type="radio"
        class="btn-check"
        name="commitment"
        id="btn-check2-outlined"
        autocomplete="off"
        required
      />
      <label
        class="btn btn-outline-primary d-flex align-items-center justify-content-center"
        for="btn-check2-outlined"
        >Middels</label
      >

      <input
        ref="highRef"
        type="radio"
        class="btn-check"
        name="commitment"
        id="btn-check3-outlined"
        autocomplete="off"
        required
      />
      <label
        class="btn btn-outline-primary d-flex align-items-center justify-content-center"
        for="btn-check3-outlined"
        >Høy</label
      >
    </form>
    <p class="text-danger">{{ errorMsg }}</p>
    <div class="confirm-button-container">
      <BaseButton id="confirmButton" @click="handleSubmit" button-text="Fortsett"></BaseButton>
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
