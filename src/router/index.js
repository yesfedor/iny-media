import { createRouter, createWebHistory } from 'vue-router'
import processingRoutes from './processingRoutes'

const routes = processingRoutes(false)

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeResolve((to, from, next) => {
  if (from.name === 'Watch' && from.meta?.play) {
    window.open(to.fullPath, '_blank')
  } else {
    next()
  }
})

processingRoutes({ $router: router })

export default router
