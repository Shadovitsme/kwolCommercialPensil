import { createWebHistory, createRouter } from 'vue-router'
import Home from '@/secondPage.vue'
import mainPage from '@/mainPage.vue'

const routes = [
  {
    path: '/',
    name: 'main',
    component: mainPage,
  },
  {
    path: '/test',
    name: 'Home',
    component: Home,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
