<script setup lang="ts">

import Button1 from '@/components/Buttons/Button1.vue'
import Budget from '@/components/Budget/BudgetBox.vue'
</script>

<template>
  <div class="container">
    <h1 class="text-center">Your Budgets</h1>
    <button1 id="createBudgetButton" button-text="Create new budget" lass="btn btn-primary" type="button" data-bs-toggle="collapse" data-bs-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample"/>

    <div class="collapse" id="collapseExample">
      <div class="container collapse-container">
        <div class="input-group row">
          <input id="collapseInput" class="col-5" type="text" placeholder="Enter name of budget">
          <button1 id="collapseButton" class="col-1" button-text="Create" data-bs-dismiss="modal"/>
        </div>
      </div>
    </div>

    <ul class="budgetContainer">
      <li><budget title="April 2024" budget="1000" expenses="908700"></budget></li>
      <li><budget title="Mai 2024" budget="1000" expenses="87"></budget></li>
      <li><budget title="Juni 2024" budget="1000" expenses="87"></budget></li>
      <li><budget title="Juli 2024" budget="1000" expenses="87"></budget></li>
      <li><budget title="August 2024" budget="1000" expenses="87"></budget></li>
      <li><budget title="September 2024" budget="1000" expenses="87"></budget></li>
      <li><budget title="Oktober 2024" budget="1000" expenses="87"></budget></li>
      <li><budget title="November 2024" budget="1000" expenses="87"></budget></li>
      <li><budget title="Desember 2024" budget="1000" expenses="87"></budget></li>
    </ul>

    <nav id="navbar" aria-label="Page navigation example">
      <ul class="pagination">
        <li class="page-item">
          <a class="page-link" href="#" aria-label="Previous">
            <span aria-hidden="true">&laquo;</span>
          </a>
        </li>
        <li class="page-item"><a class="page-link" href="#">1</a></li>
        <li class="page-item"><a class="page-link" href="#">2</a></li>
        <li class="page-item"><a class="page-link" href="#">3</a></li>
        <li class="page-item">
          <a class="page-link" href="#" aria-label="Next">
            <span aria-hidden="true">&raquo;</span>
          </a>
        </li>
      </ul>
    </nav>

  </div>

</template>

<style scoped>

.collapse-container {
  align-content: center;
  justify-content: center;
  justify-items: center;
}

.container {
  padding: 10px;
}

.budgetContainer {
  list-style: none;
  padding-left: 10px;
}

ul > li {
  margin: 10px 0;
}

#navbar {

}

</style>