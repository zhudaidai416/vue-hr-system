import http from '@/utils/request'

/*
*
* 权限管理
*
*/

// 获取-权限点列表
export function getPermissionList() {
  return http.get('/sys/permission')
}

// 新增-权限点
export function addPermission(data) {
  return http.post('/sys/permission', data)
}

// 修改-权限点详情
export function updatePermission(data) {
  return http.put(`/sys/permission/${data.id}`, data)
}

// 删除-权限点
export function delPermission(id) {
  return http.delete(`/sys/permission/${id}`)
}

// 获取-权限点详情
export function getPermissionDetail(id) {
  return http.get(`/sys/permission/${id}`)
}
