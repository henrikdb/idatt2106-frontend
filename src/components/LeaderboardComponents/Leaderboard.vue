<template>
  <div id="leaderboard">
    
    <table>
      <tbody>
        <tr v-for="(entry, index) in leaderboard" :key="entry.user?.id" :class="{ 'is-user-5': entry.user?.id === userStore.id }">
          <td class="number">{{ entry.rank }}</td>
          <td class="name" @click="navigateToUserProfile(entry.user?.id ?? 0)">{{ entry.user?.firstName }}</td>
          <td class="points" v-if="index === 0">
            {{ entry.score }}
          </td>
          <td v-else class="points">{{ entry.score }}</td>
        </tr>
      </tbody>
      <tbody id="line">`</tbody>
      <tbody v-if="!userInLeaderboard">
        <tr v-for="(entry, index) in leaderboardExtra" :key="entry.user?.id" :class="{ 'is-user-5': entry.user?.id === userStore.id }">
          <td class="number">{{ entry.rank }}</td>
          <td class="name" @click="navigateToUserProfile(entry.user?.id ?? 0)">{{ entry.user?.firstName }}</td>
          <td class="points">{{ entry.score }}</td>
        </tr>
      </tbody>
      <tbody v-else></tbody>
    </table>
  </div>
</template>


<script setup lang="ts">
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { useUserInfoStore } from '@/stores/UserStore';
import type { LeaderboardEntryDTO } from '@/api/models/LeaderboardEntryDTO';
import type { PropType } from 'vue';

const router = useRouter();
const userStore = useUserInfoStore();

const props = defineProps({
  leaderboard: {
    type: Array as PropType<LeaderboardEntryDTO[]>,
    required: true
  },
  leaderboardExtra: {
    type: Array as PropType<LeaderboardEntryDTO[]>,
    required: true
  }
});

console.log(props.leaderboardExtra);

const userInLeaderboard = computed(() => props.leaderboard.some(entry => entry.user && entry.user.email === userStore.email));
const navigateToUserProfile = (id: number) => {
  router.push(`/profile/${id}`);
};
</script>

<style scoped>

#leaderboard {
  max-width: 80%;
  position: relative;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;
}

table {
  width: 100%;
  border-collapse: collapse;
  table-layout: fixed;
  color: #141a39;
  cursor: default;
}

tr {
  transition: all 0.2s ease-in-out;
  border-radius: 0.2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 4rem;
}

tr:hover {
  background-color: #fff;
  transform: scale(1.1);
  -webkit-box-shadow: 0px 5px 15px 8px #e4e7fb;
  box-shadow: 0px 5px 15px 8px #e4e7fb;
}

tr:nth-child(even) {
  background-color: #f9f9f9;
}

td {
  height: 2rem;
  font-family: "Rubik", sans-serif;
  font-size: 1.4rem;
  padding: 1rem 2rem;
  position: relative;
}

.number {
  width: 1rem;
  font-size: 1.4rem;
  font-weight: bold;
  text-align: left;
  display: flex;
  align-items: center;
}

.name {
  font-size: 1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
}

.points {
  font-weight: bold;
  font-size: 1rem;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

@media (max-width: 1000px) {
  .number .name .points {
    font-size: 0.5rem;
  }

  td {
    padding: 0.2rem 0.5rem;
  }
}


.points:first-child {
  width: 10rem;
}

.gold-medal {
  height: 3rem;
  margin-left: 1.5rem;
}

.ribbon {
  width: 106%;
  height: 4.5rem;
  top: -0.5rem;
  background-color: #003A58;
  position: absolute;
  /**left: -1rem;*/
  box-shadow: 0px 15px 11px -6px #7a7a7d;
}

.ribbon::before {
  content: "";
  height: 1.5rem;
  width: 1.5rem;
  bottom: -0.8rem;
  left: 0.35rem;
  transform: rotate(45deg);
  background-color: #003A58;
  position: absolute;
  z-index: -1;
}

.ribbon::after {
  content: "";
  height: 1.5rem;
  width: 1.5rem;
  bottom: -0.8rem;
  right: 0.35rem;
  transform: rotate(45deg);
  background-color: #003A58;
  position: absolute;
  z-index: -1;
}

#line {
  width: 100%;
  height: 0.01rem;
  border-top: 8px solid #003A58
}

tr.is-user-5 {
  background-color: #419c5c !important;
  color: #fff !important;
}
</style>