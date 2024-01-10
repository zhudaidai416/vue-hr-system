import Layout from '@/layout/index'

export default {
  path: '/approval',
  component: Layout,
  children: [
    {
      path: '',
      name: 'approval',
      component: () => import('@/views/approval'),
      meta: { title: '审批', icon: 'tree-table' }
    }
  ]
}
