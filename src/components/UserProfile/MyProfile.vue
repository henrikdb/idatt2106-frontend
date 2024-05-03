<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import {
  type BadgeDTO,
  BadgeService,
  type GoalDTO,
  GoalService,
  ItemService,
  UserService,
  type UserUpdateDTO
} from '@/api'
import handleUnknownError from '@/components/Exceptions/unkownErrorHandler'
import bannerImage from '@/assets/banners/stacked.svg'

let apiUrl = import.meta.env.VITE_APP_API_URL;
let numberOfHistory = 6;
let cardTitles = ["Spain tour", "Food waste", "Coffee", "Concert", "New book", "Pretty clothes"]
let firstname = ref();
let lastname = ref();
const imageUrl = ref(`../src/assets/userprofile.png`);
const bannerImageUrl = ref(bannerImage);


let hasHistory = ref(true)
let hasBadges = ref(false)
let hasInventory = ref(false)

const router = useRouter();
const inventory = ref([] as any);
const badges = ref<BadgeDTO[]>([]);
const backgroundName = ref("");
const points = ref(0 as any);
const streak = ref(0 as any);

let goals = ref<GoalDTO[]>([])

/**
 * Retrieves the user's goals from the server.
 * Updates the goals value with the retrieved data.
 * Sets the hasHistory value based on whether goals are present or not.
 */
async function getGoals() {
  try {
    goals.value = await GoalService.getGoals();
    hasHistory.value = goals.value.length > 0;
  } catch (error) {
    handleUnknownError(error)
    console.error("Something went wrong", error)
  }
}

/**
 * Sets up the form for displaying user profile information.
 * Retrieves user profile data including first name, last name, points, streak, profile image, inventory, and badges.
 * Populates the form fields with the retrieved data.
 * Fetches the user's inventory and badges.
 */
async function setupForm() {
  try {
    const response = await UserService.getUser();
    console.log(response.firstName)

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
    getInventory();
    getBadges();
  } catch (err) {
    handleUnknownError(err)
    console.error(err)
  }
}

/**
 * Retrieves the user's inventory from the server.
 * Updates the inventory value with the retrieved data.
 * Sets the hasInventory value based on whether inventory items are present or not.
 */
const getInventory = async () => {
  try {
    inventory.value = await ItemService.getInventory();
    hasInventory.value = inventory.value.length > 0;
  } catch (error) {
    handleUnknownError(error)
    console.log(error);
  }
}


/**
 * Retrieves the badges unlocked by the active user.
 * Updates the badges value with the retrieved data.
 * Sets the hasBadges value based on whether badges are present or not.
 */
const getBadges = async () => {
  try {
    badges.value = await BadgeService.getBadgesUnlockedByActiveUser();
    hasBadges.value = badges.value.length > 0;
  } catch (error) {
    handleUnknownError(error)
    console.log(error);
  }
}

/**
 * Updates the selected item in the UI.
 * Sets the backgroundName value with the item's name.
 *
 * @param {any} item - The selected item object.
 */
const selectItem = (item: any) => {
  try {
    backgroundName.value = item.itemName;
    let imageId = item.imageId;
    const bannerImagePayload: UserUpdateDTO = {
      bannerImage: imageId as any,
    };
    UserService.update({ requestBody: bannerImagePayload })
    if (imageId != 0) {
      bannerImageUrl.value = `${apiUrl}/api/images/${imageId}`;
    }
  } catch (error) {
    handleUnknownError(error)
    console.error(error)
  }
}

/**
 * Sets up the profile form and retrieves user goals upon component mounting.
 */
onMounted(() => {
  setupForm()
  getGoals()
})

/**
 * Redirects the user to the roadmap page.
 */
const toRoadmap = () => {
  router.push('/');
};



/**
 * Redirects the user to the update user settings page.
 */
const toUpdateUserSettings = () => {
  router.push('/settings/profile');
};
</script>

<template>
  <div class="container py-5 h-100">
    <div class="row d-flex justify-content-center align-items-center h-100">
      <div class="col 12">
        <div class="card">
          <div class="rounded-top text-white d-flex flex-row bg-primary justify-content-between flex-wrap" id="banner" :style="{
      
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
          <div class="p-3 text-black" style="background-color: #f8f9fa;">
            <div class="d-flex justify-content-end text-center py-1">
              <div style="width: 100%; display: flex; justify-content: start">
                <button data-cy="toUpdate" type="button" data-mdb-button-init data-mdb-ripple-init
                  class="btn btn-outline-primary classyButton" data-mdb-ripple-color="dark"
                  style="z-index: 1; height: 40px; margin-left: 17px" id="toUpdate" @click="toUpdateUserSettings">
                  Rediger profil
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
                    <div v-for="badge in badges" :key="badge.id"
                      class="card text-center d-flex align-items-center justify-content-center" style="width: 12rem; border: none; cursor: pointer; margin: 1rem; 
                        border: 2px solid black" data-bs-toggle="tooltip" data-bs-placement="top"
                      data-bs-custom-class="custom-tooltip" :data-bs-title="badge.criteria">
                      <img :src="apiUrl + `/api/images/${badge.imageId}`" class="card-img-top mt-2" alt="..."
                        style="width: 150px; height: 150px;" />
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
            <hr>
            <div class="row">
              <div class="col">
                <!-- Her er historikken over lagrede mål -->
                <div class="container-fluid mb-5">
                  <h1 class="mt-1 text-start history-text">Historie</h1>
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
                                <p class="card-text">{{ goals[index]['description'] }}</p>
                                <p class="card-text"><small class="text-muted">{{ goals[index]['targetAmount']
                                    }}</small>
                                </p>
                                <a href="#" class="btn  stretched-link" @click="toRoadmap"></a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div v-if="!hasHistory">
                    Ingen sparemål
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
  height: 200px;
}

@media (max-width: 980px) {
  #banner {
  height: 320px;
}
}

/*-------*/
.rounded-top {
  background-color: #00DBDE;
}

.classyButton {
  background-color: #003A58;
  border: #003A58;
  color: white;
}

.classyButton:hover {
  background-color: #003b58ec;
  border: #003A58;
}

.classyButton:active {
  background-color: #003b58d6;
  border: #003A58;
}
</style>