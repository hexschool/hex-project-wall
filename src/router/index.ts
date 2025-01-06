import { createRouter, createWebHashHistory } from 'vue-router'
import AppLayout from '@/components/AppLayout.vue'

export const routes = [
  {
    path: '/',
    name: 'AppLayout',
    component: AppLayout,
    children: [
      {
        path: '/',
        name: 'HomeView',
        component: () => import('../views/HomeView.vue'),
        props: true
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes
})

export default router
