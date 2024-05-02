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
            <h1>Stash</h1>
            <div class="category row mb-2 m-2">
              <div class="card text-center justify-content-center align-items-center" style="width: 8rem; border: none">
                <img src="../../assets/items/adfree.png" class="card-img-top" alt="..." style="width: 100px; height: 100px;" />
                <div class="card-body">
                  <h5 class="card-title">Adfree</h5>
                  <button type="button" class="btn btn-primary" id="buttonStyle" @click="buyNoAds">
                    +35kr
                  </button>
                </div>
              </div>
              <div class="card text-center justify-content-center align-items-center" style="width: 8rem; border: none">
                <img src="../../assets/items/piggybank.webp" class="card-img-top" alt="..." style="width: 100px; height: 100px;" />
                <div class="card-body">
                  <h5 class="card-title">Premium</h5>
                  <button type="button" class="btn btn-primary" id="buttonStyle" @click="buyPremium">
                    +50kr
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-12">
            <h1>Items</h1>
            <div class="category row mb-2 m-2">
              <div v-for="product in products" :key="product.id" class="card text-center d-flex justify-content-center align-items-center"
                   style="width: 8rem; border: none">
                <img :src="`http://localhost:8080/api/images/${product.imageId}`" style="width: 100px; height: 100px;" class="card-img-top" alt="..." />
                <div class="card-body">
                  <h5 class="card-title">{{ product.itemName }}</h5>
                  <h6>{{ product.price }}<img src="../../assets/items/pigcoin.png" style="width: 2rem" /></h6>
                  <ShopButton
                    v-if="!product.alreadyBought"
                    button-text="Buy item"
                    :disabled="product.price > points"
                    @click="buyItem(product.id)"
                  />
                  <p v-else>Owned</p>
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-12">
                <h1>Cool items</h1>
                <div class="category row mb-2 m-2">
                    <div class="card text-center d-flex justify-content-center align-items-center" style="width: 8rem; border: none">
                        <img src="../../assets/items/coffee.jpg" class="card-img-top" alt="..." style="width: 100px; height: 100px;">
                        <div class="card-body">
                            <h5 class="card-title">Free Coffee</h5>
                            <h6>500<img src="../../assets/items/pigcoin.png" style="width: 2rem"></h6>
                            <ShopButton
                    button-text="Buy item"
                    :disabled="500 > points"
                    @click="buySomething()"
                  />
                        </div>
                    </div>
                    <div class="card text-center d-flex justify-content-center align-items-center" style="width: 8rem; border: none">
                        <img src="../../assets/items/viaplay.jpg" class="card-img-top" alt="..." style="width: 100px; height: 100px;">
                        <div class="card-body">
                            <h5 class="card-title">1 Month</h5>
                            <h6>10 000<img src="../../assets/items/pigcoin.png" style="width: 2rem"></h6>
                            <ShopButton
                    button-text="Buy item"
                    :disabled="10000 > points"
                    @click="buySomething()"
                  />
                        </div>
                    </div>
                    <div class="card text-center d-flex justify-content-center align-items-center" style="width: 8rem; border: none">
                        <img src="../../assets/items/pirbad.png" class="card-img-top" alt="..." style="width: 100px; height: 100px;">
                        <div class="card-body">
                            <h5 class="card-title">-10% rabatt</h5>
                            <h6>1000<img src="../../assets/items/pigcoin.png" style="width: 2rem"></h6>
                            <ShopButton
                    button-text="Buy item"
                    :disabled="1000 > points"
                    @click="buySomething()"
                  />
                        </div>
                    </div>
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
  
  const products = ref([] as any);
  const points = ref();
  
  const getStore = async () => {
    try {
      const response = await ItemService.getStore();
      products.value = response;
    } catch (error) {
      handleUnknownError(error);
      console.log(error);
    }
  }
  
  const getPoints = async () => {
    try {
      const response = await UserService.getUser();
      points.value = response.point?.currentPoints;
    } catch (error) {
      handleUnknownError(error);
      console.log(error);
    }
  }
  
  const buyItem = async (itemId: number) => {
    try {
      const response = await ItemService.buyItem({ itemId: itemId });
      console.log(response);
      getStore();
      getPoints();
    } catch (error) {
      handleUnknownError(error);
      console.log(error);
    }
  }
  
  const buyPremium = async () => {
    try {
      const response = await UserService.updateSubscriptionLevel({ subscriptionLevel: 'PREMIUM' });
      useUserInfoStore().setUserInfo({
        subscriptionLevel: 'PREMIUM',
      })
    } catch (error) {
      handleUnknownError(error);
      console.log(error);
    }
  }
  
  const buyNoAds = async () => {
    try {
      const response = await UserService.updateSubscriptionLevel({ subscriptionLevel: 'NO_ADS' });
      useUserInfoStore().setUserInfo({
        subscriptionLevel: 'NO_ADS',
      })
    } catch (error) {
      handleUnknownError(error);
      console.log(error);
    }
  }

  //Just a random code generator for the feature's sake
  function generateRandomCode(length = 8) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

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

#background {
}
</style>