<template>
    <body class="bg-dark text-white py-5">
        <div class="container py-5">
            <div class="row">
                <div class="col-md-2 text-center">
                    <p><img src="@/assets/icons/danger.svg" alt="fare"> <br/>Statuskode: 403</p>
                </div>
                <div class="col-md-10">
                    <h3>OOPS!!! Beklager...</h3>
                    <p>Beklager, din tilgang er nektet av sikkerhetsgrunner på serveren vår og også våre sensitive data.<br/>Vennligst gå tilbake til startsiden for å fortsette å surfe.</p>
                    <Button1 :button-text="'Ta meg hjem'" @click="home" />
                </div>
            </div>
        </div>
    </body>
</template>


<script setup lang="ts">
import { useRouter } from 'vue-router';
import Button1 from '@/components/Buttons/Button1.vue';

const router = useRouter();

const home = () => {
    router.push('/'); 
};
</script>


<style scoped>

</style>