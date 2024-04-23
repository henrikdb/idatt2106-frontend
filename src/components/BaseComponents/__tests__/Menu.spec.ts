// Import necessary libraries and mocks
import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import NavBar from '@/components/BaseComponents/Menu.vue';
import { createRouter, createWebHistory } from 'vue-router';

// Use the minimal route setup for testing
const routes = [
  { path: '/', name: 'home', component: { template: '<div>Home</div>' } },
  { path: '/login', name: 'login', component: { template: '<div>Login</div>' } },
];
const router = createRouter({
  history: createWebHistory('/'),
  routes,
});

// Mock store setup
const mockStore = {
  isLoggedIn: false,
  firstname: '',
  clearUserInfo: vi.fn(),
};
vi.mock('@/stores/UserStore', () => ({
  useUserInfoStore: () => mockStore
}));

// Test the NavBar component
describe('NavBar', () => {
  it('renders navbar and checks for logo and initial links', async () => {
    const wrapper = mount(NavBar, {
      global: {
        plugins: [router]
      }
    });
    expect(wrapper.find('#navBar').exists()).toBe(true);
    expect(wrapper.find('#logoImg').attributes('src')).toBe('/src/assets/Sparesti-logo.png');
    expect(wrapper.find('#logo').text()).toContain('Sparesti');
    expect(wrapper.findAll('.nav-item').length).toBeGreaterThan(0);
  });
});
