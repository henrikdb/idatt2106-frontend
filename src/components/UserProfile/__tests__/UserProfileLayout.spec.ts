import { describe, it, expect, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import { createRouter, createMemoryHistory } from 'vue-router';
import { createPinia, setActivePinia } from 'pinia';
import { useUserInfoStore } from '@/stores/UserStore';
import MyComponent from '@/components/UserProfile/UserProfileLayout.vue'; // Adjust path as needed
import router from '@/router/index'; // Adjust path as needed

describe('MyComponent and Router Tests', () => {
  let store: any, mockRouter: any;

  beforeEach(() => {
    // Create a fresh Pinia and Router instance before each test
    setActivePinia(createPinia());
    store = useUserInfoStore();
    mockRouter = createRouter({
      history: createMemoryHistory(),
      routes: router.getRoutes(),
    });
    router.beforeEach((to, from, next) => {
      const isAuthenticated = store.accessToken;
      if (to.matched.some(record => record.meta.requiresAuth) && !isAuthenticated) {
        next({ name: 'login' });
      } else {
        next();
      }
    });

  });

  describe('Component Rendering', () => {
    it('renders MyComponent correctly', () => {

      const wrapper = mount(MyComponent, {
        global: {
          plugins: [mockRouter],
        },
      });
      expect(wrapper.text()).toContain('Edit profile');
    });
  });

  describe('Navigation Guards', () => {
    it('redirects an unauthenticated user to login when accessing a protected route', async () => {
      // Simulate the user being unauthenticated
      store.$patch({ accessToken: '' });
  
      router.push('/profile');
      await router.isReady();
  
      expect(router.currentRoute.value.name).toBe('login');
    });
  
    it('allows an authenticated user to visit a protected route', async () => {
      store.$patch({ accessToken: 'valid-token' }); // Token is present
      mockRouter.push('/profile');
      await mockRouter.isReady();
      expect(mockRouter.currentRoute.value.name).toBe('profile');
    });
  });
  

  describe('UserStore Actions', () => {
    it('updates user information correctly', () => {
      store.setUserInfo({ firstname: 'John', lastname: 'Smith' });

      expect(store.firstname).toBe('John');
      expect(store.lastname).toBe('Smith');
    });

    it('clears user information correctly', () => {
      store.setUserInfo({ firstname: 'John', lastname: 'Smith', accessToken: 'thisIsATestToken'});
      store.clearUserInfo();

      expect(store.firstname).toBe('');
      expect(store.lastname).toBe('');
      expect(store.accessToken).toBe('');
    });
  });
});
