<template>
    <div id="dropdownContainer">
        <Button class="btn btn-primary text-white leaderBoardButton">Global</Button>
        <Button class="btn btn-primary text-white leaderBoardButton">Friends</Button>
    </div>
    <main>
        <div id="leaderboard">
            <h1><img src="@/assets/items/v-buck.png" style="width: 2rem"> Total points</h1>
            <Leaderboard :leaderboard="leaderboardData" @navigateToUserProfile="navigateToUserProfile" />
        </div>
        <div id="leaderboard">
            <h1><img src="@/assets/icons/fire.png" style="width: 2rem"> Current streak</h1>
            <Leaderboard :leaderboard="leaderboardData" @navigateToUserProfile="navigateToUserProfile" />
        </div>
        <div id="leaderboard">
            <h1><img src="@/assets/icons/fire.png" style="width: 2rem"> Highest streak</h1>
            <Leaderboard :leaderboard="leaderboardData" @navigateToUserProfile="navigateToUserProfile" />
        </div>
    </main>
    <div id = "communityContainer">
        <h1>Total points earned as a community</h1>
        <h2>1000000 <img src="@/assets/items/v-buck.png" style="width: 2rem"></h2>
    </div>
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
    margin-top: 2rem;
    margin-bottom: 4rem;
    width: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    flex-wrap: wrap;
    flex-direction: row;
}

#leaderboard {
    width: 400px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-bottom: 3rem;
}

h1 {
    font-weight: 500;
    margin-bottom: 1rem;
}

#dropdownContainer {
    display: flex;
    justify-content: center;
    margin-bottom: 2rem;
    margin-top: 3rem;
}

#communityContainer {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin-bottom: 5rem;
}

.leaderBoardButton {
  padding: 1rem 4rem;
  font-weight: 700;
  border-radius: 2rem;
  margin: 1rem;
}
</style>