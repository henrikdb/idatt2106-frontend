<script lang="ts">
import SavingGoalList from "@/components/SavingGoalComponents/SavingGoalList.vue";
import SavingGoalRoadmap from "@/components/SavingGoalComponents/SavingGoalRoadmap.vue";
import SavingGoalCreate from "@/components/SavingGoalComponents/SavingGoalCreate.vue";
export default {
  components: {SavingGoalCreate, SavingGoalRoadmap, SavingGoalList},
  data() {
    return {
      bluePanelMaxHeight: 'auto' as string,
      createClicked: false as boolean,
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
        this.bluePanelMaxHeight = `${timelineHeight*1.55}px`;
      } else {
        this.bluePanelMaxHeight = '700px';
      }
    },
    createGoal() {
      this.createClicked = true;
    },
    goToSavingGoal() {
      this.createClicked = false;
    },
  },
};
</script>

<template>
  <div class="cont">
    <div class="row">
      <div class="col-lg-4 blue-background overflow-auto" :style="{ 'max-height': bluePanelMaxHeight }">
        <h3 style="color: white; margin-bottom: 16px">Your saving goals</h3>
        <div>
          <button class="btn btn-success btn-lg" style="font-weight: 600; margin-bottom: 20px" @click="createGoal">Create new saving goal</button>
        </div>
        <saving-goal-list @goToSavingGoal="goToSavingGoal"></saving-goal-list>
      </div>
      <div class="spacer"/>
      <saving-goal-create v-if="createClicked"></saving-goal-create>
      <saving-goal-roadmap v-else></saving-goal-roadmap>
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
  background-color: #0A58CA;
  width: 27%;
}

.spacer {
  width: 10%;
  background-color: transparent;
}
</style>