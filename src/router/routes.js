const routes = [
  {
    path: '/',
    name: 'Main',
    component: () => import(/* webpackChunkName: "main" */ '../views/Main.vue'),
    meta: {
      requiresAuth: false
    }
  },
  {
    path: '/auth',
    name: 'Auth',
    component: () => import(/* webpackChunkName: "auth" */ '../views/Auth.vue'),
    meta: {
      requiresAuth: false
    }
  },
  {
    path: '/profile',
    name: 'Profile',
    component: () => import(/* webpackChunkName: "profile" */ '../views/Profile.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/profile/settings',
    name: 'ProfileSettings',
    component: () => import(/* webpackChunkName: "profile-settings" */ '../views/ProfileSettings.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/watch',
    name: 'WatchRedirect',
    redirect: '/',
    meta: {
      play: false,
      requiresAuth: false
    }
  },
  {
    path: '/watch:kpid',
    name: 'Watch',
    component: () => import(/* webpackChunkName: "watch" */ '../views/Watch.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/trand',
    name: 'Trand',
    component: () => import(/* webpackChunkName: "trand" */ '../views/Trand.vue'),
    meta: {
      requiresAuth: false
    }
  },
  {
    path: '/search-by-filter',
    name: 'Search',
    component: () => import(/* webpackChunkName: "search-by-filter" */ '../views/Search.vue'),
    meta: {
      requiresAuth: false
    }
  },
  {
    path: '/subscriptions/manage',
    name: 'Subscriptions',
    component: () => import(/* webpackChunkName: "subscriptions" */ '../views/Subscriptions.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/subscriptions/feed',
    name: 'SubscriptionsFeed',
    component: () => import(/* webpackChunkName: "subscriptions-feed" */ '../views/SubscriptionsFeed.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/name',
    name: 'NameRedirect',
    redirect: '/',
    meta: {
      requiresAuth: false
    }
  },
  {
    path: '/name/:staff',
    name: 'Name',
    component: () => import(/* webpackChunkName: "name" */ '../views/Name.vue'),
    meta: {
      requiresAuth: false
    }
  },
  {
    path: '/history',
    name: 'History',
    component: () => import(/* webpackChunkName: "history" */ '../views/History.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'PageNotFound',
    component: import(/* webpackChunkName: "error404" */ '../views/PageNotFound.vue'),
    meta: {
      requiresAuth: false
    }
  }
]

export default routes
