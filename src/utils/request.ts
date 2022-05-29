import axios from 'axios'
import config from './config'
import router from '../router/index'
import { formatQuery } from './filter'

export default (method: String = 'get', url: String, data: any = {}, headers: any = {}) => {
  if (method !== 'get') {
    data = formatQuery(data)
  }
  return new Promise((resolve, reject) => {
    const httpRequest: any = axios.create({
      headers: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      baseURL: config.hostname,
      timeout: 10000
    })

    httpRequest.interceptors.request.use((config: any) => {
      const token = localStorage.getItem('token')
      // let token = '5cada3b0-b36e-4df8-bb66-23420f3c12ca'
      if (token) {
        config.headers.Authorization = 'Bearer ' + token
      }
      return config
    })

    httpRequest.interceptors.response.use(({ data, headers }: { data: any; headers: any }) => {
      switch (data.code) {
        case '200':
        case '500':
          resolve(data)
          break
        case '900':
          router.push('/login')
          break
        case '400':
          break
        default:
          break
      }
    })
    httpRequest({
      method,
      url,
      data
    })
  })
}
