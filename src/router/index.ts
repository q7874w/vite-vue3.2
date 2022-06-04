import { createRouter, createWebHashHistory, RouteRecordRaw, Router } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    alias: '/home',
    component: () => import('../views/layout/index.vue'),
    children: [{ path: 'xtpzgl', component: () => import('../views/testPage/index.vue') }]
  },
  { path: '/login', component: () => import('../views/login/index.vue') }
]

const router: Router = createRouter({
  history: createWebHashHistory(),
  routes
})
router.beforeEach((to, from, next) => {
  if (!localStorage.token && to.path !== '/login') {
    next('/login')
  } else {
    next()
  }
})
export default router
