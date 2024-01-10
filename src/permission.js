import router from '@/router'
import NProgress from 'nprogress' // 进度条
import 'nprogress/nprogress.css'
import store from '@/store'

// 白名单：不需要登录就可以访问
const whiteList = ['/login', '/404']

// 路由前置守卫
router.beforeEach(async(to, from, next) => {
  NProgress.start() // 开启进度条
  if (store.getters.token) {
    if (to.path === '/login') {
      next('/') // 中转到主页
      // next(地址)并没有执行后置守卫，进度条需手动关闭
      NProgress.done()
    } else {
      // 判断是否获取用户资料
      if (!store.getters.userId) {
        await store.dispatch('user/getUserInfo')
      }
      next()
    }
  } else {
    if (whiteList.includes(to.path)) { // 写法2：whiteList.indexOf(to.path) > -1
      next()
    } else {
      next('/login') // 中转到登录页
      NProgress.done()
    }
  }
})

// 路由后置守卫
router.afterEach(() => {
  NProgress.done() // 关闭进度条
})
