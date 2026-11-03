import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../pages/HomePage.vue'

const CulturePage = () => import('../pages/CulturePage.vue')
const FestivalsPage = () => import('../pages/FestivalsPage.vue')
const HeritagePage = () => import('../pages/HeritagePage.vue')
const DetailPage = () => import('../pages/DetailPage.vue')
const AuthPage = () => import('../pages/AuthPage.vue')
const AiPage = () => import('../pages/AiPage.vue')
const WorkshopPage = () => import('../pages/WorkshopPage.vue')

const routes = [
  { path: '/', name: 'home', component: HomePage, meta: { title: '华夏智游' } },
  { path: '/culture', name: 'culture', component: CulturePage, meta: { title: '中华文化' } },
  { path: '/festivals', name: 'festivals', component: FestivalsPage, meta: { title: '传统节日' } },
  { path: '/heritage', name: 'heritage', component: HeritagePage, meta: { title: '非遗文化' } },
  { path: '/detail/:id', name: 'detail', component: DetailPage, meta: { title: '文化详情' } },
  { path: '/ai', name: 'ai', component: AiPage, meta: { title: 'AI文化助手' } },
  { path: '/workshop', name: 'workshop', component: WorkshopPage, meta: { title: '数字剪纸工坊' } },
  { path: '/auth', name: 'auth', component: AuthPage, meta: { title: '登录注册' } },
  { path: '/account', name: 'account', component: AuthPage, meta: { title: '账户中心', requiresAuth: true } },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition
    if (to.hash) return { el: to.hash, top: 95 }
    return { top: 0 }
  },
})

router.beforeEach((to) => {
  document.title = `${to.meta.title || '华夏智游'}｜AI+中华文化`
  if (to.meta.requiresAuth && !localStorage.getItem('huaxia-zhiyou-session')) {
    return { path: '/auth', query: { redirect: to.fullPath } }
  }
  return true
})

export default router
