<template>
    <div class="container">
        <div class="row">
            <div class="col-md-12">
                <h1>League</h1>
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
        </div>
    </div>
</template>

<script setup lang="ts">
import ShopButton from '@/components/Buttons/ShopButton.vue';
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
</style>