import http from '@/utils/request'

export function login(data) {
  return http.post('/sys/login', data)
}

export function getUserInfo() {
  return http.get('/sys/profile')
}

export function updatePassword(data) {
  return http.put('/sys/user/updatePass', data)
}

