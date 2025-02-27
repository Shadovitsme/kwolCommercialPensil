import { createWebHistory, createRouter } from 'vue-router'
import mainData from '@/mainDataPage.vue'
import mainPage from '@/main.vue'
import ChooseYourRoom from '@/chooseYourRoom.vue'
import WishPage from '@/wishPage.vue'
import Rooms from '@/rooms.vue'
import addRefPage from '@/addRefPage.vue'
import ThanksPage from '@/thanksPage.vue'
import $ from 'jquery'
$('input').attr('maxlength', '50')
$('textarea').attr('maxlength', '800')

const routes = [
  {
    path: '/referencePage',
    name: 'main',
    component: addRefPage,
  },
  {
    path: '/brief_com/mainData',
    name: 'data',
    component: mainData,
  },
  {
    path: '/brief_com/chooseRoom',
    name: 'chooseRoom',
    component: ChooseYourRoom,
  },
  { path: '/brief_com/wishPage', name: 'wishPage', component: WishPage },
  { path: '/brief_com/rooms', name: 'rooms', component: Rooms },
  { path: '/brief_com/addRefPage', name: 'linkDescribePage', component: addRefPage },
  { path: '/brief_com/thanksPage', name: 'thanksPage', component: ThanksPage },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
