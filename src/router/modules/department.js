import Layout from '@/layout/index'

export default {
  path: '/department',
  component: Layout, // 一级路由
  children: [
    {
      path: '', // 二级路由为空时，表示 /department 显示一级路由+二级路由
      component: () => import('@/views/department/index'),
      name: 'department', // 可以用来跳转，也可以标记路由
      meta: { title: '组织', icon: 'tree' } // 路由元信息，存储数据
    }
  ]

}
