import http from '@/utils/request'

// 登录
export function login(data) {
  return http.post('/sys/login', data)
}

// 获取-用户基本资料
export function getUserInfo() {
  return http.get('/sys/profile')
}

// 修改用户密码
export function updatePassword(data) {
  return http.put('/sys/user/updatePass', data)
}

