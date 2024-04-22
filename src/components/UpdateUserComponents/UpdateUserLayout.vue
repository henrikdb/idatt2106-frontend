<script setup lang="ts">
import BaseInput from "@/components/InputFields/BaseInput.vue";
import {onMounted, ref} from "vue";
import {AuthenticationService, LeaderboardService, UserControllerService, type UserUpdateDTO} from "@/api";
import {useUserInfoStore} from "@/stores/UserStore";





const firstNameRef = ref()
const surnameRef = ref('')
const emailRef = ref('')
const passwordRef = ref('')
const confirmPasswordRef = ref('')
const formRef = ref()
let samePasswords = ref(true)

async function setupForm() {
  try {
    let response = await UserControllerService.getUser();
    console.log(response.firstName)

    firstNameRef.value = response.firstName;
    if (response.lastName != null) {
      surnameRef.value = response.lastName;
    }
    if (response.email != null) {
      emailRef.value = response.email
    }
  }catch (err){
    console.error(err)
  }
}



const handleFirstNameInputEvent = (newValue: any) => {
  firstNameRef.value = newValue
}


const handleSurnameInputEvent = (newValue: any) => {
  surnameRef.value = newValue
}

const handleEmailInputEvent = (newValue: any) => {
  emailRef.value = newValue
}

const handlePasswordInputEvent = (newValue: any) => {
  passwordRef.value = newValue
}

const handleConfirmPasswordInputEvent = (newValue: any) => {
  confirmPasswordRef.value = newValue
}

const handleSubmit = async () => {

  samePasswords.value = (passwordRef.value === confirmPasswordRef.value)
  console.log(samePasswords.value)
  formRef.value.classList.add("was-validated")
  const form = formRef.value;

  const updateUserPayload: UserUpdateDTO = {
    firstName: firstNameRef.value,
    lastName: surnameRef.value,
    email: emailRef.value,
    password: passwordRef.value
  };





    if (form.checkValidity()) {
      if(samePasswords.value){
        try {
          UserControllerService.update({requestBody: updateUserPayload})
          useUserInfoStore().setUserInfo({
            email: emailRef.value,
            firstname: firstNameRef.value,
            lastname: surnameRef.value,
            password: passwordRef.value
          })

        }catch (err){
          cosole.error(err)
        }
        }
    } else {
      console.log('Form is not valid');
    }

}
onMounted(()=>{
  setupForm()
})



</script>

<template>
  <div class="container">
    <!-- The userprofile and the form that will update name, email, password -->
    <div class="row">
      <div class="col-md-2 text-center">
        <img src="/src/assets/userprofile.png" class="img-fluid" alt="userprofile">
        <p class="h2">{{useUserInfoStore().getFirstName}}</p>
      </div>
      <div class="col-md-10">
        <!-- May need to deactive @submit.prevent -->
        <form ref="formRef" @submit.prevent="handleSubmit" id="newForm">
          <div class="row">
            <div class="form-group col-md-6" >
             <!-- <label for="inputFirstName" class="form-label">First Name</label>
              <input type="text" class="form-control" id="inputFirstName" placeholder="ex: Brian">-->
              <BaseInput :model-value="firstNameRef"
                  @input-change-event="handleFirstNameInputEvent"
                         id="firstNameInputChange"
                         input-id="first-name-new"
                         type="text"
                         label="First name"
                         placeholder="Enter your first name"
                         invalid-message="Please enter your first name"

              />
            </div>
            <div class="form-group col-md-6">
             <!-- <label for="inputPassword4">Last Name</label>
              <input type="text" class="form-control" id="inputLastName" placeholder="ex: Cox">-->
              <BaseInput :model-value="surnameRef"
                         @input-change-event="handleSurnameInputEvent"
                         id="surnameInput-change"
                         input-id="surname-new"
                         type="text"
                         label="Surname"
                         placeholder="Enter your surname"
                         invalid-message="Please enter your surname"
                          />
            </div>
          </div>
          <div class="form-group col-md-6">
           <!-- <label for="inputAddress">Email</label>
            <input type="email" class="form-control" id="inputMail" placeholder="ex: briancox@mail.com">-->
            <BaseInput :model-value="emailRef"
                       @input-change-event="handleEmailInputEvent"
                       id="emailInput-change"
                       input-id="email-new"
                       type="email"
                       label="Email"
                       placeholder="Enter your email"
                       invalid-message="Invalid email"
                       />
          </div>
          <div class="row">
            <div class="form-group col-md-6">
             <!-- <label for="inputPassword">Password</label>
              <input type="password" class="form-control" id="inputPassword" placeholder="Password with capital letter, number and a special character">-->
              <BaseInput :model-value="passwordRef"
                         @input-change-event="handlePasswordInputEvent"
                         id="passwordInput-change"
                         input-id="password-new"
                         type="password"
                         pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{4,16}"
                         label="Password"
                         placeholder="Enter password"
                         invalid-message="Password must be between 4 and 16 characters and contain one capital letter, small letter and a number"
                         />
            </div>
            <div class="form-group col-md-6">
             <!-- <label for="inputPasswordConfirmed">Confirmed Password</label>
              <input type="password" class="form-control" id="inputPasswordConfirmed" placeholder="Repeat password">-->
              <BaseInput :modelValue="confirmPasswordRef"
                         @input-change-event="handleConfirmPasswordInputEvent"
                         id="confirmPasswordInput-change"
                         input-id="confirmPassword-new"
                         type="password"
                         pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{4,16}"
                         label="Confirm Password"
                         placeholder="Confirm password"
                         invalid-message="Password must be between 4 and 16 characters and contain one capital letter, small letter and a number"
                         />

              <p v-if="!samePasswords" class="text-danger">The passwords are not identical</p>
            </div>
          </div>
          <button type="submit" @click="handleSubmit" class="btn btn-primary">Change settings</button>
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