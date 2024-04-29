<script setup lang="ts">
import BaseInput from "@/components/InputFields/BaseInput.vue";
import { onMounted, ref } from "vue";
import { AuthenticationService, LeaderboardService, UserService, type UserUpdateDTO } from "@/api";
import { useUserInfoStore } from "@/stores/UserStore";

const firstNameRef = ref()
const surnameRef = ref('')
const emailRef = ref('')
const passwordRef = ref('')
const confirmPasswordRef = ref('')
const formRef = ref()
let samePasswords = ref(true)

async function setupForm() {
  try {
    let response = await UserService.getUser();
    console.log(response.firstName)

    firstNameRef.value = response.firstName;
    if (response.lastName != null) {
      surnameRef.value = response.lastName;
    }
    if (response.email != null) {
      emailRef.value = response.email
    }
  } catch (err) {
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
  };





  if (form.checkValidity()) {
    if (samePasswords.value) {
      try {
        UserService.update({ requestBody: updateUserPayload })
        useUserInfoStore().setUserInfo({
          email: emailRef.value,
          firstname: firstNameRef.value,
          lastname: surnameRef.value,
          password: passwordRef.value
        })

      } catch (err) {
        console.error(err)
      }
    }
  } else {
    console.log('Form is not valid');
  }

}
onMounted(() => {
  setupForm()
})



</script>

<template>
  <div class="containers">
    <div class="row gutters">
      <div class="col-xl-3 col-lg-3 col-md-12 col-sm-12 col-12">
        <div class="card h-100">
          <div class="card-body">
            <div class="account-settings">
              <div class="user-profile">
                <div class="user-avatar">
                  <img src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="Maxwell Admin">
                </div>
                <div class="text-center">
                  <div class="mt-2">
                    <span class="btn btn-primary"><img src="@/assets/icons/download.svg"></span>
                  </div>
                </div>
                <br>
                <h3 class="user-name">Yuki Hayashi</h3>
                <h6 class="user-email">yuki@Maxwell.com</h6>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-xl-9 col-lg-9 col-md-12 col-sm-12 col-12">
        <div class="card h-100">
          <div class="card-body">
            <div class="row gutters">
              <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                <h6 class="mb-2 text-primary">Personal Details <img src="@/assets/icons/black_person.svg"></h6>
              </div>
              <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                <div class="form-group">
                  <BaseInput :model-value="firstNameRef" @input-change-event="handleFirstNameInputEvent"
                    id="firstNameInputChange" input-id="first-name-new" type="text" label="First name"
                    placeholder="Enter your first name" invalid-message="Please enter your first name" />
                </div>
              </div>
              <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                <div class="form-group">
                  <BaseInput :model-value="surnameRef" @input-change-event="handleSurnameInputEvent"
                    id="surnameInput-change" input-id="surname-new" type="text" label="Surname"
                    placeholder="Enter your surname" invalid-message="Please enter your surname" />

                </div>
              </div>
              <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                <div class="form-group">
                  <BaseInput :model-value="emailRef" @input-change-event="handleEmailInputEvent" id="emailInput-change"
                    input-id="email-new" type="email" label="Email" placeholder="Enter your email"
                    invalid-message="Invalid email" />

                </div>
              </div>
              <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                <div class="form-group">
                  <BaseInput :model-value="passwordRef" @input-change-event="handlePasswordInputEvent"
                    id="passwordInput-change" input-id="password-new" type="password"
                    pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{4,16}" label="Password" placeholder="Enter password"
                    invalid-message="Password must be between 4 and 16 characters and contain one capital letter, small letter and a number" />

                </div>
              </div>
            </div>

            <div class="row gutters">
              <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12" style="margin-top: 10px;">
                <h6 class="mb-2 text-primary">Personal Configuration <img src="@/assets/icons/black_person.svg"></h6>
              </div>
              <div class="accordion" id="accordionExample">
                <div class="accordion-item">
                  <h2 class="accordion-header">
                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                      data-bs-target="#collapseThree" aria-expanded="true" aria-controls="collapseThree">
                      Configuration
                    </button>
                  </h2>
                  <div id="collapseThree" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
                    <div class="accordion-body">
                      Hallo
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="row gutters">
              <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                <h6 class="mt-3 mb-2 text-primary">Styles <img src="@/assets/icons/black_paintBrush.svg"></h6>
              </div>
              <div class="accordion" id="accordionExample">
                <div class="accordion-item">
                  <h2 class="accordion-header">
                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                      data-bs-target="#collapseOne" aria-expanded="false" aria-controls="collapseOne">
                      Profile pictures
                    </button>
                  </h2>
                  <div id="collapseOne" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
                    <div class="accordion-body">
                      Hallo
                    </div>
                  </div>
                </div>
                <div class="accordion-item">
                  <h2 class="accordion-header">
                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                      data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                      Road styles
                    </button>
                  </h2>
                  <div id="collapseTwo" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
                    <div class="accordion-body">
                      Hallo
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="row gutters">
              <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                <div class="text-right">
                  <button type="button" id="submit" name="submit" class="btn btn-secondary">Cancel</button>
                  <button type="button" id="submit" name="submit" class="btn btn-primary">Update</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<style scoped>
body {
  margin: 0;
  padding-top: 40px;
  color: #2e323c;
  background: #f5f6fa;
  position: relative;
  height: 100%;
}

.row {
  margin: 0px;
}

.containers {
  width: 100%;
  justify-content: center;
  display: flex;
  align-items: center;
  margin-top: 2rem;
  margin-bottom: 4rem;
}

.account-settings .user-profile {
  margin: 0 0 1rem 0;
  padding-bottom: 1rem;
  text-align: center;
}

.account-settings .user-profile .user-avatar {
  margin: 0 0 1rem 0;
}

.account-settings .user-profile .user-avatar img {
  width: 90px;
  height: 90px;
  -webkit-border-radius: 100px;
  -moz-border-radius: 100px;
  border-radius: 100px;
}

.account-settings .user-profile h3.user-name {
  margin: 0 0 0.5rem 0;
}

.account-settings .user-profile h6.user-email {
  margin: 0;
  font-size: 0.8rem;
  font-weight: 400;
  color: #9fa8b9;
}

.account-settings .about {
  margin: 2rem 0 0 0;
  text-align: center;
}

.account-settings .about h5 {
  margin: 0 0 15px 0;
  color: #007ae1;
}

.account-settings .about p {
  font-size: 0.825rem;
}

.form-control {
  border: 1px solid #cfd1d8;
  -webkit-border-radius: 2px;
  -moz-border-radius: 2px;
  border-radius: 2px;
  font-size: .825rem;
  background: #ffffff;
  color: #2e323c;
}

.text-right {
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;
}

.card {
  background: #efefef;
  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;
  border-radius: 5px;
  border: 0;
  margin-bottom: 1rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
}
</style>