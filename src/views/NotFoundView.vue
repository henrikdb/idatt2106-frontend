<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col-md-12">
                <div class="error-template text-center">
                    <h1>
                        Oi!</h1>
                    <h2>
                        404 Ikke funnet</h2>
                    <div class="error-details">
                        Beklager, det har oppstått en feil. Forespurt side ikke funnet!
                    </div>
                    <div class="error-actions">
                        <Button1 button-text="Ta meg hjem" @click="home" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<script setup lang="ts">
import { useRouter } from 'vue-router';
import Button1 from '@/components/Buttons/Button1.vue';

const router = useRouter();

const home = () => {
    router.push('/');  // Assuming the root URL '/' is your home route
};
</script>


<style scoped>
.error-template {
    text-align: center;
    /* Ensures all text and inline elements within are centered */
    display: flex;
    flex-direction: column;
    align-items: center;
    /* Aligns child elements (which are block-level) centrally */
    justify-content: center;
    /* Optional: if you want vertical centering */
    margin: 2rem;
}
</style>