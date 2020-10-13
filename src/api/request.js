import axios from 'axios'

const service = axios.create({
  timeout: 30000,
  baseURL: 'http://127.0.0.1:8081',
})

// 添加request拦截器
service.interceptors.request.use(config => {
  return Promise.resolve(config)
}, error => {
  Promise.reject(error)
})

// 添加response拦截器
service.interceptors.response.use(
  response => {
    let res = {}
    res.data = response.data
    res.status = response.status
    return res
  },
  error => {
    return Promise.reject(error.response);
  }
)

export default service 