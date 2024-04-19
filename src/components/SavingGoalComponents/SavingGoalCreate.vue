<script setup lang="ts">

</script>

<template>
  <div class="col-lg-8">
    <h1>Create a new saving goal!</h1>
    <br>
    <p>Create a name for this saving goal: </p>
    <div class="input-group mb-3">
      <span class="input-group-text" id="basic-addon1">Name:</span>
      <input type="text" class="form-control" placeholder="Name of Saving Goal" aria-label="Username" aria-describedby="basic-addon1">
    </div>

    <p>Add a description to this saving goal: </p>
    <div class="input-group mb-3">
      <span class="input-group-text" id="basic-addon2">Description:</span>
      <textarea class="form-control" aria-label="With textarea"></textarea>
    </div>

    <!--Change this to date picker?-->
    <p>When should this saving goal end?:</p>
    <div class="input-group mb-3">
      <input type="date" class="form-control" aria-label="Amount of days" placeholder="Amount of days (as number)">
    </div>

    <p>How much do you want to save during this saving goal: </p>
    <div class="input-group">
      <input type="text" class="form-control" aria-label="" placeholder="NOK (as number)">
      <span class="input-group-text">NOK</span>
    </div>

    <br>
    <button class="btn btn-primary btn-lg">Create goal!</button>
  </div>
</template>

<style scoped>
.col-lg-8 {
  width: 63%;
  margin-top: 50px;
}
</style>