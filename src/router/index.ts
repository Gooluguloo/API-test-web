import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import("../components/MainSearch.vue")
    },
    {
      path: '/crawl',
      name: 'crawl',
      component: () =>import("../components/searchResult.vue")
    },
    {
      path: '/search',
      name: 'search',
      component: () =>import("../components/SearchByKeyword.vue")
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    }
  ]
})

export default router
