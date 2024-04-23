<template>
    <br>
    <div id="dropdownContainer">
        <h1 class="box">Leaderboard</h1>
    </div>
    <div id = "content">
        <div id="dropdownContainer">
        <div class="box">
            <div class="btn-group-vertical" id="radioContainer" role="group"
            aria-label="Vertical radio toggle button group">
            <input type="radio" class="btn-check" name="vbtn-radio" id="vbtn-radio1" autocomplete="off" checked>
            <label class="btn btn-outline-primary" for="vbtn-radio1" @click="global"><img src="@/assets/globe.png" style="width: 60px">  Global</label>
            <input type="radio" class="btn-check" name="vbtn-radio" id="vbtn-radio2" autocomplete="off">
            <label class="btn btn-outline-primary" for="vbtn-radio2" @click="friends"><img src="@/assets/friends.png" style="width: 60px">  Friends</label>
        </div>
        </div>
    </div>
    <main>
        <div id="leaderboard">
            <h1><img src="@/assets/items/v-buck.png" style="width: 2rem"> Total points</h1>
            <Leaderboard :leaderboard="pointsLeaderboardData" :leaderboardExtra="pointsLeaderboardDataExtra" @navigateToUserProfile="navigateToUserProfile" />
        </div>
        <div id="leaderboard">
            <h1><img src="@/assets/icons/fire.png" style="width: 2rem"> Current streak</h1>
            <Leaderboard :leaderboard="currentLeaderboardData" :leaderboardExtra="currentLeaderboardDataExtra" @navigateToUserProfile="navigateToUserProfile" />
        </div>
        <div id="leaderboard">
            <h1><img src="@/assets/icons/fire.png" style="width: 2rem"> Highest streak</h1>
            <Leaderboard :leaderboard="streakLeaderboardData" :leaderboardExtra="streakLeaderboardDataExtra" @navigateToUserProfile="navigateToUserProfile" />
        </div>
    </main>
    </div>
    <div id="communityContainer">
        <h1>Total points earned as a community</h1>
        <h2>1000000 <img src="@/assets/items/v-buck.png" style="width: 2rem"></h2>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import Leaderboard from '@/components/LeaderboardComponents/Leaderboard.vue';
import { on } from 'events';
import { LeaderboardService, UserControllerService } from '@/api';

let streakLeaderboardData = ref([]);
let currentLeaderboardData = ref([]);
let pointsLeaderboardData = ref([]);

let streakLeaderboardDataExtra = ref([]);
let currentLeaderboardDataExtra = ref([]);
let pointsLeaderboardDataExtra = ref([]);

const router = useRouter();

async function fetchQuizData() {
    global();
}

onMounted(() => {
    fetchQuizData();
});

async function global() {
    let globalPoints = await LeaderboardService.getLeaderboard({
        type: "TOTAL_POINTS",
        filter: "GLOBAL",
    });
    let globalStreak = await LeaderboardService.getLeaderboard({
        type: "TOP_STREAK",
        filter: "GLOBAL",
    });
    let globalCurrentStreak = await LeaderboardService.getLeaderboard({
        type: "CURRENT_STREAK",
        filter: "GLOBAL",
    });
    let globalPointsYou = await LeaderboardService.getSurrounding({
        type: "TOTAL_POINTS",
        filter: "GLOBAL",
        entryCount: 1,
    });
    let globalStreakYou = await LeaderboardService.getSurrounding({
        type: "TOP_STREAK",
        filter: "GLOBAL",
        entryCount: 1,
    });
    let globalCurrentStreakYou = await LeaderboardService.getSurrounding({
        type: "CURRENT_STREAK",
        filter: "GLOBAL",
        entryCount: 1,
    });
    
    pointsLeaderboardData.value = globalPoints.entries;
    currentLeaderboardData.value = globalCurrentStreak.entries;
    streakLeaderboardData.value = globalStreak.entries;

    pointsLeaderboardDataExtra.value = globalPointsYou.entries;
    currentLeaderboardDataExtra.value = globalCurrentStreakYou.entries;
    streakLeaderboardDataExtra.value = globalStreakYou.entries;

    console.log(pointsLeaderboardDataExtra.value);
}

async function friends() {
    let friendsPoints = await LeaderboardService.getLeaderboard({
        type: "TOTAL_POINTS",
        filter: "FRIENDS",
    });
    let friendsStreak = await LeaderboardService.getLeaderboard({
        type: "TOP_STREAK",
        filter: "FRIENDS",
    });
    let friendsCurrentStreak = await LeaderboardService.getLeaderboard({
        type: "CURRENT_STREAK",
        filter: "FRIENDS",
    });
    let friendsPointsYou = await LeaderboardService.getSurrounding({
        type: "TOTAL_POINTS",
        filter: "FRIENDS",
        entryCount: 3,
    });
    let friendsStreakYou = await LeaderboardService.getSurrounding({
        type: "TOP_STREAK",
        filter: "FRIENDS",
        entryCount: 3,
    });
    let friendsCurrentStreakYou = await LeaderboardService.getSurrounding({
        type: "CURRENT_STREAK",
        filter: "FRIENDS",
        entryCount: 3,
    });


    pointsLeaderboardData.value = friendsPoints.entries;
    currentLeaderboardData.value = friendsCurrentStreak.entries;
    streakLeaderboardData.value = friendsStreak.entries;

    pointsLeaderboardDataExtra.value = friendsPointsYou.entries;
    currentLeaderboardDataExtra.value = friendsStreakYou.entries;
    streakLeaderboardDataExtra.value = friendsCurrentStreakYou.entries;


}

const navigateToUserProfile = (userId: number) => {
    router.push({ name: 'user', params: { id: userId } });
};
</script>

<style scoped>
main {
    margin-bottom: 4rem;
    width: 80%;
    display: flex;
    justify-content: space-around;
    align-items: start;
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

#content {
    display: flex;
    flex-direction: row;
   
    justify-content: center;
    flex-wrap: wrap;
}

.box {
    width: 90%;
}

h1 {
    font-weight: 500;
    margin-bottom: 1rem;
}

#dropdownContainer {
    display: flex;
    justify-content: center;
    margin-bottom: 2rem;

}

#radioContainer {
    display: flex;
    justify-content: center;
    margin-bottom: 2rem;
    width: 100%;
    margin-top: 3.6rem;
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