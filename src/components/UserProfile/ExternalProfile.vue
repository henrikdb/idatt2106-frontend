<script setup lang="ts">
import {ref, onMounted} from "vue";
import { useRoute, useRouter } from "vue-router";
import { useUserInfoStore } from "@/stores/UserStore";
import {UserService, BadgeService, GoalService, type GoalDTO, type BadgeDTO, FriendService} from "@/api";
import { ItemService } from "@/api";
import handleUnknownError from '@/components/Exceptions/unkownErrorHandler'

let apiUrl = import.meta.env.VITE_APP_API_URL;
let numberOfHistory = 6;
let cardTitles = ["Spain tour", "Food waste", "Coffee", "Concert", "New book", "Pretty clothes"]
let firstname = ref();
let lastname = ref();
const imageUrl = ref(`../src/assets/userprofile.png`);

let hasHistory = ref(true)
let hasBadges = ref(false)
let hasInventory = ref(false)

const router = useRouter();
const route = useRoute();
const inventory = ref([] as any);
const badges = ref<BadgeDTO[]>([]);
const backgroundName = ref("");
const points = ref(0 as any);
const streak = ref(0 as any);


let goalName = ref('');
let goalDescription = ref('');
let targetAmount = ref('');
let targetDate = ref('');
let createdAt = ref('');
let goals = ref<GoalDTO[]>([])

async function getGoals() {
  try {
    goals.value = await GoalService.getGoals();
    console.log("number of goals: ", goals.value.length)
    console.log('The id of a goal: ', goals.value[0])
    if (goals.value.length > 0) {
      hasHistory.value = true
    } else {
      hasHistory.value = false
      console.log('No history')
    }
  }catch (error){
    handleUnknownError(error)
    console.error("Something went wrong", error)
  }
}

async function setupForm() {
  try {
    let id = route.params.id as any;
    let response = await UserService.getProfile({
      userId: id
    })

    firstname.value = response.firstName;
    lastname.value = response.lastName;
    if (response.point?.currentPoints) {
      points.value = response.point?.currentPoints;
    }
    if (response.streak?.currentStreak) {
      streak.value = response.streak?.currentStreak;
    }
    if (response.profileImage) {
      imageUrl.value = apiUrl + "/api/images/" + response.profileImage;
    }
    getInventory();
    getBadges();
  } catch (err) {
    handleUnknownError(err)
    console.error(err)
  }
}

const getInventory = async () => {
  try {
    const response = await ItemService.getInventory();
    inventory.value = response;
    if (inventory.value.length > 0) {
      hasInventory.value = true
    } else {
      hasInventory.value = false
      console.log('No history')
    }
  } catch (error) {
    handleUnknownError(error)
    console.log(error);
  }
}

const getBadges = async () => {
  try {
    const responseBadge = await BadgeService.getBadgesUnlockedByUser();
    badges.value = responseBadge;
    if (badges.value.length > 0) {
      hasBadges.value = true
    } else {
      hasBadges.value = false
      console.log('No history')
    }
  } catch (error) {
    handleUnknownError(error)
    console.log(error);
  }
}

const selectItem = (item: any) => {
  backgroundName.value = item.itemName;
  useUserInfoStore().setUserInfo({
    roadBackground: item.imageId,
  })
}

onMounted(() => {
  setupForm()
  getGoals()
})

const toRoadmap = () => {
  router.push('/');
};

const addFriend = () => {
  let id = route.params.id as any;
  const response = FriendService.addFriendRequest({ userId: id });
};

const removeFriend = () => {
  let id = route.params.id as any;
  const response = FriendService.deleteFriendOrFriendRequest({ friendId: id });
};



</script>

<template>
  <div class="container py-5 h-100">
    <div class="row d-flex justify-content-center align-items-center h-100">
      <div class="col 12">
        <div class="card">
          <div class="rounded-top text-white d-flex flex-row bg-primary" style="height:200px;" id="banner">
            <div class=" d-flex flex-column align-items-center justify-content-center">
              <img :src="imageUrl" alt="Generisk plassholderbilde" class="img-fluid img-thumbnail"
                style="width: 150px; height:150px; margin-left: 25px; margin-right: 15px;">
            </div>
              <h1 data-cy="firstname" style="display: flex; align-items: end; margin-bottom: 20px;">{{ firstname }} {{ lastname }}</h1>
          </div>
          <div class="p-3 text-black" style="background-color: #f8f9fa;">
            <div class="d-flex justify-content-end text-center py-1">
              <div style="width: 100%; display: flex; justify-content: start">
                <button  data-cy="toUpdate" type="button" data-mdb-button-init data-mdb-ripple-init class="btn btn-outline-primary"
                data-mdb-ripple-color="dark" style="z-index: 1; height: 40px; margin-left: 17px" id="toUpdate" @click="addFriend">
                Rediger profil
              </button>
            
              </div>
              <div>
                <p class="mb-1 h2" data-cy="points">{{ points }} <img src="@/assets/items/pigcoin.png" style="width: 4rem"></p>
                <p class="small text-muted mb-0">Poeng</p>
              </div>
              <div class="px-3">
                <p class="mb-1 h2" data-cy="streak">{{ streak }} <img src="@/assets/icons/fire.png" style="width: 4rem"></p>
                <p class="small text-muted mb-0">Streak</p>
              </div>
            </div>
          </div>
          <hr>
          <div class="card-body p-1 text-black">
            <div class="row">
              <div class="col">
                <div class="container-fluid">
                  <h1 class="mt-1 text-start badges-text">Lageret ditt</h1>
                  <div v-if="hasInventory" class="scrolling-wrapper-badges row flex-row flex-nowrap mt-2 pb-2 pt-2">
                    <div v-for="product in inventory" :key="product.id" class="card text-center"
                        style="width: 12rem; border: none; cursor: pointer; margin: 1rem; border: 2px solid black" @click="selectItem(product)">
                        <img :src="apiUrl + `/api/images/${product.imageId}`" class="card-img-top"
                            alt="..." />
                        <div class="card-body">
                            <h5 class="card-title">{{ product.itemName }}</h5>
                        </div>
                    </div>
                  </div>
                  <div v-else>Du har ingen ting på lageret ditt, gå til butikken for å kjøpe!</div>
                  <div v-if="backgroundName" class="text-success">You selected the background: <strong>{{ backgroundName }}!</strong></div>
                </div>
              </div>
            </div>
          </div>
          <hr>
          <div class="card-body p-1 text-black">
            <div class="row">
              <div class="col">
                <div class="container-fluid">
                  <h1 class="mt-1 text-start badges-text">Merker</h1>
                  <div v-if="hasBadges" class="scrolling-wrapper-badges row flex-row flex-nowrap mt-2 pb-2 pt-2">

                    <div v-for="badge in badges" :key="badge.id" class="card text-center"
                        style="width: 12rem; border: none; cursor: pointer; margin: 1rem; 
                        border: 2px solid black" data-bs-toggle="tooltip" data-bs-placement="top" 
                        data-bs-custom-class="custom-tooltip" :data-bs-title="badge.criteria">
                        <img :src="apiUrl + `/api/images/${badge.imageId}`" class="card-img-top"
                            alt="..." />
                        <div class="card-body">
                            <h5 class="card-title">{{ badge.badgeName }}</h5>
                        </div>
                    </div>

                  </div>
                  <div v-else>
                    Ingen merker
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

#banner {
  background-image: url('/src/assets/banners/stacked.svg');
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