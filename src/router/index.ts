import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

import Main from '../views/Main.vue'
import ColorSelector from '../views/ColorSelector.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '',
    name: 'Main',
    component: Main
  },
  {
    path: '/select',
    name: 'Color Select',
    component: ColorSelector
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
