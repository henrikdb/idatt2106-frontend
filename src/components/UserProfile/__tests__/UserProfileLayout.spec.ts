import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import DashboardComponent from '@/components/UserProfile/UserProfileLayout.vue'; // Update with your actual import

// Correctly mocking 'vue-router'
vi.mock('vue-router', async (importOriginal) => {
  const actual = await importOriginal(); // Import the actual vue-router module
  return {
    ...actual, // Spread all exports
    // Optionally override specific exports if needed
  };
});

describe('DashboardComponent', () => {
  // Now you can import and use createRouter and createWebHistory
  const { createRouter, createWebHistory } = require('vue-router');

  const router = createRouter({
    history: createWebHistory(),
    routes: [{ path: '/', name: 'home' }, { path: '/update-user', name: 'update-user' }]
  });

  it('renders correctly', () => {
    const wrapper = mount(DashboardComponent, {
      global: {
        plugins: [router]
      }
    });

    // Check if the component renders
    expect(wrapper.find('.container').exists()).toBe(true);
    expect(wrapper.find('h1').text()).toBe('Andy Horwitz');
    expect(wrapper.findAll('.card').length).toBeGreaterThan(0); // Checks if any cards are rendered
  });

  it('navigates to roadmap page', async () => {
    const wrapper = mount(DashboardComponent, {
      global: {
        plugins: [router]
      }
    });

    await router.isReady(); // Wait for router to be ready
    await wrapper.find('.stretched-link').trigger('click'); // Simulate clicking the link that calls toRoadmap
    expect(router.currentRoute.value.path).toBe('/');
  });
});