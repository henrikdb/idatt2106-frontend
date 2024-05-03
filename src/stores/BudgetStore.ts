import { defineStore } from 'pinia'

/**
 * Represents the store for managing budget-related state.
 */
export const useBudgetStore = defineStore('BudgetStore', {
  state: () => ({
    /** The ID of the active budget. */
    activeBudgetId: 0,
  }),
  actions: {
    /**
     * Sets the active budget ID.
     * @param {number} id - The ID of the active budget.
     */
    setActiveBudgetId(id: number) {
      this.activeBudgetId = id
    }
  },
  getters: {
    /**
     * Retrieves the active budget ID.
     *
     * @returns {number} The ID of the active budget.
     */
    getActiveBudgetId(): number {
      return this.activeBudgetId
    }
  },
  persist: {
    storage: sessionStorage
  }
});
