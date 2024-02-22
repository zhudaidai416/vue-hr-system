import Layout from '@/layout'

export default {
  path: '/employee',
  name: 'employee',
  component: Layout,
  children: [
    {
      path: '',
      name: 'employee',
      component: () => import('@/views/employee'),
      meta: { title: '员工', icon: 'people' }
    },
    {
      path: '/employee/detail/:id?', // :id：路由传参   ?：可有可无
      component: () => import('@/views/employee/detail'),
      hidden: true, // 表示隐藏在左侧菜单
      meta: { title: '添加员工' }
    }
  ]
}
