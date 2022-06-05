import { createRouter, createWebHashHistory, RouteRecordRaw, Router } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    alias: '/home',
    name: '首页',
    component: () => import('../views/layout/index.vue'),
    children: [
      { path: '/xtpzgl', name: '标签', component: () => import('../views/testPage/index.vue') },
      { path: '/systemSet/msgManage/list', name: '标签', component: () => import('../views/testPage/index.vue') }
    ]
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
