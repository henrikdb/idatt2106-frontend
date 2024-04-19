<script setup lang="ts">
import Button1 from '@/components/Buttons/Button1.vue'
import { useRouter } from 'vue-router'
import { ref } from 'vue'

const formRef = ref()
const bankIDRef = ref(false)
const minIdRef = ref(false)
const vippsRef = ref(false)


const router = useRouter();
const emit = defineEmits(['changeRouterEvent', 'bankIdSelectedEvent']);
emit('changeRouterEvent', '/bank-id');

const onClick = () => {
  const radios = formRef.value.querySelectorAll('input[type="radio"]');
  const checkedRadios = Array.from(radios).filter(radio => radio.checked);

  if (checkedRadios.length === 0) {
    alert('Please select an option.');
    return;
  }

  let choice = ''
  if (bankIDRef.value.checked) choice = 'BankId på mobil'
  else if (minIdRef.value.checked) choice = 'MinId'
  else if (vippsRef.value.checked) choice = 'Vipps'

  emit('bankIdSelectedEvent', choice)
  router.push('/commitment')
}

</script>

<template>
  <div class="container">
    <div>
      <h3 class="d-flex align-items-center justify-content-center">
        In order to provide best advice we need to connect to your bank account
      </h3>
    </div>

    <form class="btn-group-vertical" ref="formRef" @submit.prevent="onClick">

      <input ref="bankIDRef" type="radio" class="btn-check" name="bank-id" id="btn-check-outlined" autocomplete="off">
      <label class="btn btn-outline-primary d-flex align-items-center justify-content-center" for="btn-check-outlined">BankID på mobil</label>

      <input ref="minIdRef" type="radio" class="btn-check" name="bank-id" id="btn-check2-outlined" autocomplete="off">
      <label class="btn btn-outline-primary d-flex align-items-center justify-content-center" for="btn-check2-outlined">MinID</label>

      <input ref="vippsRef" type="radio" class="btn-check" name="bank-id" id="btn-check3-outlined" autocomplete="off">
      <label class="btn btn-outline-primary d-flex align-items-center justify-content-center" for="btn-check3-outlined">Vipps</label>

    </form>

    <div class="confirm-button-container">
      <button1 id="confirmButton"
               @click="onClick"
               button-text="Continue">
      </button1>
    </div>

  </div>
</template>

<style scoped>
#confirmButton {
  margin-bottom: 2rem;
  width: 300px;
}

.confirm-button-container {
  display: flex;
  justify-content: center;
}
</style>