<script setup lang="ts">

</script>

<template>
  <div class="container">
    <!-- The userprofile and the form that will update name, email, password -->
    <div class="row">
      <div class="col-md-2 text-center">
        <img src="/src/assets/userprofile.png" class="img-fluid">
        <p class="h2">Username</p>
      </div>
      <div class="col-md-10">
        <form>
          <div class="row">
            <div class="form-group col-md-6">
              <label for="inputEmail4">First Name</label>
              <input type="text" class="form-control" id="inputFirstName" placeholder="ex: Brian">
            </div>
            <div class="form-group col-md-6">
              <label for="inputPassword4">Last Name</label>
              <input type="text" class="form-control" id="inputLastName" placeholder="ex: Cox">
            </div>
          </div>
          <div class="form-group col-md-6">
            <label for="inputAddress">Email</label>
            <input type="email" class="form-control" id="inputMail" placeholder="ex: briancox@mail.com">
          </div>
          <div class="row">
            <div class="form-group col-md-6">
              <label for="inputEmail4">Password</label>
              <input type="password" class="form-control" id="inputPassword" placeholder="Password with capital letter, number and a special character">
            </div>
            <div class="form-group col-md-6">
              <label for="inputPassword4">Confirmed Password</label>
              <input type="password" class="form-control" id="inputPasswordConfirmed" placeholder="Repeat password">
            </div>
          </div>
          <button type="submit" class="btn btn-primary">Change settings</button>
        </form>
      </div>
    </div>
    <!-- Maybe a profile-pictures here that collapses or not -->
    <div class="row">
      <div class="col">
        <p>
        <a class="btn" data-bs-toggle="collapse" href="#collapseExample" role="button" aria-expanded="false" aria-controls="collapseExample">
          Profile Pictures
        </a>
        </p>
      </div>
    </div>
    <div class="row">
      <div class="collapse" id="collapseExample">
        <div class="card card-body">
          This is the content of the user profile
        </div>
      </div>
    </div>
    <!-- Div that contains the configuration -->
    <div class="row">
      <div class="col"><p>
        <a class="btn" data-bs-toggle="collapse" href="#collapseConfiguration" role="button" aria-expanded="false" aria-controls="collapseConfiguration">
          User Configuration
        </a>
      </p></div>
    </div>
    <div class="row">
      <div class="collapse" id="collapseConfiguration">
        <div class="card card-body">
          This is the configuration of the user configuration
        </div>
      </div>
    </div>
  </div>

</template>

<style scoped>

</style>