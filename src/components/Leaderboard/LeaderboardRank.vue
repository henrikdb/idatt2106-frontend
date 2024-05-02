<template>
    <br>
    <div id="dropdownContainer">
        <h1 class="box">Poengtavle</h1>
    </div>
    <div id="content">
        <div id="dropdownContainer">
            <div class="box">
                <div class="btn-group-vertical" id="radioContainer" role="group"
                     aria-label="Vertikal radio knappgruppe">
                    <input type="radio" class="btn-check" name="vbtn-radio" id="vbtn-radio1" autocomplete="off" checked>
                    <label class="btn btn-outline-primary" for="vbtn-radio1" @click="global"><img src="../../assets/globe.png" style="width: 60px" alt="globus"> Global</label>
                    <input type="radio" class="btn-check" name="vbtn-radio" id="vbtn-radio2" autocomplete="off">
                    <label data-cy="friends-leaderboard-btn" class="btn btn-outline-primary"
                           for="vbtn-radio2"
                            @click="friends"><img src="../../assets/friends.png" style="width: 60px" alt="venner"> Venner</label>
                </div>
            </div>
        </div>
        <main>
            <div id="leaderboard">
                <h1><img src="../../assets/items/pigcoin.png" style="width: 2rem" alt="pig coin"> Totale poeng</h1>
                <Leaderboard data-cy="total-points-board" :leaderboard="pointsLeaderboardData"
                              :leaderboardExtra="pointsLeaderboardDataExtra" @navigateToUserProfile="navigateToUserProfile" />
            </div>
            <div id="leaderboard">
                <h1><img src="../../assets/icons/fire.png" style="width: 2rem" alt="ild"> Nåværende rekke</h1>
                <Leaderboard data-cy="current-points-board" :leaderboard="currentLeaderboardData"
                              :leaderboardExtra="currentLeaderboardDataExtra" @navigateToUserProfile="navigateToUserProfile" />
            </div>
            <div id="leaderboard">
                <h1><img src="../../assets/icons/fire.png" style="width: 2rem" alt="ild"> Høyeste rekke</h1>
                <Leaderboard data-cy="streak-board" :leaderboard="streakLeaderboardData"
                              :leaderboardExtra="streakLeaderboardDataExtra" @navigateToUserProfile="navigateToUserProfile" />
            </div>
        </main>
    </div>
    <div id="communityContainer">
        <h1>Totale poeng opptjent som et fellesskap</h1>
        <h2>{{communityPoints}} <img src="../../assets/items/pigcoin.png" style="width: 2rem" alt="alt"></h2>
    </div>
</template>


<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import Leaderboard from '@/components/Leaderboard/LeaderboardTable.vue';
import { LeaderboardService } from '@/api';

let streakLeaderboardData = ref([] as  any);
let currentLeaderboardData = ref([] as any);
let pointsLeaderboardData = ref([] as any);

let streakLeaderboardDataExtra = ref([] as any);
let currentLeaderboardDataExtra = ref([] as any);
let pointsLeaderboardDataExtra = ref([] as any);

let communityPoints = ref(0);

const router = useRouter();

async function fetchQuizData() {
    await global();

    const response = await LeaderboardService.getTotalPoints();
    communityPoints.value = response;
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
        entryCount: 2,
    });
    let globalStreakYou = await LeaderboardService.getSurrounding({
        type: "TOP_STREAK",
        filter: "GLOBAL",
        entryCount: 2,
    });
    let globalCurrentStreakYou = await LeaderboardService.getSurrounding({
        type: "CURRENT_STREAK",
        filter: "GLOBAL",
        entryCount: 2,
    });
    
    pointsLeaderboardData.value = globalPoints.entries;
    currentLeaderboardData.value = globalCurrentStreak.entries;
    streakLeaderboardData.value = globalStreak.entries;

    pointsLeaderboardDataExtra.value = globalPointsYou.entries;
    currentLeaderboardDataExtra.value = globalCurrentStreakYou.entries;
    streakLeaderboardDataExtra.value = globalStreakYou.entries;
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
        entryCount: 2,
    });
    let friendsStreakYou = await LeaderboardService.getSurrounding({
        type: "TOP_STREAK",
        filter: "FRIENDS",
        entryCount: 2,
    });
    let friendsCurrentStreakYou = await LeaderboardService.getSurrounding({
        type: "CURRENT_STREAK",
        filter: "FRIENDS",
        entryCount: 2,
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
    font-weight: 700;
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

</style>