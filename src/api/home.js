import http from '@/utils/request'

/*
*
* 首页
*
*/

// 首页-展示接口
export function getHomeData() {
  return http.get('/home/data')
}

// 首页-消息通知
export function getMessageList() {
  return http.get('/home/notice')
}
