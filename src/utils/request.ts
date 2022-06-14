import axios, { AxiosError, AxiosRequestHeaders, AxiosResponse } from 'axios'
import config from './config'
import router from '../router/index'
import { formatQuery } from './filter'
import { message } from 'ant-design-vue'
import { responseType } from './type'

const defaultHeaders = { 'content-type': 'application/x-www-form-urlencoded' }

export default (method: String = 'get', url: String, data: any = {}, headers: AxiosRequestHeaders = defaultHeaders) => {
  if (headers === defaultHeaders) {
    data = formatQuery(data)
    console.log(data)
  }
  return new Promise((resolve, reject) => {
    const httpRequest: any = axios.create({
      headers,
      baseURL: config.hostname,
      timeout: 5000
    })

    httpRequest.interceptors.request.use((config: AxiosResponse) => {
      const token = localStorage.getItem('token')
      if (token) {
        config.headers.Authorization = 'Bearer ' + token
      }
      return config
    })

    httpRequest.interceptors.response.use(
      ({ data }: { data: responseType }) => {
        switch (data.code) {
          case '200':
          case '500':
            resolve(data)
            break
          case '900':
            router.push('/login')
            break
          case '400':
            message.error(`${data.msg}`)
            // reject(data.msg)
            break
          default:
            break
        }
      },
      ({ code, config }: AxiosError) => {
        if (code === 'ECONNABORTED') {
          message.error(`请求超时：${config.url}`)
        }
        // response && message.error(response)
        return reject(new Error('请求失败'))
      }
    )
    httpRequest({
      method,
      url,
      data
    })
  })
}
