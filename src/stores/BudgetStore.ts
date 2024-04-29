import { defineStore } from 'pinia'

export const useBudgetStore = defineStore('BudgetStore', {
  state: () => ({
    activeBudgetId: 0,
  }),
  actions: {
    setActiveBudgetId(id: number) {
      this.activeBudgetId = id
    }
  },
  getters: {
    getActiveBudgetId(): number {
      return this.activeBudgetId
    }
  },
  persist: {
    storage: sessionStorage
  }
});
