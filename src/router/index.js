import { createRouter, createWebHistory } from 'vue-router'
import Main from '../views/Main.vue'
import PageNotFound from '../views/PageNotFound.vue'

const routes = [
  {
    path: '/',
    name: 'Main',
    component: Main
  },
  {
    path: '/auth',
    name: 'Auth',
    component: () => import(/* webpackChunkName: "auth" */ '../views/Auth.vue')
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
    redirect: '/'
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
    component: () => import(/* webpackChunkName: "trand" */ '../views/Trand.vue')
  },
  {
    path: '/search-by-filter',
    name: 'Search',
    component: () => import(/* webpackChunkName: "search-by-filter" */ '../views/Search.vue')
  },
  {
    path: '/subscriptions',
    name: 'Subscriptions',
    component: () => import(/* webpackChunkName: "subscriptions" */ '../views/Subscriptions.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/name',
    name: 'NameRedirect',
    redirect: '/'
  },
  {
    path: '/name/:staff',
    name: 'Name',
    component: () => import(/* webpackChunkName: "name" */ '../views/Name.vue')
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
    component: PageNotFound
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
