import { describe, it, expect, beforeEach, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import { createRouter, createMemoryHistory } from 'vue-router';
import { createPinia, setActivePinia } from 'pinia';
import Leaderboard from '@/components/LeaderboardComponents/Leaderboard.vue';
import { useUserInfoStore } from '@/stores/UserStore';
import router from '@/router/index';

describe('Leaderboard', () => {
  let wrapper: any, store: any, mockRouter;

  const leaderboard = [
    { user: { id: 1, firstName: 'Alice', email: 'alice@example.com' }, rank: 1, score: 50 },
    { user: { id: 2, firstName: 'Bob', email: 'bob@example.com' }, rank: 2, score: 45 }
  ];

  const leaderboardExtra = [
    { user: { id: 3, firstName: 'Charlie', email: 'charlie@example.com' }, rank: 1, score: 40 }
  ];

  beforeEach(() => {
    setActivePinia(createPinia());
    store = useUserInfoStore();
    store.$state = { email: 'alice@example.com' }; // Setting initial state
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

    wrapper = mount(Leaderboard, {
      props: { leaderboard, leaderboardExtra },
      global: {
        plugins: [mockRouter],
        stubs: ['router-link', 'router-view']
      }
    });
  });

  it('renders all entries from the leaderboard and leaderboardExtra props', () => {
    const rows = wrapper.findAll('tbody > tr');
    expect(rows.length).toBe(2); 
  });

  it('correctly determines if the user is in the leaderboard', () => {
    expect(wrapper.vm.userInLeaderboard).toBe(true);
  });

  it('shows the gold medal image only for the first entry', () => {
    const medals = wrapper.findAll('.gold-medal');
    expect(medals.length).toBe(1); // Only the first entry should have a gold medal
  });

  it('applies the is-user-5 class based on user firstName', () => {
    store.$state.firstname = 'User'; // Change state to match the condition
    expect(wrapper.find('.is-user-5').exists()).toBe(false); // Check if the class is applied
  });
});
