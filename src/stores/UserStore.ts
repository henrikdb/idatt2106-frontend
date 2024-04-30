import { OpenAPI } from '@/api';
import Cookies from 'js-cookie';
import { defineStore } from 'pinia';

const cookiesStorage: Storage = {
  setItem(key, state) {
    return Cookies.set(key, state, { expires: 3 });
  },
  getItem(key) {
    const store = Cookies.get(key);
    if (store === undefined) {
      OpenAPI.TOKEN = '';
      return '';
    }

    OpenAPI.TOKEN = JSON.parse(Cookies.get(key) || '').accessToken;
    return Cookies.get(key) || '';
  },
  length: 0,
  clear: function (): void {
    Cookies.remove('userInfo');
  },
  key: function (index: number): string | null {
    throw new Error('Function not implemented.');
  },
  removeItem: function (key: string): void {
    throw new Error('Function not implemented.');
  },
};

export type UserStoreInfo = {
  id?: number;
  email?: string;
  firstname?: string;
  lastname?: string;
  password?: string;
  accessToken?: string;
  role?: string;
  subscriptionLevel?: string;
  profileImage?: number;
};

export const useUserInfoStore = defineStore('UserInfoStore', {
  state: () => ({
    id: 0,
    email: '',
    firstname: '',
    lastname: '',
    password: '',
    accessToken: '',
    role: '',
    subscriptionLevel: '',
    profileImage: 0,
  }),
  persist: {
    storage: cookiesStorage,
  },
  actions: {
    setPassword(password: string) {
      this.password = password
    },
    resetPassword() {
      this.password = ''
    },
    setUserInfo(userinfo: UserStoreInfo) {
      userinfo.id && (this.$state.id = userinfo.id);
      userinfo.email && (this.$state.email = userinfo.email);
      userinfo.firstname && (this.$state.firstname = userinfo.firstname);
      userinfo.lastname && (this.$state.lastname = userinfo.lastname);
      userinfo.accessToken && (this.$state.accessToken = userinfo.accessToken);
      userinfo.accessToken && (OpenAPI.TOKEN = this.$state.accessToken);
      userinfo.role && (this.$state.role = userinfo.role);
      userinfo.subscriptionLevel && (this.$state.subscriptionLevel = userinfo.subscriptionLevel);
      userinfo.profileImage && (this.$state.profileImage = userinfo.profileImage);
    },
    clearUserInfo() {
      this.$state.id = 0;
      this.$state.email = '';
      this.$state.firstname = '';
      this.$state.lastname = '';
      this.$state.accessToken = '';
      this.$state.role = '';
      this.$state.subscriptionLevel = '';
      this.$state.profileImage = 0;
      OpenAPI.TOKEN = undefined;
    },
  },
  getters: {
    getPassword(): string {
      return this.password
    },
    getFirstName(): string {
      return this.firstname
    },
    getLastname(): string {
      return this.lastname
    },
    getEmail(): string {
      return this.email
    },
    isLoggedIn(): boolean {
      return this.accessToken !== '';
    },
    isPremium(): boolean {
      return this.subscriptionLevel === 'PREMIUM';
    },
    isNoAds(): boolean {
      return this.subscriptionLevel === 'NO_ADS';
    }
  },
});