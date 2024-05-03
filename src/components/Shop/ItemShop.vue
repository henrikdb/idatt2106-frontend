<template>
  <div id="background">
    <br />
    <div id="dropdownContainer">
      <h1 class="box">Butikk</h1>
      <div>
        <p class="mb-1 h2" data-cy="points">{{ points }}<img src="@/assets/items/pigcoin.png" style="width: 4rem" /></p>
      </div>
    </div>
    <div class="container d-flex justify-content-center">
      <div class="row col-md-10">
        <div class="col-md-12">
          <h1>Utvidelser</h1>
          <div class="category row mb-2 m-2">
            <div class="card text-center justify-content-center align-items-center" style="width: 8rem; border: none">
              <img src="../../assets/items/adfree.png" class="card-img-top" alt="..."
                style="width: 100px; height: 100px;" />
              <div class="card-body">
                <h5 class="card-title">Reklamefri</h5>
                <button type="button" class="btn btn-primary" id="buttonStyle" data-toggle="modal"
                  data-target="#adfreeModal">
                  +35kr
                </button>
              </div>
            </div>
            <div class="card text-center justify-content-center align-items-center" style="width: 8rem; border: none">
              <img src="../../assets/items/piggybank.webp" class="card-img-top" alt="..."
                style="width: 100px; height: 100px;" />
              <div class="card-body">
                <h5 class="card-title">Premium</h5>
                <button type="button" class="btn btn-primary" id="buttonStyle" data-toggle="modal"
                  data-target="#premiumModal">
                  +50kr
                </button>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-12">
          <h1>Banner</h1>
          <div class="category row mb-2 m-2">
            <div v-for="product in products" :key="product.id"
              class="card text-center d-flex justify-content-center align-items-center"
              style="width: 16rem; border: none">
              <img :src="apiUrl + `/api/images/${product.imageId}`" style="width: 200px; height: 100px;"
                class="card-img-top" alt="..." />
              <div class="card-body">
                <h5 class="card-title">{{ product.itemName }}</h5>
                <h6>{{ product.price }}<img src="../../assets/items/pigcoin.png" style="width: 2rem" /></h6>
                <ShopButton v-if="!product.alreadyBought" button-text="Kjøp gjennstand" :disabled="product.price > points"
                  @click="buyItem(product.id)" />
                <p v-else>Eid</p>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-12">
          <h1>Tjenester</h1>
          <div class="category row mb-2 m-2">
            <div class="card text-center d-flex justify-content-center align-items-center"
              style="width: 8rem; border: none">
              <img src="../../assets/items/coffee.jpg" class="card-img-top" alt="..."
                style="width: 100px; height: 100px;">
              <div class="card-body">
                <h5 class="card-title">Gratis kaffe</h5>
                <h6>500<img src="../../assets/items/pigcoin.png" style="width: 2rem"></h6>
                <ShopButton button-text="Kjøp gjennstand" :disabled="500 > points" @click="buySomething()" />
              </div>
            </div>
            <div class="card text-center d-flex justify-content-center align-items-center"
              style="width: 8rem; border: none">
              <img src="../../assets/items/viaplay.jpg" class="card-img-top" alt="..."
                style="width: 100px; height: 100px;">
              <div class="card-body">
                <h5 class="card-title">1 Måned</h5>
                <h6>10 000<img src="../../assets/items/pigcoin.png" style="width: 2rem"></h6>
                <ShopButton button-text="Kjøp gjennstand" :disabled="10000 > points" @click="buySomething()" />
              </div>
            </div>
            <div class="card text-center d-flex justify-content-center align-items-center"
              style="width: 8rem; border: none">
              <img src="../../assets/items/pirbad.png" class="card-img-top" alt="..."
                style="width: 100px; height: 100px;">
              <div class="card-body">
                <h5 class="card-title">-10% rabatt</h5>
                <h6>1000<img src="../../assets/items/pigcoin.png" style="width: 2rem"></h6>
                <ShopButton button-text="Kjøp gjennstand" :disabled="1000 > points" @click="buySomething()" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="modal fade" id="premiumModal" tabindex="-1" role="dialog" aria-labelledby="premiumModalLabel"
      aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="premiumModalLabel">Premium Package</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <!-- Add premium package information here -->
            <p>Unlock exclusive features with our Premium Package!</p>
            <ul>
              <li>Feature 1</li>
              <li>Feature 2</li>
              <li>Feature 3</li>
            </ul>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal for Ad-free Package -->
    <div class="modal fade" id="adfreeModal" tabindex="-1" role="dialog" aria-labelledby="adfreeModalLabel"
      aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="adfreeModalLabel">Ad-free Package</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <!-- Add ad-free package information here -->
            <p>Enjoy uninterrupted browsing with our Ad-free Package!</p>
            <ul>
              <li>No more annoying ads</li>
              <li>Fast loading times</li>
              <li>Exclusive content</li>
            </ul>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import ShopButton from '@/components/Shop/ShopButton.vue';
import { ref, onMounted } from 'vue';
import { UserService } from '@/api';
import { useUserInfoStore } from '@/stores/UserStore';
import { ItemService } from '@/api';
import handleUnknownError from '@/components/Exceptions/unkownErrorHandler';

let apiUrl = import.meta.env.VITE_APP_API_URL;
const products = ref([] as any);
const points = ref();

/**
 * Retrieves the store's products and updates the products list.
 */
const getStore = async () => {
  try {
    const response = await ItemService.getStore();
    products.value = response;
  } catch (error) {
    handleUnknownError(error);
    console.log(error);
  }
}

/**
 * Retrieves the user's current points and updates the points reference.
 */
const getPoints = async () => {
  try {
    const response = await UserService.getUser();
    points.value = response.point?.currentPoints;
  } catch (error) {
    handleUnknownError(error);
    console.log(error);
  }
}

/**
 * Buys an item with the specified item ID.
 * Sends a request to buy the item, then refreshes the store and points information.
 *
 * @param {number} itemId - The ID of the item to buy.
 */
const buyItem = async (itemId: number) => {
  try {
    await ItemService.buyItem({ itemId: itemId });
    await getStore();
    await getPoints();
  } catch (error) {
    handleUnknownError(error);
    console.log(error);
  }
}

/**
 * Buys a premium subscription for the user.
 * Sends a request to update the user's subscription level to 'PREMIUM'.
 * Updates the user's subscription level in the store.
 */
const buyPremium = async () => {
  try {
    await UserService.updateSubscriptionLevel({ subscriptionLevel: 'PREMIUM' });
    useUserInfoStore().setUserInfo({
      subscriptionLevel: 'PREMIUM',
    })
  } catch (error) {
    handleUnknownError(error);
    console.log(error);
  }
}

/**
 * Buys a subscription to remove ads for the user.
 * Sends a request to update the user's subscription level to 'NO_ADS'.
 * Updates the user's subscription level in the store.
 */
const buyNoAds = async () => {
  try {
    await UserService.updateSubscriptionLevel({ subscriptionLevel: 'NO_ADS' });
    useUserInfoStore().setUserInfo({
      subscriptionLevel: 'NO_ADS',
    })
  } catch (error) {
    handleUnknownError(error);
    console.log(error);
  }
}

/**
 * Generates a random code of the specified length.
 *
 * @param length - The length of the random code. Default is 8.
 * @returns A randomly generated code.
 */
function generateRandomCode(length = 8) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

/**
 * Buys something (dummy functionality for demonstration purposes).
 * Generates a random code and alerts the user with the code as a confirmation message.
 */
const buySomething = async () => {
  try {
    const randomCode = generateRandomCode();
    alert(`Thank you for your purchase! Your code is: ${randomCode}`);
  } catch (error) {
    handleUnknownError(error);
    console.log(error);
  }
}

onMounted(() => {
  getStore();
  getPoints();
})
</script>

<style scoped>
.card {
  box-shadow: none;
  margin: 10px;
  border-radius: 8px;
  padding-left: 5px;
  padding-right: 5px;
  height: 225px;
}

.box {
  width: 90%;
  justify-content: center;
  text-align: center;
  font-size: 5rem;
  font-weight: 700;
}

.card:hover {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.card-body {
  height: 100px;
  padding: 5px;
}

.col-md-12 {
  border-bottom: 2px solid #000000;
}

#dropdownContainer {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 2rem;
  flex-direction: column;
}

#background {}
</style>