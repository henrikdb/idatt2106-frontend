<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useUserInfoStore } from "../../stores/UserStore";
import { UserService } from "@/api";
import { ItemService } from "@/api";

let numberOfHistory = 6;
let cardTitles = ["Spain tour", "Food waste", "Coffee", "Concert", "New book", "Pretty clothes"]
let firstname = ref();
let lastname = ref();
const imageUrl = ref(`../src/assets/userprofile.png`);

const router = useRouter();
const inventory = ref([] as any);
const backgroundName = ref("");

async function setupForm() {
  try {
    const response = await UserService.getUser();
    console.log(response.firstName)

    firstname.value = response.firstName;
    lastname.value = response.lastName;
    if (response.profileImage) {
      imageUrl.value = "http://localhost:8080/api/images/" + response.profileImage;
    }
    getInventory();
  } catch (err) {
    console.error(err)
  }
}

const getInventory = async () => {
  try {
    const response = await ItemService.getInventory();
    inventory.value = response;
  } catch (error) {
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
})

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
                data-mdb-ripple-color="dark" style="z-index: 1; height: 40px; margin-left: 17px" id="toUpdate" @click="toUpdateUserSettings">
                Rediger profil
              </button>

              </div>
              <div>
                <p class="mb-1 h2" data-cy="points">253 <img src="@/assets/items/pigcoin.png" style="width: 4rem"></p>
                <p class="small text-muted mb-0">Poeng</p>
              </div>
              <div class="px-3">
                <p class="mb-1 h2" data-cy="streak">1026 <img src="@/assets/icons/fire.png" style="width: 4rem"></p>
                <p class="small text-muted mb-0">Streak</p>
              </div>
            </div>
          </div>
          <div class="card-body p-1 text-black">
            <div class="row">
              <div class="col">
                <div class="container-fluid">
                  <h1 class="mt-5 text-start badges-text">Lageret ditt</h1>
                  <div class="scrolling-wrapper-badges row flex-row flex-nowrap mt-4 pb-4 pt-2">
                    <div v-for="product in inventory" :key="product.id" class="card text-center"
                        style="width: 12rem; border: none; cursor: pointer; margin: 1rem; border: 2px solid black" @click="selectItem(product)">
                        <img :src="`http://localhost:8080/api/images/${product.imageId}`" class="card-img-top"
                            alt="..." />
                        <div class="card-body">
                            <h5 class="card-title">{{ product.itemName }}</h5>
                        </div>
                    </div>
                  </div>
                  <div v-if="backgroundName" class="text-success">You selected the background: <strong>{{ backgroundName }}!</strong></div>
                </div>
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
                                <p class="card-text">Penger spart: 200 <br />Du har fullført en utfordring: 21</p>
                                <p class="card-text"><small class="text-muted">Sist oppdatert for 3 minutter
                                    siden</small></p>
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

#banner {
  background-image: url('../src/assets/banners/stacked.svg');
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