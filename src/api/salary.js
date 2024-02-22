import http from '@/utils/request'

/*
*
* 工资管理
*
*/

export function getSalarysList(data) {
  return http.post('/salarys/list', data)
}

export function getEmployeeList(params) {
  return http.get('/sys/user', { params })
}

export function getTips(yearMonth) {
  return http.get(`/salarys/tips/${yearMonth}`)
}

export function getSettings() {
  return http.get('/salarys/settings')
}

export function getCompanySetting() {
  return http.get('/salarys/company-settings')
}

export function saveSettings(data) {
  return http.post('/salarys/settings', data)
}

export function getSalaryDetail(userId) {
  return http.get(`/salarys/modify/${userId}`)
}

export function changeSalary(data) {
  return http.post(`/salarys/modify/${data.userId}`, data)
}

export function initSalary(data) {
  return http.post(`/salarys/init/${data.userId}`, data)
}

export function getArchivingList(params) {
  return http.get(`/salarys/reports/${params.year}`, { params })
}

export function getArchivingCont(params) {
  return http.get(`/salarys/reports/${params.yearMonth}`, { params })
}

export function newReport(data) {
  return http.put(`/salarys/reports/${data.yearMonth}/newReport`, data)
}

export function getArchivingExport(params) {
  return http.get(`/salarys/reports/${params.yearMonth}/export`, { params })
}

export function getArchivingFirst(params) {
  return http.get(`/salarys/reports/${params.yearMonth}/first`, { params })
}

export function getArchivingArchive(data) {
  return http.post(`/salarys/reports/${data.yearMonth}/archive`, data)
}
