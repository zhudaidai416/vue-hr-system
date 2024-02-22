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

// 修改-角色
export function updateRole(data) {
  return http.put(`/sys/role/${data.id}`, data)
}

// 删除-角色
export function delRole(id) {
  return http.delete(`/sys/role/${id}`)
}

// 获取-已启用的角色列表
export function getEnabledRoleList() {
  return http.get('/sys/role/list/enabled')
}

// 获取-角色详情
export function getRoleDetail(id) {
  return http.get(`/sys/role/${id}`)
}

// 分配权限-角色
export function assignPermission(data) {
  return http.put('/sys/role/assignPrem', data)
}
