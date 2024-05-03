import { defineStore } from 'pinia'

/**
 * Represents the store for managing configuration-related state.
 */
export const useConfigurationStore = defineStore('ConfigurationStore', {
  state: () => ({
    /** The Basic Bank Account Number in the checking account. */
    chekingAccountBBAN: 0,
    /** The Basic Bank Account Number in the savings account. */
    savingsAccountBBAN: 0,
    /** The user's commitment. */
    commitment: '',
    /** The user's experience. */
    experience: '',
    /** The challenges the user is facing. */
    challenges: [] as Array<string>
  }),
  actions: {
    /**
     * Sets the Basic Bank Account Number of the cheking account.
     *
     * @param {number} newValue - The new Basic Bank Account Number of the cheking account.
     */
    setChekingAccountBBAN(newValue: number) {
      this.chekingAccountBBAN = newValue
    },
    /**
     * Sets the Basic Bank Account Number of the savings account.
     *
     * @param {number} newValue - The new Basic Bank Account Number of the savings account.
     */
    setSavingsAccountBBAN(newValue: number) {
      this.savingsAccountBBAN = newValue
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
     * Retrieves the Basic Bank Account Number of the cheking account.
     *
     * @returns {number} The amount in the cheking account.
     */
    getCheckingAccountBBAN(): number {
      return this.chekingAccountBBAN
    },
    /**
     * Retrieves the Basic Bank Account Number of the savings account.
     *
     * @returns {number} The amount in the savings account.
     */
    getSavingsAccountBBAN(): number {
      return this.savingsAccountBBAN
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
  }
})
