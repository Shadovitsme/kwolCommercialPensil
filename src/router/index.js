import { createWebHistory, createRouter } from 'vue-router'
import mainData from '@/mainDataPage.vue'
import mainPage from '@/main.vue'
import ChooseYourRoom from '@/chooseYourRoom.vue'
import WishPage from '@/wishPage.vue'
import Rooms from '@/rooms.vue'

const routes = [
  {
    path: '/',
    name: 'main',
    component: mainPage,
  },
  {
    path: '/mainData',
    name: 'data',
    component: mainData,
  },
  {
    path: '/chooseRoom',
    name: 'chooseRoom',
    component: ChooseYourRoom,
  },
  { path: '/wishPage', name: 'wishPage', component: WishPage },
  { path: '/rooms', name: 'rooms', component: Rooms },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
