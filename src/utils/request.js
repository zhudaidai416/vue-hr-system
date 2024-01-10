import axios from 'axios'
import store from '@/store'
import { Message } from 'element-ui'
import router from '@/router'

// 创建axios实例
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 10000
})

// 添加请求拦截器
service.interceptors.request.use((config) => {
  // 在发送请求之前做些什么
  // 注入token
  if (store.getters.token) {
    config.headers.Authorization = `Bearer ${store.getters.token}`
  }
  return config
}, (error) => {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// 添加响应拦截器
service.interceptors.response.use((response) => {
  // 2xx 范围内的状态码都会触发该函数
  // 对响应数据做点什么
  const { data, message, success } = response.data
  if (success) {
    return data
  } else {
    Message.error(message)
    return Promise.reject(new Error(message))
  }
}, async(error) => {
  // 超出 2xx 范围的状态码都会触发该函数
  // 对响应错误做点什么
  // token失效
  if (error.response.status === 401) {
    Message.warning('登录过期，请重新登录！')
    await store.dispatch('user/logout')
    router.push('/login')
    return Promise.reject(error)
  }
  Message.error(error.message)
  return Promise.reject(error)
})

export default service
