// Import necessary dependencies from Vue Router and your views
import { createRouter, createWebHistory } from 'vue-router';
import LoginView from '../views/Authentication/LoginView.vue';

const routes = [
  {
    path: '/',
    name: 'base',
    component: () => import('@/views/BasePageView.vue'),
    children: [
      {
        path: '',
        name: 'home',
        component: () => import('../views/HomeView.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: '/:pathMatch(.*)*',
        name: 'not-found',
        component: () => import('@/views/NotFoundView.vue'),
      },
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView,
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: { name: 'not-found' },
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior() {
    return { top: 0 };
  },
});

router.beforeEach((to, from, next) => {
    next();
});

export default router;