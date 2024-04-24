<template>
    <br>
    <div id="dropdownContainer">
        <h1 class="box">Shop</h1>
    </div>
    <div class="container">
        <div class="row">
            <div class="col-md-12">
                <h1>Fantacy</h1>
                <div class="category row justify-content-between mb-5 m-2">
                    <!--<div class="col-md-4" v-for="product in products" :key="product.id">-->
                    <div class="card text-center" style="width: 16rem; border: none">
                        <img src="@/assets/items/galaxy.jpg" class="card-img-top" alt="...">
                        <div class="card-body">
                            <h5 class="card-title">The panda</h5>
                            <ShopButton button-text="100"></ShopButton>
                        </div>
                    </div>
                    <div class="card text-center" style="width: 16rem; border: none">
                        <img src="@/assets/items/galaxy.jpg" class="card-img-top" alt="...">
                        <div class="card-body">
                            <h5 class="card-title">The panda</h5>
                            <ShopButton button-text="100"></ShopButton>
                        </div>
                    </div>
                    <div class="card text-center" style="width: 16rem; border: none">
                        <img src="@/assets/items/galaxy.jpg" class="card-img-top" alt="...">
                        <div class="card-body">
                            <h5 class="card-title">The panda</h5>
                            <ShopButton button-text="100"></ShopButton>
                        </div>
                    </div>
                    <div class="card text-center" style="width: 16rem; border: none">
                        <img src="@/assets/items/galaxy.jpg" class="card-img-top" alt="...">
                        <div class="card-body">
                            <h5 class="card-title">The panda</h5>
                            <ShopButton button-text="100"></ShopButton>
                        </div>
                    </div>
                    <!--</div>-->
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
            <div class="col-md-12">
                <h1>Stash</h1>
                <div class="category row justify-content-between mb-5 m-2">
                    <div class="card text-center" style="width: 16rem; border: none">
                        <img src="@/assets/items/adfree.png" class="card-img-top" alt="...">
                        <div class="card-body">
                            <h5 class="card-title">Adfree</h5>
                            <button type="button" class="btn btn-primary" id="buttonStyle"> +35kr</button>
                        </div>
                    </div> 
                    <div class="card text-center" style="width: 16rem; border: none">
                        <img src="@/assets/items/piggybank.webp" class="card-img-top" alt="...">
                        <div class="card-body">
                            <h5 class="card-title">Premium</h5>
                            <button type="button" class="btn btn-primary" id="buttonStyle">+50kr</button>
                        </div>
                    </div> 
                </div>
            </div>

        </div>
    </div>
</template>

<script setup lang="ts">
import ShopButton from '/src/components/Buttons/ShopButton.vue';
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
    width:90%;
}

.card:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.card-body{
    height: 100px;
    padding: 5px;
}

.col-md-12 {
    border-bottom: 2px solid #000000;
}

#dropdownContainer {
    display: flex;
    justify-content: center;
    margin-bottom: 2rem;
}
</style>