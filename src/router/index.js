import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../pages/HomePage.vue'
import CulturePage from '../pages/CulturePage.vue'
import FestivalsPage from '../pages/FestivalsPage.vue'
import HeritagePage from '../pages/HeritagePage.vue'
import DetailPage from '../pages/DetailPage.vue'
import AuthPage from '../pages/AuthPage.vue'
import AiPage from '../pages/AiPage.vue'

const routes = [
  { path: '/', name: 'home', component: HomePage, meta: { title: '华夏智游' } },
  { path: '/culture', name: 'culture', component: CulturePage, meta: { title: '中华文化' } },
  { path: '/festivals', name: 'festivals', component: FestivalsPage, meta: { title: '传统节日' } },
  { path: '/heritage', name: 'heritage', component: HeritagePage, meta: { title: '非遗文化' } },
  { path: '/detail/:id', name: 'detail', component: DetailPage, meta: { title: '文化详情' } },
  { path: '/ai', name: 'ai', component: AiPage, meta: { title: 'AI文化助手' } },
  { path: '/auth', name: 'auth', component: AuthPage, meta: { title: '登录注册' } },
  { path: '/account', name: 'account', component: AuthPage, meta: { title: '账户中心', requiresAuth: true } },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to) => {
  document.title = `${to.meta.title || '华夏智游'}｜AI+中华文化`
  if (to.meta.requiresAuth && !localStorage.getItem('huaxia-zhiyou-session')) {
    return { path: '/auth', query: { redirect: to.fullPath } }
  }
  return true
})

export default router
