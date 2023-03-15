// 创建axios对象并添加一些功能

// 1、添加请求拦截器
// if not login add token
//假如登入了将在请求后端数据时自动加入token防止被拦截（后端用来确定用户的信息），每次请求都要求token也就可以反爬

// 2、添加响应拦截器
// 2xx 范围内的状态码都会触发该函数。对响应数据做点什么，返回对象的data部分就不用在data.data了
// 超出 2xx 范围的状态码都会触发该函数。对响应错误做点什么


// error:token是会自动在两个小时消除，而后当请求后得到的响应将无法识别token，导致401，所以需要编程实现跳转回login
import axios from 'axios'
import { getToken } from '@/utils'
import { history } from '@/utils/history'
import {removeToken} from '@/utils/token'

const http = axios.create({
  baseURL: 'http://geek.itheima.net/v1_0',
  timeout: 5000,
})

// 1、
http.interceptors.request.use((config) => {
  const token = getToken()
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// 2、
http.interceptors.response.use(
  (response) => {
    return response.data
  },
  (error) => {
    console.log(error)
    if (error.response.status === 401) {
      // 删除token
      removeToken()
      // 跳转到登录页
      history.push('/login')
    }
    return Promise.reject(error)
  }
)

export { http }
