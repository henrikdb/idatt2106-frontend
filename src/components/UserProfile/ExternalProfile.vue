<script setup lang="ts">
import {useRoute, useRouter} from "vue-router";

import {onMounted, type Ref, ref, type UnwrapRef} from "vue";
import {UserService, type ProfileDTO, GoalService, type GoalDTO} from "@/api";

let numberOfHistory = 6;

let cardTitles = ["Spain tour", "Food waste", "Coffee", "Concert", "New book", "Pretty clothes"]


let hasHistory = ref(true)
let firstname = ref();
let lastname = ref();
let goals = ref<GoalDTO[]>([]);

let username = ref()

let friend = ref(false)

let profile: ProfileDTO;


const imageUrl = ref(`../src/assets/userprofile.png`);


let id = ref()

//Get the id from the url. viktor har eksempel

let user = useRoute()
id.value = user.params
console.log(id.value.id)


let route = useRouter()

function toRoadmap(){
  route.push('/roadmap')
}
//todo Make a store of a friend-instance
onMounted(async () => {
  try {
    let response = await UserService.getProfile({
      userId: id.value.id
    })
    profile = response;
    console.log(profile)
    username.value = profile.firstName
    if (profile.profileImage){
      imageUrl.value = `http://localhost:8080/api/images/${profile.profileImage}`
    }
    console.log(username)
  } catch (error) {
    console.error("Something went wrong getting the profile: ", error)
  }
})

function addFriend() {
  friend.value = true
  console.log("Added friend")

}
async function getGoals() {
  try {
    goals.value = await GoalService.getGoals();
    console.log("number of goals: ", goals.value.length)
    if (goals.value.length > 0) {
      hasHistory.value = true
    } else {
      hasHistory.value = false
      console.log('No history')
    }
  }catch (error){
    console.error("Something went wrong getting the goals: " , error)
  }
}



// Function to navigate to update user settings


  //todo Send POST to backend when endpoints is made and add friend


function removeFriend(){
  friend.value = false
  console.log("Removed friend")

  //todo Send POST to backend when endpoints is made and remove friend

}

onMounted(() =>{
  getGoals()
})

</script>


<template>
  <div class="container py-5 h-100">
    <div class="row d-flex justify-content-center align-items-center h-100">
      <div class="col 12">
        <div class="card">
          <div class="rounded-top text-white d-flex flex-row bg-primary" style="height:200px;">
            <div class="ms-4 mt-5 d-flex flex-column" style="width: 150px;">
              <img :src="imageUrl" alt="Generisk plassholderbilde"
                   class="img-fluid img-thumbnail mt-4 mb-2" style="width: 150px; z-index: 1">
              <button v-if="!friend" type="button" data-mdb-button-init data-mdb-ripple-init class="btn btn-outline-primary"
                      data-mdb-ripple-color="dark" style="z-index: 1;" @click="addFriend">
                Legg til venn
              </button>
              <button v-if="friend" type="button" data-mdb-button-init data-mdb-ripple-init class="btn btn-outline-danger"
                      data-mdb-ripple-color="dark" style="z-index: 1;" @click="removeFriend">
                Fjern venn
              </button>
            </div>
            <div class="ms-3" style="margin-top: 130px;">
              <h1>{{username}}</h1>
            </div>
          </div>
          <div class="p-4 text-black" style="background-color: #f8f9fa;">
            <div class="d-flex justify-content-end text-center py-1">
              <div>
                <p class="mb-1 h2">253 <img src="@/assets/items/pigcoin.png" style="width: 4rem"></p>
                <p class="small text-muted mb-0">Poeng</p>
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
                  <h1 class="mt-5 text-start badges-text">Merker</h1>
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
                <!-- Her er historikken over lagrede mål -->
                <div class="container-fluid mb-5">
                  <h1 class="mt-5 text-start history-text">Historie</h1>
                  <div v-if="hasHistory" class="row scrolling-wrapper-history">
                    <div v-for="(item, index) in goals" :key="index"
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
                                <h5 class="card-title">{{ goals[index]['name'] }}</h5>
                                <p class="card-text">{{goals[index]['description']}}</p>
                                <p class="card-text"><small class="text-muted">{{goals[index]['targetAmount']}}</small></p>
                                <a href="#" class="btn  stretched-link" @click="toRoadmap"></a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div v-if="!hasHistory">No History!</div>

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