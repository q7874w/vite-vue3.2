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
export const ElLoginApi = (data: Object) => {
  return request('post', '/function/user/manageLogin', data)
}
export const getLabelApi = (data: Object) => {
  return request('get', '/business/evaluationRecord/getEvaluationList', data)
}
