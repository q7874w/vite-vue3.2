import request from '@utils/request'
interface apiType {
  randomStr?: String | Number
}
export const loginApi = (data: Object) => {
  return request('post', '/admin/server/login', data)
}
export const scrmLoginApi = (data: apiType) => {
  return request('post', `/admin/manager/login?randomStr=${data.randomStr}`, data)
}
export const getMenuListApi = () => {
  return request('get', '/admin/tool/user/admin/menu/info')
}
export const getApplicationApi = (params: Object) => {
  return request('get', '/admin/rest/system/application/info/list', null, params)
}
