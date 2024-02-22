import router from '@/router'
import NProgress from 'nprogress' // 进度条
import 'nprogress/nprogress.css'
import store from '@/store'
import { asyncRoutes } from '@/router'

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
        const { roles } = await store.dispatch('user/getUserInfo')

        // 路由筛选
        const filterRoutes = asyncRoutes.filter(item => roles.menus.includes(item.name))
        // console.log('🚀 ~ router.beforeEach ~ filterRoutes:', filterRoutes)

        store.commit('user/setRoutes', filterRoutes)

        // 添加动态路由信息到路由表
        // 404必须放在所有路由的最后
        router.addRoutes([...filterRoutes, { path: '*', redirect: '/404', hidden: true }])
        // 需要转发，目的是让路由拥有信息，router的已知缺陷
        next(to.path)
      } else {
        next() // 放过
      }
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
