<script lang="ts">
import SavingGoalList from "@/components/SavingGoal/SavingGoalList.vue";
import SavingGoalRoadmap from "@/components/SavingGoal/SavingGoalRoadmap.vue";
import SavingGoalCreate from "@/components/SavingGoal/SavingGoalCreate.vue";
import type {GoalDTO} from "@/api";
import {GoalService} from "@/api";

export default {
  components: {SavingGoalCreate, SavingGoalRoadmap, SavingGoalList},
  data() {
    return {
      bluePanelMaxHeight: 'auto' as string,
      createClicked: true as boolean,
      selectedGoal: [] as any,
      createdGoal: [] as any,
      key: 0 as number,
    };
  },
  mounted() {
    this.calculateBluePanelMaxHeight();
  },
  methods: {
    calculateBluePanelMaxHeight() {
      // Query the timeline element
      const timelineElement = document.querySelector('.timeline');
      if (timelineElement instanceof HTMLElement) {
        // Calculate the max-height based on the height of the timeline
        const timelineHeight = timelineElement.offsetHeight;
        this.bluePanelMaxHeight = '700px';
      } else {
        this.bluePanelMaxHeight = '700px';
      }
    },
    createGoal() {
      this.createClicked = true;
    },
    async goToSavingGoal(savingGoal: GoalDTO) {
      this.$emit('goToSavingGoal', savingGoal);
      let response = await GoalService.getGoal({id: savingGoal.id as number});
      console.log(response)
      this.selectedGoal = response
      this.createClicked = false;
      this.key++
    },
    createSavingGoal(savingGoal: GoalDTO) {
      this.$emit('createSavingGoal', savingGoal)
      this.createdGoal = savingGoal;
      this.createClicked = false;
    }
  },
};
</script>

<template>
  <div class="cont">
    <div class="row">
      <div class="col-lg-4 blue-background overflow-scroll" :style="{ 'max-height': bluePanelMaxHeight }">
        <h3 style="color: white; margin-bottom: 16px">Your saving goals</h3>
        <div>
          <button class="btn btn-success btn-lg" style="font-weight: 600; margin-bottom: 20px" @click="createGoal">Create new saving goal</button>
        </div>
        <saving-goal-list @goToSavingGoal="goToSavingGoal"></saving-goal-list>
      </div>
      <div class="spacer"/>
      <saving-goal-create @createGoalClick="createSavingGoal" v-if="createClicked"></saving-goal-create>
      <saving-goal-roadmap :key="key" :selected-goal="selectedGoal" v-else></saving-goal-roadmap>
    </div>
  </div>
</template>

<style scoped>
.cont {
  padding-left: 10px;
  margin: 0;
  width: 98%;
  box-sizing: unset;
}

.blue-background {
  margin-top: 20px;
  margin-bottom: 20px;
  padding: 12px;
  background-color: #003A58;
  width: 27%;
  border-radius: 0 2em 2em 0;
}

.spacer {
  width: 10%;
  background-color: transparent;
}
</style>