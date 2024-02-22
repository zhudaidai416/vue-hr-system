import http from '@/utils/request'

/*
*
* 审批管理
*
*/

// 查询审批申请列表
export function getApprovalList(data) {
  return http.get(`/user/process/instance/${data.page}/${data.pageSize}`, data)
}

// 获取审批信息
export function getInformation(id) {
  return http.get(`/user/process/instance/getById/${id}`)
}

export function getReviewHistory(id) {
  return http.get(`/approvals/flows/${id}`)
}

export function process(data) {
  return http.post('/approvals/process', data)
}

export function getSetState(params) {
  return http.get('/approvals/setting', { params })
}

// 保存状态
export function saveSetState(data) {
  return http.put('/approvals/setting', data)
}

// 查询审批单的详情数据
export function getApprovalsDetail(id) {
  return http.get(`/user/process/instance/${id}`)
}

// 获取流程详情
export function getApprovalsTaskDetail(id) {
  return http.get(`/user/process/instance/tasks/${id}`)
}

// 下载图片
export function downImg(picture_id) {
  return http.get(`/user/process/buss/showBussImgById/${picture_id}`)
}

// 获取流程列表
export function getFlowList(params) {
  return http.get(`/user/process/definition`, { params })
}

export function suspend(params) {
  return http.get(`/user/process/suspend/${params.processKey}`, { params })
}

export function startProcess(data) {
  return http.post(`/user/process/startProcess`, data)
}

export function applyeLave(data) {
  return http.post(`/user/process_leave/startProcess`, data)
}

// 驳回
export function approvalsReject(data) {
  return http.put(`/user/approvals/${data.id}/reject`, data)
}

// 删除
export function approvalsDel(id) {
  return http.delete(`/user/approvals/${id}`)
}

// 同意
export function approvalsPass(data) {
  return http.put('/user/process/instance/commit', data)
}

export function applyDimission(data) {
  return http.post('/user/process_dimission/startProcess', data)
}

export function applyOvertime(data) {
  return http.post('/user/process_overtime/startProcess', data)
}

export function exportApprovals(data) {
  return http.get(`/approvals/export/${data.month}`, data)
}

export function updateUser(data) {
  return http.put(`/sys/user/${data.id}`, data)
}
