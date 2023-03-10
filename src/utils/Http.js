import axios from 'axios'
import { getToken } from '@/utils'
// 创建axios对象并添加一些功能
const http = axios.create({
  baseURL: 'http://geek.itheima.net/v1_0',
  timeout: 5000
})

//添加请求拦截器
http.interceptors.request.use((config) => {

  // if not login add token
  //假如登入了将在请求后端数据时自动加入token防止被拦截，每次请求都要求token也就可以反爬
  const token = getToken()
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// 添加响应拦截器
http.interceptors.response.use((response) => {
  // 2xx 范围内的状态码都会触发该函数。
  // 对响应数据做点什么
  // 返回对象的data部分就不用在data.data了
  return response.data
}, (error) => {
  // 超出 2xx 范围的状态码都会触发该函数。
  // 对响应错误做点什么
  return Promise.reject(error)
})

export { http }