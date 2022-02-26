const routes = [
  {
    path: '/',
    name: 'Main',
    component: () => import(/* webpackChunkName: "main" */ '../views/MainCategories.vue'),
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
    alias: '/watch:kpid-s:season-e:episode',
    name: 'Watch',
    component: () => import(/* webpackChunkName: "watch" */ '../views/Watch.vue'),
    params: {
      season: {
        required: false,
        default: ''
      },
      episode: {
        required: false,
        default: ''
      }
    },
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/film/:kpid/',
    alias: '/film/:kpid',
    name: 'backwardСompatibility-watch',
    redirect: to => {
      return '/watch' + to.params.kpid
    }
  },
  {
    path: '/trailer:kpid',
    alias: '/trailer:kpid-s:season-e:episode',
    name: 'Trailer',
    component: () => import(/* webpackChunkName: "trailer" */ '../views/Trailer.vue'),
    params: {
      season: {
        required: false,
        default: ''
      },
      episode: {
        required: false,
        default: ''
      }
    },
    meta: {
      requiresAuth: false
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
    path: '/search/:query',
    name: 'SearchBox',
    component: () => import(/* webpackChunkName: "search-box" */ '../views/SearchBox.vue'),
    params: {
      query: {
        required: false,
        default: ''
      }
    },
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
    path: '/collection/my',
    name: 'CollectionPlaylists',
    component: () => import(/* webpackChunkName: "playlists" */ '../views/CollectionPlaylists.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/collection/watch-later',
    name: 'CollectionWatchLater',
    component: () => import(/* webpackChunkName: "playlists" */ '../views/CollectionWatchLater.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/collection/favorites',
    name: 'CollectionFavorites',
    component: () => import(/* webpackChunkName: "playlists" */ '../views/CollectionFavorites.vue'),
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
