<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useUserInfoStore } from "../../stores/UserStore";

let numberOfHistory = 6;

let cardTitles = ["Spain tour", "Food waste", "Coffee", "Concert", "New book", "Pretty clothes"]

let firstname = ref("");
let lastname = ref("");
let imageID = ref(12)
const imageUrl = ref(`http://localhost:8080/api/images/${imageID.value}`);


const router = useRouter();
const userStore = useUserInfoStore();
firstname.value = userStore.firstname;
lastname.value = userStore.lastname;


const toRoadmap = () => {
  router.push('/');
};

// Function to navigate to update user settings
const toUpdateUserSettings = () => {
  router.push('/settings/profile');
};
</script>

<template>
  <div class="container py-5 h-100">
    <div class="row d-flex justify-content-center align-items-center h-100">
      <div class="col 12">
        <div class="card">
          <div class="rounded-top text-white d-flex flex-row bg-primary" style="height:200px;">
            <div class="ms-4 mt-5 d-flex flex-column" style="width: 150px;">
              <img :src="imageUrl" alt="Generic placeholder image"
                class="img-fluid img-thumbnail mt-4 mb-2" style="width: 150px; z-index: 1">
              <button type="button" data-mdb-button-init data-mdb-ripple-init class="btn btn-outline-primary"
                data-mdb-ripple-color="dark" style="z-index: 1;" id="toUpdate" @click="toUpdateUserSettings">
                Edit profile
              </button>
            </div>
            <div class="ms-3" style="margin-top: 130px;">
              <h1>{{ firstname }} {{ lastname }}</h1>
            </div>
          </div>
          <div class="p-4 text-black" style="background-color: #f8f9fa;">
            <div class="d-flex justify-content-end text-center py-1">
              <div>
                <p class="mb-1 h2">253 <img src="@/assets/items/pigcoin.png" style="width: 4rem"></p>
                <p class="small text-muted mb-0">Points</p>
              </div>
              <div class="px-3">
                <p class="mb-1 h2">1026 <img src="@/assets/icons/fire.png" style="width: 4rem"></p>
                <p class="small text-muted mb-0">Streak</p>
              </div>
            </div>
          </div>
          <div class="card-body p-1 text-black">
            <div class="row">
              <div class="col">
                <div class="container-fluid">
                  <h1 class="mt-5 text-start badges-text">Badges</h1>
                  <div class="scrolling-wrapper-badges row flex-row flex-nowrap mt-4 pb-4 pt-2">

                    <div class="col-5">
                      <div class="card badges-block card-1"></div>
                    </div>
                    <div class="col-5">
                      <div class="card badges-block card-2"></div>
                    </div>
                    <div class="col-5">
                      <div class="card badges-block card-3"></div>
                    </div>
                    <div class="col-5">
                      <div class="card badges-block card-4"></div>
                    </div>
                    <div class="col-5">
                      <div class="card badges-block card-5"></div>
                    </div>
                    <div class="col-5">
                      <div class="card badges-block card-6"></div>
                    </div>
                    <div class="col-5">
                      <div class="card badges-block card-7"></div>
                    </div>
                    <div class="col-5">
                      <div class="card badges-block card-8"></div>
                    </div>
                    <div class="col-5">
                      <div class="card badges-block card-9"></div>
                    </div>
                    <div class="col-5">
                      <div class="card badges-block card-10"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col">
                <!-- Here is the history of saving target -->
                <div class="container-fluid mb-5">
                  <h1 class="mt-5 text-start history-text">History</h1>
                  <div class="row scrolling-wrapper-history">
                    <div v-for="index in numberOfHistory" :key="index"
                      class="col-md-4 col-sm-4 col-lg-4 col-xs-4 col-xl-4 control-label">
                      <div class="card history-block">
                        <div class="card mb-3" style="max-width: 540px;">
                          <div class="row g-0">
                            <div class="col-md-4">
                              <img src="/src/assets/icons/piggybank.svg"
                                class="img-fluid rounded-start h-40 mx-auto d-none d-md-block" alt="...">
                            </div>
                            <div class="col-md-8">
                              <div class="card-body">
                                <h5 class="card-title">{{ cardTitles[index - 1] }}</h5>
                                <p class="card-text">Money saved: 200 <br />You are one challenge: 21</p>
                                <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
                                <a href="#" class="btn  stretched-link" @click="toRoadmap"></a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

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
.scrolling-wrapper-badges {
  overflow-x: auto;
}

.scrolling-wrapper-history {
  max-height: 300px;
  overflow: auto;
}



.badges-text {
  font-weight: 500;
  font-size: 2.0em;
}

.history-text {
  font-weight: 500;
  font-size: 2.0em;
}

.badges-block {
  height: 200px;
  background-color: #fff;
  border: none;
  background-position: center;
  background-size: cover;
  transition: all 0.2s ease-in-out !important;
  border-radius: 24px;

  &:hover {
    transform: translateY(-5px);
    box-shadow: none;
    opacity: 0.9;
  }
}

.history-block {
  height: 200px;

  background-color: #fff;
  border: none;
  background-position: center;
  background-size: cover;
  transition: all 0.2s ease-in-out !important;
  border-radius: 24px;
  margin: 20px;

  &:hover {
    transform: translateY(-5px);
    box-shadow: none;
    opacity: 0.9;
  }
}

.card-1 {
  background-color: #4158D0;
  background-image: linear-gradient(43deg, #4158D0 0%, #C850C0 46%, #FFCC70 100%);
}

.card-2 {
  background-color: #0093E9;
  background-image: linear-gradient(160deg, #0093E9 0%, #80D0C7 100%);
}

.card-3 {
  background-color: #00DBDE;
  background-image: linear-gradient(90deg, #00DBDE 0%, #FC00FF 100%);
}

.card-4 {
  background-color: #FBAB7E;
  background-image: linear-gradient(62deg, #FBAB7E 0%, #F7CE68 100%);
}

.card-5 {
  background-color: #85FFBD;
  background-image: linear-gradient(45deg, #85FFBD 0%, #FFFB7D 100%);
}

.card-6 {
  background-color: #FA8BFF;
  background-image: linear-gradient(45deg, #FA8BFF 0%, #2BD2FF 52%, #2BFF88 90%);
}

.card-7 {
  background-color: #FA8BFF;
  background-image: linear-gradient(45deg, #FA8BFF 0%, #2BD2FF 52%, #2BFF88 90%);
}

.card-8 {
  background-color: #FBDA61;
  background-image: linear-gradient(45deg, #FBDA61 0%, #FF5ACD 100%);
}

.card-9 {
  background-color: #4158D0;
  background-image: linear-gradient(43deg, #4158D0 0%, #C850C0 46%, #FFCC70 100%);
}

.card-10 {
  background-color: #FF3CAC;
  background-image: linear-gradient(225deg, #FF3CAC 0%, #784BA0 50%, #2B86C5 100%);

}


/*-------*/
.rounded-top {
  background-color: #00DBDE;
}
</style>