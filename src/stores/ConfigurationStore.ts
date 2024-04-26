import { defineStore } from 'pinia'
export const useConfigurationStore = defineStore('ConfigurationStore', {
  state: () => ({
    commitment: '',
    experience: '',
    challenges: [] as Array<string>,
  }),
  actions: {
    setCommitment(commitment: string) {
      this.commitment = commitment
    },
    setExperience(experience: string) {
      this.experience = experience
    },
    setChallenges(challenges: Array<string>) {
      this.challenges = challenges
    },
    resetConfiguration() {
      this.commitment = ''
      this.experience = ''
      this.challenges = []
    }
  },
  getters: {
    getCommitment(): string {
      return this.commitment
    },
    getExperience(): string {
      return this.experience
    },
    getChallenges(): Array<string> {
      return this.challenges
    }
  },

});
