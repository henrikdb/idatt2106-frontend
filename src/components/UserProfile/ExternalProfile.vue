<script setup lang="ts">
import {ref, onMounted} from "vue";
import { useRoute, useRouter } from "vue-router";
import { useUserInfoStore } from "@/stores/UserStore";
import {UserService, BadgeService, GoalService, type GoalDTO, type BadgeDTO, FriendService} from "@/api";
import { ItemService } from "@/api";
import handleUnknownError from '@/components/Exceptions/unkownErrorHandler'
import bannerImage from '@/assets/banners/stacked.svg'

let apiUrl = import.meta.env.VITE_APP_API_URL;

let firstname = ref();
let lastname = ref();
const imageUrl = ref(`../src/assets/userprofile.png`);

const bannerImageUrl = ref(bannerImage);

let hasBadges = ref(false)
let hasInventory = ref(false)

const router = useRouter();
const route = useRoute();
const inventory = ref([] as any);
const badges = ref<BadgeDTO[]>([]);
const backgroundName = ref("");
const points = ref(0 as any);
const streak = ref(0 as any);

const isFriend = ref(false);
const isRequestSent = ref(false);

const isMe = ref(false);

/**
 * Sets up the form for displaying user profile information.
 * Retrieves user profile data including first name, last name, points, streak, profile image, inventory, and badges.
 * Populates the form fields with the retrieved data.
 * Fetches the user's inventory and badges.
 */
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
    if (response.bannerImage != 0 && response.bannerImage !== null) {
      console.log(response.bannerImage)
      bannerImageUrl.value = apiUrl + "/api/images/" + response.bannerImage;
    }
    let userId = route.params.id;
    isMe.value = String(userId) !== String(useUserInfoStore().id);
    getBadges();
  } catch (err) {
    handleUnknownError(err)
    console.error(err)
  }
}

/**
 * Checks if the current user is a friend of the user whose profile is being viewed.
 * Fetches the user's friends list and sets the isFriend value accordingly.
 */
const checkIfFriend = async () => {
  let id = route.params.id as any;
  const response = await FriendService.getFriends();
  response.forEach((friend) => {
    if (friend.id == id) {
      isFriend.value = true;
    }
  });
};

/**
 * Retrieves the user's inventory by user ID.
 * Updates the inventory value and sets the hasInventory value based on the retrieved inventory data.
 */
const getInventory = async () => {
  try {
    let id = route.params.id as any
    const response = await ItemService.getInventoryByUserId({ userId: id });
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

/**
 * Retrieves the badges unlocked by the user.
 * Updates the badges value and sets the hasBadges value based on the retrieved badge data.
 */
const getBadges = async () => {
  try {
    let id = route.params.id as any
    const responseBadge = await BadgeService.getBadgesUnlockedByUser({ userId: id });
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

onMounted(() => {
  setupForm()
  checkIfFriend()
})

const toRoadmap = () => {
  router.push('/');
};

const addFriend = () => {
  let id = route.params.id as any;
  const response = FriendService.addFriendRequest({ userId: id });
  isRequestSent.value = true;
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
          <div class="rounded-top text-white d-flex flex-row bg-primary justify-content-between" :style="{
            height: '200px',
            backgroundImage: `url(${bannerImageUrl})`,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat'
          }">
            <div class=" text-white d-flex flex-row">
              <div class=" d-flex flex-column align-items-center justify-content-center">
                <img :src="imageUrl" alt="Generisk plassholderbilde" class="img-fluid img-thumbnail"
                  style="width: 150px; height:150px; margin-left: 25px; margin-right: 15px;">
              </div>
              <h1 data-cy="firstname" style="display: flex; align-items: end; margin-bottom: 20px;">{{ firstname }} {{
            lastname }}</h1>
            </div>
            <div class="d-flex align-items-end text-white my-3 mx-5">
              <div class="d-flex align-items-center flex-column">
                <p class="mb-1 h2 d-flex flex-column align-items-center" data-cy="points"><img
                    src="@/assets/items/pigcoin.png" style="width: 80px; height: 80px" data-toggle="tooltip"
                    title="Points"> {{ points }}</p>
              </div>
              <div class="d-flex align-items-center flex-column px-3">
                <p class="mb-1 h2 d-flex flex-column align-items-center" data-cy="streak"><img
                    src="@/assets/icons/fire.png" style="width: 80px; height: 80px" data-toggle="tooltip"
                    title="Points"> {{ streak }}</p>
              </div>
            </div>
          </div>
          <div v-if="isMe" class="p-3 text-black" style="background-color: #f8f9fa;">
            <div class="d-flex justify-content-end text-center py-1">
              <div style="width: 100%; display: flex; justify-content: start">
                <button
                  v-if="!isFriend && !isRequestSent"
                  @click="addFriend"
                  class="btn btn-success mx-3"
                  style="height: 40px;"
                >
                  Legg til venn
                </button>
                <button
                  v-else-if="isRequestSent"
                  class="btn btn-secondary mx-2"
                  style="height: 40px;"
                  disabled
                >
                  Forespørsel sendt
                </button>
                <button
                  v-else
                  @click="removeFriend"
                  class="btn btn-danger mx-3"
                  style="height: 40px;"
                >
                  Fjern venn
                </button>
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