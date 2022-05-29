import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    alias: '/home',
    component: () => import('../views/layout/index.vue'),
    children: []
  },
  { path: '/login', component: () => import('../views/login/index.vue') }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
