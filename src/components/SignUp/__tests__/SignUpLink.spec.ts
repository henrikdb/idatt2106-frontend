import { describe, it, expect, beforeEach } from 'vitest';
import { createPinia, setActivePinia } from 'pinia';
import { createRouter, createMemoryHistory } from 'vue-router';
import LoginPrompt from '@/components/SignUp/SignUpLink.vue';
import { useUserInfoStore } from '@/stores/UserStore';
import router from '@/router/index';
import { render, screen } from '@testing-library/vue';
import userEvent from '@testing-library/user-event';

describe('LoginPrompt', () => {
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


    it('renders login link correctly', async () => {
        const router = createRouter({
            history: createMemoryHistory(),
            routes: [{ path: '/signup', component: { template: 'Signup Page' } }],
        });

        const { getByText } = render(LoginPrompt, {
            global: {
                plugins: [router],
            },
        });

        const loginLink = getByText('Registrer deg');
        expect(loginLink).toBeDefined(); // Check if the 'Login' link is rendered
    });

    it('navigates to the login page when the login link is clicked', async () => {
        const mockRouter = createRouter({
            history: createMemoryHistory(),
            routes: [{ path: '/login', name: 'login', component: { template: 'Login Page' } }],
        });
    
        const { container } = render(LoginPrompt, {
            global: {
                plugins: [mockRouter],
            },
        });
    
        await mockRouter.isReady(); // Ensure the router is ready before asserting
    
        const signupLink = container.querySelector('#signup'); // Use the actual ID here
        if (signupLink) {
            await userEvent.click(signupLink);
            await mockRouter.isReady();
        }
    
        expect(mockRouter.currentRoute.value.path).toBe('/sign-up'); // Check if the router navigated to the login page
    }, 10000);
});
