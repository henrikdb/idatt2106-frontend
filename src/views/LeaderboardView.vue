<template>
    <main>
        <div id="leaderboard">
            <h1>Ranking</h1>
            <Leaderboard :leaderboard="leaderboardData" @navigateToUserProfile="navigateToUserProfile" />
        </div>
    </main>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import Leaderboard from '@/components/LeaderboardComponents/Leaderboard.vue';

let leaderboardData = ref([]);

const router = useRouter();

async function fetchQuizData() {
    /*leaderboard(quizId).then((response) => {
        leaderboardData.value = response.data.slice(0, 10);
    }).catch((error) => {
        console.error("Failed to fetch leaderboard data:", error);
    });*/
}

const navigateToUserProfile = (userId: number) => {
    router.push({ name: 'user', params: { id: userId } });
};
</script>

<style scoped>
main {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}

#leaderboard {
    width: 60%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-bottom: 3rem;
}
</style>