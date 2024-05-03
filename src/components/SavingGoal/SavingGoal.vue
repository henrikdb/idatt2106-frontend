<script lang="ts">
import SavingGoalList from '@/components/SavingGoal/SavingGoalList.vue'
import SavingGoalRoadmap from '@/components/SavingGoal/SavingGoalRoadmap.vue'
import SavingGoalCreate from '@/components/SavingGoal/SavingGoalCreate.vue'
import SavingGoalDefault from '@/components/SavingGoal/SavingGoalDefault.vue'
import type { GoalDTO } from '@/api'
import { GoalService } from '@/api'
import { useUserInfoStore } from '@/stores/UserStore'

export default {
  components: { SavingGoalDefault, SavingGoalCreate, SavingGoalRoadmap, SavingGoalList },
  data() {
    return {
      bluePanelMaxHeight: 'auto' as string,
      createClicked: false as boolean,
      savingGoalClicked: false as boolean,
      selectedGoal: [] as any,
      createdGoal: [] as any,
      key: 0 as number,
      keyForList: 0 as number
    }
  },
  mounted() {
    this.calculateBluePanelMaxHeight()
  },
  methods: {
    useUserInfoStore,
    calculateBluePanelMaxHeight() {
      // Query the timeline element
      const timelineElement = document.querySelector('.timeline')
      if (timelineElement instanceof HTMLElement) {
        // Calculate the max-height based on the height of the timeline
        const timelineHeight = timelineElement.offsetHeight
        console.log(timelineHeight)
        this.bluePanelMaxHeight = timelineHeight * 1.5 + 'px'
      } else {
        this.bluePanelMaxHeight = '700px'
      }
    },
    createGoal() {
      this.createClicked = true
    },
    async goToSavingGoal(savingGoal: GoalDTO) {
      this.$emit('goToSavingGoal', savingGoal)
      this.selectedGoal = await GoalService.getGoal({ id: savingGoal.id as number })
      this.createClicked = false
      this.savingGoalClicked = true
      this.key++
      setTimeout(() => {
        this.calculateBluePanelMaxHeight()
      }, 500)
    },
    async handleCreateGoalClicked(savingGoal: GoalDTO) {
      this.$emit('goToSavingGoal', savingGoal)
      let response = await GoalService.getGoal({ id: savingGoal.id as number })
      setTimeout(() => {
        this.selectedGoal = response
        this.createClicked = false
        this.key++
        this.savingGoalClicked = true
        this.keyForList++
      }, 100)
    },
    async refreshSpareSti() {
      try {
        this.selectedGoal = await GoalService.getGoal({ id: this.selectedGoal.id as number })
        console.log('yessir')
        this.key++
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>

<template>
  <div class="cont">
    <div class="row">
      <div
        class="col-lg-4 blue-background overflow-scroll"
        :style="{ 'max-height': bluePanelMaxHeight }"
      >
        <h2>Dine sparemål</h2>
        <div>
          <button
            class="btn btn-success btn-lg"
            style="font-weight: 600; margin-bottom: 20px"
            @click="createGoal"
          >
            + Lag et nytt sparemål
          </button>
        </div>
        <saving-goal-list :key="keyForList" @goToSavingGoal="goToSavingGoal"></saving-goal-list>
      </div>
      <div class="spacer">
        <div
          v-if="!useUserInfoStore().isPremium && !useUserInfoStore().isNoAds"
          v-for="(challenge, index) in 5"
          :key="index"
        >
          <img
            v-if="index % 2 === 0"
            src="https://www.codefuel.com/wp-content/uploads/2022/10/image1-1.png"
          />
          <img
            v-else
            src="https://www.vaultnetworks.com/wp-content/uploads/2012/11/PROMO-BLOG-AD-YELLOW-VERTICAL.png"
          />
        </div>
      </div>
      <saving-goal-create
        @createGoalClicked="handleCreateGoalClicked"
        v-if="createClicked"
      ></saving-goal-create>
      <saving-goal-roadmap
        @refreshSavingGoal="refreshSpareSti"
        :key="key"
        :selected-goal="selectedGoal"
        v-else-if="savingGoalClicked"
      ></saving-goal-roadmap>
      <saving-goal-default v-else></saving-goal-default>
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
  background-color: #003a58;
  width: 27%;
  border-radius: 0 1em 1em 0;
}

.spacer {
  padding-top: 16px;
  width: 10%;
  background-color: transparent;
  margin-bottom: 12px;
}

.spacer img {
  width: 100%;
}

h2 {
  color: white;
  margin-bottom: 16px;
  font-weight: 600;
}
</style>
