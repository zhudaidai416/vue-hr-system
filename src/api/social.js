import http from '@/utils/request'

/*
*
* 社会管理
*
*/

export function getArchivingCont(params) {
  return http.get(`/social_securitys/historys/${params.month}`, { params })
}

export function getArchivingList(data) {
  return http.get(`/social_securitys/historys/${data.year}/list`, data)
}

export function newReport(data) {
  return http.put(`/social_securitys/historys/${data.yearMonth}/newReport`, data)
}

export function getHistorysData(data) {
  return http.get(`/social_securitys/historys/archiveDetail/${data.userId}/${data.yearMonth}`, data)
}

export function getArchivingExport(data) {
  return http.get(`/social_securitys/historys/${data.yearMonth}/export`, data)
}

export function getArchivingFirst(data) {
  return http.get(`/social_securitys/historys/${data.yearMonth}/first`, data)
}

export function getSocialList(data) {
  return http.post('/social_securitys/list', data)
}

export function getArchivingArchive(data) {
  return http.post(`/social_securitys/historys/${data.yearMonth}/archive`, data)
}

export function getTips(yearMonth) {
  return http.get(`/social_securitys/tips/${yearMonth}`)
}

export function saveContent(data) {
  return http.put(`/social_securitys/${data.userId}`, data)
}

export function getContent(userId) {
  return http.get(`/social_securitys/${userId}`)
}

export function getPaymentItemList(id) {
  return http.get(`/social_securitys/payment_item/${id}`)
}

export function getSettings() {
  return http.get('/social_securitys/settings')
}

export function saveSettings(data) {
  return http.post('/social_securitys/settings', data)
}
