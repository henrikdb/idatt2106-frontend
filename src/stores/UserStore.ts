import { OpenAPI } from '@/api'
import Cookies from 'js-cookie'
import { defineStore } from 'pinia'

/**
 * Custom storage implementation for storing state in cookies.
 */
const cookiesStorage: Storage = {
  setItem(key, state) {
    return Cookies.set(key, state, { expires: 3 })
  },
  getItem(key) {
    const store = Cookies.get(key)
    if (store === undefined) {
      OpenAPI.TOKEN = ''
      return ''
    }

    OpenAPI.TOKEN = JSON.parse(Cookies.get(key) || '').accessToken
    return Cookies.get(key) || ''
  },
  length: 0,
  clear: function (): void {
    Cookies.remove('userInfo')
  },
  key: function (index: number): string | null {
    throw new Error('Function not implemented.')
  },
  removeItem: function (key: string): void {
    throw new Error('Function not implemented.')
  }
}

/**
 * Interface representing user store information.
 */
export type UserStoreInfo = {
  id?: number
  email?: string
  firstname?: string
  lastname?: string
  password?: string
  accessToken?: string
  role?: string
  subscriptionLevel?: string
  roadBackground?: number
  profileImage?: number
}

export const useUserInfoStore = defineStore('UserInfoStore', {
  state: () => ({
    /** User ID. */
    id: 0,
    /** User email. */
    email: '',
    /** User first name. */
    firstname: '',
    /** User last name. */
    lastname: '',
    /** User password. */
    password: '',
    /** User access token. */
    accessToken: '',
    /** User role. */
    role: '',
    /** User subscription level. */
    subscriptionLevel: '',
    /** User road background. */
    roadBackground: 0,
    /** User profile image. */
    profileImage: 0
  }),
  persist: {
    storage: cookiesStorage
  },
  actions: {
    /**
     * Sets the user password.
     *
     * @param {string} password - The user password.
     */
    setPassword(password: string) {
      this.password = password
    },
    /**
     * Resets the user password.
     */
    resetPassword() {
      this.password = ''
    },
    /**
     * Sets the user information.
     *
     * @param {UserStoreInfo} userinfo - The user information to set.
     */
    setUserInfo(userinfo: UserStoreInfo) {
      userinfo.id && (this.$state.id = userinfo.id)
      userinfo.email && (this.$state.email = userinfo.email)
      userinfo.firstname && (this.$state.firstname = userinfo.firstname)
      userinfo.lastname && (this.$state.lastname = userinfo.lastname)
      userinfo.accessToken && (this.$state.accessToken = userinfo.accessToken)
      userinfo.accessToken && (OpenAPI.TOKEN = this.$state.accessToken)
      userinfo.role && (this.$state.role = userinfo.role)
      userinfo.subscriptionLevel && (this.$state.subscriptionLevel = userinfo.subscriptionLevel)
      userinfo.roadBackground && (this.$state.roadBackground = userinfo.roadBackground)
      userinfo.profileImage && (this.$state.profileImage = userinfo.profileImage)
    },
    /**
     * Clears the user information.
     */
    clearUserInfo() {
      this.$state.id = 0
      this.$state.email = ''
      this.$state.firstname = ''
      this.$state.lastname = ''
      this.$state.accessToken = ''
      this.$state.role = ''
      this.$state.subscriptionLevel = ''
      this.$state.roadBackground = 0
      this.$state.profileImage = 0
      OpenAPI.TOKEN = undefined
    }
  },
  getters: {
    /**
     * Retrieves the user password.
     *
     * @returns {string} The user password.
     */
    getPassword(): string {
      return this.password
    },
    /**
     * Retrieves the user's first name.
     *
     * @returns {string} The user's first name.
     */
    getFirstName(): string {
      return this.firstname
    },
    /**
     * Retrieves the user's last name.
     *
     * @returns {string} The user's last name.
     */
    getLastname(): string {
      return this.lastname
    },
    /**
     * Retrieves the user's email.
     *
     * @returns {string} The user's email.
     */
    getEmail(): string {
      return this.email
    },
    /**
     * Checks if the user is logged in.
     *
     * @returns {boolean} A boolean indicating if the user is logged in.
     */
    isLoggedIn(): boolean {
      return this.accessToken !== ''
    },
    /**
     * Checks if the user has a premium subscription.
     *
     * @returns {boolean} A boolean indicating if the user has a premium subscription.
     */
    isPremium(): boolean {
      return this.subscriptionLevel === 'PREMIUM'
    },
    /**
     * Checks if the user has an ad-free subscription.
     *
     * @returns {boolean} A boolean indicating if the user has an ad-free subscription.
     */
    isNoAds(): boolean {
      return this.subscriptionLevel === 'NO_ADS'
    }
  }
})
