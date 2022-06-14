import { createRouter, createWebHashHistory, RouteRecordRaw, Router } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    alias: '/home',
    component: () => import('../views/Layout/index.vue'),
    children: [
      {
        path: '/applicationInfo',
        component: () => import('../views/BusinessManagement/ApplicationInfo/index.vue')
      }
    ]
  },
  { path: '/login', component: () => import('../views/Login/index.vue') }
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
