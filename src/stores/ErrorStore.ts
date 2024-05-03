import { defineStore } from 'pinia';

/**
 * Representing the store for managing error-related state.
 */
export const useErrorStore = defineStore('ErrorStore', {
  state: () => ({
    /** Array containing multiple error messages. */
    errors: [] as string[],
  }),
  actions: {
    /**
     * Adds an error to the error array.
     * Logs the error message.
     *
     * @param {string} error - The error message to add.
     */
    addError(error: string) {
      console.log(error);
      this.errors = [error];
    },
    /**
     * Removes the first error from the error array.
     */
    removeCurrentError() {
      if (this.errors.length > 0) {
        this.errors.shift();
      }
    },
  },
  getters: {
    /**
     * Retrieves the first error message in the error array.
     *
     * @returns {string} The first error message.
     */
    getFirstError(): string {
      if (this.errors.length > 0) {
        return `Exceptions.${this.errors[0]}`;
      }
      return '';
    },
    /**
     * Retrieves the last error message in the error array.
     *
     * @returns The last error message.
     */
    getLastError(): string {
      if (this.errors.length > 0) {
        return `Exceptions.${this.errors[this.errors.length - 1]}`;
      }
      return '';
    },
  },
});