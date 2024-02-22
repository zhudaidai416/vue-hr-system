import http from '@/utils/request'

/*
*
* 员工管理
*
*/

// 获取-员工列表
export function getEmployeeList(params) {
  return http.get('/sys/user', { params })
}

// 批量-导出员工excel
export function exportExcelEmployee() {
  return http.get('/sys/user/export', { responseType: 'blob' })
  // return http({
  //   url: '/sys/user/export',
  //   method: 'get',
  //   // 改变接收数据的类型
  //   responseType: 'blob' // 使用blob接收二进制文件流
  // })
}

// 批量-下载导入员工模板
export function getImportExcelTemplate() {
  return http.get('/sys/user/import/template', { responseType: 'blob' })
}

// 批量-导入员工(上传excel)
export function importExcelEmployee(data) {
  return http.post('/sys/user/import', data)
}

// 删除-员工
export function delEmployee(id) {
  return http.delete(`/sys/user/${id}`)
}

// 新增-员工
export function addEmployee(data) {
  return http.post('/sys/user', data)
}

// 获取-员工-基本信息
export function getEmployeeDetail(id) {
  return http.get(`/sys/user/${id}`)
}

// 修改-员工-基本信息
export function updateEmployee(data) {
  return http.put(`/sys/user/${data.id}`, data)
}

// 分配-员工-角色
export function assignRole(data) {
  return http.put('/sys/user/assignRoles', data)
}
