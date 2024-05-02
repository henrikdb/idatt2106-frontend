<template>
    <div id="background">
        <br>
    <div id="dropdownContainer">
        <h1 class="box">Butikk</h1>
    </div>
    <div class="container d-flex justify-content-center">
        <div class="row col-md-10">
            <div class="col-md-12">
                <h1>Stash</h1>
                <div class="category row justify-content-between mb-5 m-2">
                    <div class="card text-center" style="width: 16rem; border: none">
                        <img src="@/assets/items/adfree.png" class="card-img-top" alt="...">
                        <div class="card-body">
                            <h5 class="card-title">Adfree</h5>
                            <button type="button" class="btn btn-primary" id="buttonStyle" @click="buyNoAds">
                                +35kr</button>
                        </div>
                    </div>
                    <div class="card text-center" style="width: 16rem; border: none">
                        <img src="@/assets/items/piggybank.webp" class="card-img-top" alt="...">
                        <div class="card-body">
                            <h5 class="card-title">Premium</h5>
                            <button type="button" class="btn btn-primary" id="buttonStyle"
                                @click="buyPremium">+50kr</button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-12">
                <h1>Items</h1>
                <div class="category row justify-content-between mb-5 m-2">
                    <div v-for="product in products" :key="product.id" class="card text-center"
                        style="width: 16rem; border: none">
                        <img :src="`http://localhost:8080/api/images/${product.imageId}`" class="card-img-top"
                            alt="..." />
                        <div class="card-body">
                            <h5 class="card-title">{{ product.itemName }}</h5>
                            <ShopButton v-if="!product.alreadyBought" :button-text="product.price"
                                @click="buyItem(product.id)"></ShopButton>
                            <p v-else>Owned</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-12">
                <h1>Stash</h1>
                <div class="category row justify-content-between mb-5 m-2">
                    <div class="card text-center" style="width: 16rem; border: none">
                        <img src="@/assets/items/coffee.jpg" class="card-img-top" alt="...">
                        <div class="card-body">
                            <h5 class="card-title">Free Coffee</h5>
                            <ShopButton button-text="500"></ShopButton>
                        </div>
                    </div>
                    <div class="card text-center" style="width: 16rem; border: none">
                        <img src="@/assets/items/viaplay.jpg" class="card-img-top" alt="...">
                        <div class="card-body">
                            <h5 class="card-title">1 Month Viaplay</h5>
                            <ShopButton button-text="10000"></ShopButton>
                        </div>
                    </div>
                    <div class="card text-center" style="width: 16rem; border: none">
                        <img src="@/assets/items/pirbad.png" class="card-img-top" alt="...">
                        <div class="card-body">
                            <h5 class="card-title">-10% rabatt</h5>
                            <ShopButton button-text="1000"></ShopButton>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>
    </div>
</template>

<script setup lang="ts">
import ShopButton from '@/components/Buttons/ShopButton.vue';
import { ref, onMounted } from 'vue';
import { UserService } from '@/api';
import { useUserInfoStore } from '@/stores/UserStore';
import { ItemService } from '@/api';

const products = ref([] as any);

const getStore = async () => {
    const response = await ItemService.getStore();
    products.value = response;
    console.log(response);
}

const buyItem = async (itemId: number) => {
    try {
        const response = await ItemService.buyItem({ itemId: itemId });
        console.log(response);
        const responseStore = await ItemService.getStore();
        products.value = responseStore;
    } catch (error) {
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
        console.log(error);
    }
}

onMounted(() => {
    getStore();
})
</script>

<style scoped>
.card {
    box-shadow: none;
    margin: 10px;
    border-radius: 8px;
    padding-left: 5px;
    padding-right: 5px;
    /* Rounded corners */
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
}

#background {
}
</style>