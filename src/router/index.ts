// Import necessary dependencies from Vue Router and your views
import { createRouter, createWebHistory } from 'vue-router';
import { useUserInfoStore } from '@/stores/UserStore';
const routes = [
  {
    path: '/',
    name: 'base',
    component: () => import('@/views/BasePageView.vue'),
    meta: { requiresAuth: true },
    children: [
      {
        path: '',
        name: 'home',
        component: () => import('../views/SavingGoalView/RoadmapView.vue'),
      },
      {
        path: 'news',
        name: 'news',
        component: () => import('@/views/NewsView.vue'),
      },
      {
        path: 'leaderboard',
        name: 'leaderboard',
        component: () => import('@/views/LeaderboardView.vue'),
      },
      {
        path: 'profile',
        name: 'profile',
        component: () => import('@/views/User/UserProfileView.vue'),
      },
      {
        path: '/settings',
        name: 'settings',
        component: () => import('@/views/Settings/SettingsView.vue'),
        children: [
          {
            path: '/settings/account',
            name: 'account',
            component: () => import('@/components/Settings/SettingsAccount.vue'),
          },
          {
            path: '/settings/profile',
            name: 'profilesettings',
            component: () => import('@/components/Settings/SettingsProfile.vue'),
          },
          {
            path: '/settings/security',
            name: 'security',
            component: () => import('@/components/Settings/SettingsSecurity.vue'),
          },
          {
            path: '/settings/notification',
            name: 'notification',
            component: () => import('@/components/Settings/SettingsNotification.vue'),
          },
          {
            path: '/settings/bank',
            name: 'bank',
            component: () => import('@/components/Settings/SettingsBank.vue'),
          },
        ]
      },
      {
        path: 'roadmap',
        name: 'roadmap',
        component: () => import('@/views/SavingGoalView/RoadmapView.vue'),
      },
      {
        path: 'feedback',
        name: 'feedback',
        component: () => import('@/views/FeedbackView.vue'),
      },
      {
        path: 'shop',
        name: 'shop',
        component: () => import('@/views/ShopView.vue'),
      },
      {
        path: '/budget-overview',
        name: 'budget overview',
        component: () => import('@/views/Budget/BudgetOverview.vue'),
        meta: { requiresPremium: true },
      },
      {
        path: '/budget',
        name: 'budget',
        component: () => import('@/views/Budget/BudgetView.vue'),
        meta: { requiresPremium: true },
      },
      {
        path: '/profile/:id',
        name: 'friend-profile',
        component: () => import('@/views/User/UserProfileForeignView.vue'),
      },
      {
        path: 'friends',
        name: 'friends',
        component: () => import('@/views/User/UserFriendsView.vue'),
      },
      {
        path: 'unauthorized',
        name: 'unauthorized',
        component: () => import('@/views/UnauthorizedView.vue'),
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
    component: () => import('@/views/Authentication/LoginView.vue'),
  },
  {
    path: '/forgotten-password',
    name: 'forgotten-password',
    component: () => import('@/views/Authentication/ForgottenPasswordView.vue'),
  },
  {
    path: '/change-password/:token',
    name: 'change-password',
    component: () => import('@/views/Authentication/ChangePasswordView.vue'),
  },
  {
    path: '/sign-up',
    name: 'sign up',
    component: () => import('@/views/Authentication/SignUpView.vue'),
  },
  {
    path: '/redirect',
    name: 'redirect',
    component: () => import('@/views/RedirectView.vue'),
  },
  {
    path: '/configuration',
    name: 'configuration',
    component: () => import('@/views/ConfigurationView.vue'),
    children: [
      {
        path: '/commitment',
        name: 'commitment',
        component: () => import('@/components/Configuration/ConfigurationSteps/Commitment.vue'),
      },
      {
        path: '/experience',
        name: 'experience',
        component: () => import('@/components/Configuration/ConfigurationSteps/Experience.vue'),
      },
      {
        path: '/suitable-challenges',
        name: 'suitable challenges',
        component: () => import('@/components/Configuration/ConfigurationSteps/SuitableChallenges.vue'),
      },
      {
        path: '/first-saving-goal',
        name: 'first saving goal',
        component: () => import('@/components/Configuration/ConfigurationSteps/FirstSavingGoal.vue'),
      }
    ]
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: { name: 'not-found' },
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL || '/'),
  routes,
  scrollBehavior() {
    return { top: 0 };
  },
});

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  const requiresAdmin = to.matched.some(record => record.meta.requiresAdmin);
  const requiresPremium = to.matched.some(record => record.meta.requiresPremium);
  const user = useUserInfoStore();
  const userRole = user.role;
  const userSubscription = user.subscriptionLevel;
  const isAuthenticated = user.isLoggedIn;

  if (requiresAuth && !isAuthenticated) {
    next({ name: 'login', query: { redirect: to.fullPath } });
  } else if (requiresAdmin && userRole !== 'admin') {
    next({ name: 'unauthorized' });
  } else if (requiresPremium && userSubscription !== 'PREMIUM') {
    next({ name: 'home' });
  } else {
    next();
  }
});

export default router;