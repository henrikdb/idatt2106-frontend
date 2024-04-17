// Import necessary dependencies from Vue Router and your views
import { createRouter, createWebHistory } from 'vue-router';
import LoginView from '../views/Authentication/LoginView.vue';
import { useUserInfoStore } from '@/stores/UserStore';

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
      {
        path: '/news',
        name: 'news',
        component: () => import('@/views/NewsView.vue'),
      },
      {
        path: 'test',
        name: 'test',
        component: () => import('@/views/TestView.vue'),
      },
      {
        path: 'admin',
        name: 'admin',
        component: () => import('@/views/TestView.vue'),
        meta: { requiresAdmin: true }
      },
      {
        path: 'unauthorized',
        name: 'unauthorized',
        component: () => import('@/views/TestView.vue'),
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
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  const requiresAdmin = to.matched.some(record => record.meta.requiresAdmin);
  const userRole = useUserInfoStore().role;

  if (requiresAdmin && userRole !== 'admin') {
    next({ name: 'unauthorized' });
  } else {
    next();
  }
});

export default router;