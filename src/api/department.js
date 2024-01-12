import http from '@/utils/request'

/*
*
* 组织架构
*
*/

// 获取-部门列表
export function getDepartmentList() {
  return http.get('/company/department')
}

// 获取-部门负责人列表
export function getManagerList() {
  return http.get('/sys/user/simple')
}

// 新增-部门
export function addDepartment(data) {
  return http.post('/company/department', data)
}

// 获取-部门详情
export function getDepartmentDetail(id) {
  return http.get(`/company/department/${id}`)
}
