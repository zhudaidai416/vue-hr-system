import http from '@/utils/request'

/*
*
* 角色管理
*
*/

// 获取-分页查询角色列表
export function getRoleList(params) {
  return http.get('/sys/role', { params })
}

// 新增-角色
export function addRole(data) {
  return http.post('/sys/role', data)
}

