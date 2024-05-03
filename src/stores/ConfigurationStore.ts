import { defineStore } from 'pinia'

/**
 * Represents the store for managing configuration-related state.
 */
export const useConfigurationStore = defineStore('ConfigurationStore', {
  state: () => ({
    /** The amount in the spending account. */
    spendingAccount: 0,
    /** The amount in the savings account. */
    savingsAccount: 0,
    /** The user's commitment. */
    commitment: '',
    /** The user's experience. */
    experience: '',
    /** The challenges the user is facing. */
    challenges: [] as Array<string>,
  }),
  actions: {
    /**
     * Sets the amount in the spending account.
     *
     * @param {number} newValue - The new value for the spending account.
     */
    setSpendingAccount(newValue: number) {
      this.spendingAccount = newValue;
    },
    /**
     * Sets the amount in the savings account.
     *
     * @param {number} newValue - The new value for the savings account.
     */
    setSavingsAccount(newValue: number) {
      this.savingsAccount = newValue
    },
    /**
     * Sets the user's commitment.
     *
     * @param {string} commitment - The user's commitment.
     */
    setCommitment(commitment: string) {
      this.commitment = commitment
    },
    /**
     * Sets the user's experience.
     *
     * @param {string} experience - The user's experience.
     */
    setExperience(experience: string) {
      this.experience = experience
    },
    /**
     * Sets the challenges the user is facing.
     *
     * @param {Array<string>} challenges - An array of challenges.
     */
    setChallenges(challenges: Array<string>) {
      this.challenges = challenges
    },
    /**
     * Resets the configuration state.
     */
    resetConfiguration() {
      this.commitment = ''
      this.experience = ''
      this.challenges = []
    }
  },
  getters: {
    /**
     * Retrieves the amount in the spending account.
     *
     * @returns {number} The amount in the spending account.
     */
    getSpendingAccount(): number {
      return this.spendingAccount
    },
    /**
     * Retrieves the amount in the savings account.
     *
     * @returns {number} The amount in the savings account.
     */
    getSavingsAccount(): number {
      return this.savingsAccount
    },
    /**
     * Retrieves the user's commitment.
     *
     * @returns {string} The user's commitment.
     */
    getCommitment(): string {
      return this.commitment
    },
    /**
     * Retrieves the user's experience.
     *
     * @returns {string} The user's experience.
     */
    getExperience(): string {
      return this.experience
    },
    /**
     * Retrieves the challenges the user is facing.
     *
     * @returns {Array<string>} An array of challenges.
     */
    getChallenges(): Array<string> {
      return this.challenges
    }
  },

});
