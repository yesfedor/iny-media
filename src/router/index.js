import { createRouter, createWebHistory } from 'vue-router'
import processingRoutes from './processingRoutes'

const routes = processingRoutes()

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
