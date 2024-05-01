import { describe, it, expect, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import { createRouter, createMemoryHistory } from 'vue-router';
import { createPinia, setActivePinia } from 'pinia';
import { useUserInfoStore } from '@/stores/UserStore';
import MyComponent from '@/components/Login/LoginForm.vue'; // Adjust path as needed
import router from '@/router/index'; // Adjust path as needed
import { access } from 'fs';
import { render, fireEvent, cleanup, screen } from '@testing-library/vue';
import userEvent from '@testing-library/user-event';

describe('Menu and Router Tests', () => {
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
        it('renders form correctly', () => {
            store.setUserInfo({ firstname: 'Jane', lastname: 'Doe', accessToken: 'thisIsATestToken' });

            const wrapper = mount(MyComponent, {
                global: {
                    plugins: [mockRouter],
                },
            });

            expect(wrapper.text()).toContain('E-post');
            expect(wrapper.text()).toContain('Passord');
        });
    });

    describe('Navigation Guards', () => {
        it('redirects an unauthenticated user to login when accessing a protected route', async () => {
            store.$patch({ accessToken: '' });

            router.push('/');
            await router.isReady();

            expect(router.currentRoute.value.name).toBe('login');
        });

        it('allows an unauthenticated user to visit signup', async () => {
            store.$patch({ accessToken: 'valid-token' });

            mockRouter.push('/sign-up');

            await mockRouter.isReady();

            expect(mockRouter.currentRoute.value.name).toBe('sign up');
        });
    });


    describe('Input fields', () => {
        it('updates user credetials correctly', async () => {
            const { getByPlaceholderText } = render(MyComponent);

            const emailInput = getByPlaceholderText('Skriv inn din e-post') as HTMLInputElement;
            const passwordInput = getByPlaceholderText('Skriv inn ditt passord') as HTMLInputElement;
            await fireEvent.update(emailInput, 'user@example.com');
            await fireEvent.update(passwordInput, 'Password1');

            expect(emailInput.value).toBe('user@example.com');
            expect(passwordInput.value).toBe('Password1');
        });

        it('Password error msg', async () => {
            const { container } = render(MyComponent, {
                global: {
                    plugins: [mockRouter],
                },
            });

            const errorMsg = container.querySelector('#invalid'); // Use the actual ID here
            expect(errorMsg?.textContent === "Password must be between 4 and 16 characters and contain one capital letter, small letter and a number")
        });

        it('logout should have empty store at application start', () => {
            expect(store.firstname).toBe('');
            expect(store.lastname).toBe('');
            expect(store.accessToken).toBe('');
        });
    });

    describe('Menu Actions', () => {
        it('signup redirects to signup', async () => {
            const { container } = render(MyComponent, {
                global: {
                    plugins: [mockRouter],
                },
            });

            // Assuming there's an element with id="home-link" that you want to click
            const signupLink = container.querySelector('#signup'); // Use the actual ID here
            if (signupLink) {
                await userEvent.click(signupLink);
                await mockRouter.isReady();
            }

            expect(mockRouter.currentRoute.value.name).toBe('sign up'); // Assuming 'Home' is the route name for '/'
        });
    });
});
