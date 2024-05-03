import { defineStore } from 'pinia'
export const useConfigurationStore = defineStore('ConfigurationStore', {
  state: () => ({
    chekingAccountBBAN: 0,
    savingsAccountBBAN: 0,
    commitment: '',
    experience: '',
    challenges: [] as Array<string>,
  }),
  actions: {
    setChekingAccountBBAN(newValue: number) {
      this.chekingAccountBBAN = newValue;
    },
    setSavingsAccountBBAN(newValue: number) {
      this.savingsAccountBBAN = newValue
    },
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
    getCheckingAccountBBAN(): number {
      return this.chekingAccountBBAN
    },
    getSavingsAccountBBAN(): number {
      return this.savingsAccountBBAN
    },
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
