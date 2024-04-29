// Import necessary dependencies from Vue Router and your views
import { createRouter, createWebHistory } from 'vue-router';
import LoginView from '../views/Authentication/LoginView.vue';
import { useUserInfoStore } from '@/stores/UserStore';
import UserProfileView from "@/views/User/UserProfileView.vue";
import SignUp from '@/components/SignUp/SignUp.vue'
import UpdateUserView from "@/views/UpdateUser/UpdateUserView.vue";


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
        path: 'test',
        name: 'test',
        component: () => import('@/views/TestView.vue'),
      },
      {
        path: 'profile',
        name: 'profile',
        component: UserProfileView
      },
      {
        path: 'update-user',
        name: 'update-user',
        component: UpdateUserView
      },
      {
        path: '/settings',
        name: 'settings',
        component: () => import('@/views/SettingsView.vue'),
        children: [
          {
            path: '/settings/account',
            name: 'account',
            component: () => import('@/views/Settings/SettingsAccountView.vue'),
          },
          {
            path: '/settings/profile',
            name: 'profilesettings',
            component: () => import('@/views/Settings/SettingsProfileView.vue'),
          },
          {
            path: '/settings/security',
            name: 'security',
            component: () => import('@/views/Settings/SettingsSecurityView.vue'),
          },
          {
            path: '/settings/notification',
            name: 'notification',
            component: () => import('@/views/Settings/SettingsNotificationView.vue'),
          },
          {
            path: '/settings/bank',
            name: 'bank',
            component: () => import('@/views/Settings/SettingsBankView.vue'),
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
      },
      {
        path: '/budget',
        name: 'budget',
        component: () => import('@/views/Budget/BudgetView.vue'),
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
        path: 'add-friend',
        name: 'add-friend',
        component: () => import('@/views/User/UserAddFriend.vue'),
      },
      {
        path: 'admin',
        name: 'admin',
        component: () => import('@/views/TestView.vue'),
        meta: { requiresAdmin: true },
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
    component: LoginView,
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
    path: '/configuration',
    name: 'configuration',
    component: () => import('@/views/ConfigurationView.vue'),
    children: [
      {
        path: '/bank-id',
        name: 'bankId',
        component: () => import('@/components/Configuration/ConfigurationSteps/BankId.vue'),
      },
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
  const user= useUserInfoStore();
  const userRole = user.role;
  const isAuthenticated = user.isLoggedIn;

  if (requiresAuth && !isAuthenticated) {
    next({ name: 'login', query: { redirect: to.fullPath } });
  } else if (requiresAdmin && userRole !== 'admin') {
    next({ name: 'unauthorized' });
  } else {
    next();
  }
});

export default router;