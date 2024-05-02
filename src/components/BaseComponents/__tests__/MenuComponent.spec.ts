import { describe, it, expect, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import { createRouter, createMemoryHistory } from 'vue-router';
import { createPinia, setActivePinia } from 'pinia';
import { useUserInfoStore } from '@/stores/UserStore';
import MyComponent from '../MenuComponent.vue'; // Adjust path as needed
import router from '@/router/index'; // Adjust path as needed
import { access } from 'fs';
import { render, screen } from '@testing-library/vue';
import userEvent from '@testing-library/user-event';

describe('Menu and Router Tests', () => {
  let store : any
  let mockRouter : any;

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
    it('renders Menu correctly with data from the store', () => {
      store.setUserInfo({ firstname: 'Jane', lastname: 'Doe', accessToken: 'thisIsATestToken' });

      const wrapper = mount(MyComponent, {
        global: {
          plugins: [mockRouter],
        },
      });

      expect(wrapper.text()).toContain('Jane');
    });
  });

  describe('Navigation Guards', () => {
    it('redirects an unauthenticated user to login when accessing a protected route', async () => {
      store.$patch({ accessToken: '' });
  
      router.push('/profile');
      await router.isReady();
  
      expect(router.currentRoute.value.name).toBe('login');
    });
  
    it('allows an authenticated user to visit a protected route', async () => {
      store.$patch({ accessToken: 'valid-token' });

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

  describe('Menu Actions', () => {
    it('logout clears userstore', async () => {
      store.setUserInfo({ firstname: 'John', lastname: 'Smith', accessToken: 'thisIsATestToken'});

      render(MyComponent, {
        global: {
          plugins: [mockRouter],
        },
      });
      await userEvent.click(screen.getByTestId('logout'));

      expect(store.firstname).toBe('');
      expect(store.lastname).toBe('');
      expect(store.accessToken).toBe('');
    });

    it('home redirects to home', async () => {
      store.setUserInfo({ firstname: 'John', lastname: 'Smith', accessToken: 'thisIsATestToken'});

      const { container } = render(MyComponent, {
          global: {
              plugins: [mockRouter],
          },
      });

      // Assuming there's an element with id="home-link" that you want to click
      const homeLink = container.querySelector('#home'); // Use the actual ID here
      if (homeLink) {
          await userEvent.click(homeLink);
          await mockRouter.isReady();
      }

      expect(mockRouter.currentRoute.value.name).toBe('roadmap'); // Assuming 'Home' is the route name for '/'
  });
  });
});
