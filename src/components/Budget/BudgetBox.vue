<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter();

const props = defineProps({
  title: {
    type: String,
    default: ''
  },
  budget: {
    type: Number,
    default: 0
  },
  expenses: {
    type: Number,
    default: 0
  }
})

let balance = props.budget - props.expenses

const iRef = ref(null)

onMounted(() => {
  if (balance >= 0) {
    iRef.value.style.backgroundColor = 'rgba(34, 231, 50, 0.43)';
  }
})

const onBudgetContainerPressed = () => {
  router.push('/budget')
}

</script>

<template>
  <div class="container-fluid row" @click="onBudgetContainerPressed">
    <div class="col-12">
      <div class="title-container">
        <h2>{{title}}</h2>
      </div>
    </div>

    <div class="col-4 budget">
      <i>
        <img src="../../assets/icons/money2.svg" width="48px" height="48px">
      </i>
      <div class="budget-container">
        <h5>{{budget}} kr</h5>
        <p>Budget</p>
      </div>
    </div>

    <div class="col-4 expenses">
      <i>
        <img src="../../assets/icons/credit-card.svg" width="48px" height="48px">
      </i>
      <div class="expenses-container">
        <h5>{{expenses}} kr</h5>
        <p>Expenses</p>
      </div>
    </div>

    <div class="col-4 balance">
      <i ref="iRef">
        <img src="../../assets/icons/scale.svg" width="48px" height="48px">
      </i>
      <div class="balance-container">
        <h5>{{balance}} kr</h5>
        <p>Balance</p>
      </div>
    </div>
  </div>
</template>

<style scoped>

.title-container, .budget-container, .expenses-container, .balance-container {
  display: grid;
  align-self: center;
}

.container-fluid {
  border: 4px solid #5959ea;
  min-height: 90px;
  border-radius: 15px;
  transition: transform 150ms ease-in-out, border 200ms ease-in-out;
  cursor: pointer;
}

.container-fluid:hover {
  border: 4px solid #0000f1;
  transform: scale(1.03);
}

h2, h5, p {
  color: black;
  align-self: center;
}

i {
  display: grid;
  justify-content: center;
  align-content: center;
  margin: 5px;
  border-radius: 7px;
}


.budget i {
  background-color: rgba(78, 107, 239, 0.43);
}

.expenses i {
  background-color: rgba(238, 191, 43, 0.43);
}

.balance i {
  background-color: rgba(232, 14, 14, 0.43);
}

div.col-4 {
  display: grid;
  grid-template-columns: 1fr 1fr;
  border-radius: 10px;
  margin: 10px 0;
}


</style>