import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/HomeView.vue')
    },
    {
      path: '/chat',
      name: 'chat',
      component: () => import('@/views/ChatView.vue')
    },
    {
      path: '/postgres-status',
      name: 'postgres-status',
      component: () => import('@/views/PostgresStatusView.vue')
    },
    {
      path: '/sso',
      name: 'sso',
      component: () => import('@/views/SSOView.vue')
    },
    {
      path: '/test',
      name: 'test',
      component: () => import('@/views/TestView.vue')
    },
    {
      path: '/:catchAll(.*)',
      name: 'Error404',
      component: () => import('@/views/Error404View.vue')
    },
  ]
})

export default router
