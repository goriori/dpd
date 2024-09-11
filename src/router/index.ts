import { createRouter, createWebHistory } from 'vue-router'

const MainView = () => import('@/pages/Main.vue')
const StandbyView = () => import('@/pages/Standby.vue')
const GameView = () => import('@/pages/Game.vue')
const FeedbackView = () => import('@/pages/Feedback.vue')

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'standby',
      component: StandbyView,
    },
    {
      path: '/main',
      name: 'main',
      component: MainView,
    },
    {
      path: '/game',
      name: 'game',
      component: GameView,
    },
    {
      path: '/feedback',
      name: 'feedback',
      component: FeedbackView,
    },
  ],
})
router.beforeEach((_to, _from, next) => {
  next()
})
export default router
