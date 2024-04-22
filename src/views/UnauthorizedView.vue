<template>
    <body class="bg-dark text-white py-5">
        <div class="container py-5">
            <div class="row">
                <div class="col-md-2 text-center">
                    <p><img src="@/assets/icons/danger.svg"> <br/>Status Code: 403</p>
                </div>
                <div class="col-md-10">
                    <h3>OPPSSS!!!! Sorry...</h3>
                    <p>Sorry, your access is refused due to security reasons of our server and also our sensitive data.<br/>Please go back to the home page to continue browsing.</p>
                    <Button1 :button-text="'Take Me Home'" @click="home" />
                </div>
            </div>
        </div>
    </body>
</template>

<script setup lang="ts">
import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';
import Button1 from '@/components/Buttons/Button1.vue';

const router = useRouter();

const home = () => {
    router.push('/'); 
};
</script>


<style scoped>
    body {
        background-image: url('@/assets/401-error.jpg');
    }
</style>