import { defineStore } from 'pinia'
export const useConfigurationStore = defineStore('ConfigurationStore', {
  state: () => ({
    spendingAccount: 0,
    savingsAccount: 0,
    commitment: '',
    experience: '',
    challenges: [] as Array<string>,
  }),
  actions: {
    setSpendingAccount(newValue: number) {
      this.spendingAccount = newValue;
    },
    setSavingsAccount(newValue: number) {
      this.savingsAccount = newValue
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
    getSpendingAccount(): number {
      return this.spendingAccount
    },
    getSavingsAccount(): number {
      return this.savingsAccount
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
