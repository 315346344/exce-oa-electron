/**
 * 定时刷新token的处理
 */

import axios from 'axios'
import { message } from 'antd'
import jwt_decode from 'jwt-decode'

// 请求根路径
axios.defaults.baseURL = 'http://10.10.10.137:8889'

// 是否正在刷新 token
let isRefreshing = false

// // 存储请求的数组
let refreshSubscribers: any = []

// 判断token是否过期
const isTokenExpired = () => {
  const present_time = new Date().getTime()
  const expiration_time: any = window.sessionStorage.getItem('exp')
  return expiration_time - present_time <= 60000 ? true : false
}

// 刷新 token 请求
const getRefreshToken = () => {
  const params = {
    access_token: window.sessionStorage.getItem('access_token'),
    refresh_token: window.sessionStorage.getItem('refresh_token'),
  }

  return axios.post('users/refreshlogin', params).then(res => {
    return Promise.resolve(res.data)
  })
}

// 请求拦截器
axios.interceptors.request.use(
  config => {
    if (config.url === '/users/login') return config

    if (isTokenExpired() && config.url !== 'users/refreshlogin') {
      if (!isRefreshing) {
        isRefreshing = true
        // 发起刷新token的请求
        getRefreshToken()
          .then(res => {
            // isRefreshing = false
            window.sessionStorage.setItem('access_token', res.data.access_token)
            window.sessionStorage.setItem(
              'refresh_token',
              res.data.refresh_token,
            )
            const decoded: any = jwt_decode(res.data.access_token)
            window.sessionStorage.setItem(
              'exp',
              (decoded.exp * 1000).toString(),
            )
            // 执行数组里的函数,重新发起被挂起的请求
            config.headers.Authorization = res.data.access_token
            console.log(refreshSubscribers)
            refreshSubscribers.forEach((cb: any) => cb(res.data.access_token))
            // 执行onRefreshed函数后清空数组中保存的请求
            refreshSubscribers = []

            isRefreshing = false

            // console.log('刷新了token')
          })
          .catch(err => {
            message.error('登录已过期，请重新登录')
            // window.location.href = '/users/login'
            return err
          })

        // 返回未执行 resolve 的 Promise
        return new Promise(resolve => {
          // 用函数形式将 resolve 存入，等待刷新后再执行
          refreshSubscribers.push(token => {
            console.log(token)
            config.headers.Authorization = token
            resolve(config)
          })
        })
      } else {
        return config
      }
    } else {
      // 每次请求头携带store中的accessKey
      config.headers.Authorization = window.sessionStorage.getItem(
        'access_token',
      )
      return config
    }
  },
  error => {
    return Promise.reject(error)
  },
)

export default axios
