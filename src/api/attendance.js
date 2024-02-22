import http from '@/utils/request'

/*
*
* 考勤管理
*
*/

// 获取考勤列表
export function getAttendancesList(params) {
  return http.get('/attendances', { params })
}

// 获取考勤详情
export function getAtteArchiveDetail(data) {
  return http({
    url: `/attendances/archive/${data.userId}/${data.yearMonth}`
  })
}

export function updateAttendance(data) {
  return http.put(`/attendances/${data.userId}`, data)
}

export function getArchivingList(params) {
  return http.get('/attendances/reports/year', { params })
}

export function getArchivingCont(params) {
  return http.get(`/attendances/reports/${params.atteArchiveMonthlyId}`, { params })
}

export function importArchive(data) {
  return http.post('/archive/atte/export', data)
}

// 提醒接口
export function notify() {
  return http.post('/notify/mail')
}

export function archives(params) {
  return http.get('/attendances/archives', { params })
}

export function newReports(params) {
  return http.get('/attendances/newReports', { params })
}

export function information() {
  return http({})
}

export function pay() {
  return http({})
}

export function reportFormList(params) {
  return http.get('/attendances/reports', { params })
}

// 请假保存
export function leaveSave(data) {
  return http.put('/cfg/leave', data)
}

// 请假获取
export function getLeave(data) {
  return http.post('/cfg/leave/list', data)
}

// 扣款设置保存
export function deductionsSave(data) {
  return http.put('/cfg/deduction', data)
}

// 获取扣款设置
export function getDeductions(data) {
  return http.post('/cfg/ded/list', data)
}

// 加班配置保存
export function overtimeSave(data) {
  return http.put('/cfg/extDuty', data)
}

// 获取加班配置
export function getOvertime(data) {
  return http.post('/cfg/extDuty/item', data)
}

// 考勤数据保存
export function attendanceSave(data) {
  return http.put('/cfg/atte', data)
}

// 考勤数据保存
export function getAttendance(data) {
  return http.post('/cfg/atte/item', data)
}

export function fileUpdate(data) {
  return http.put(`/employee/archives/${data.month}`, data)
}
