export type Page = {
  current?: string | number
  size?: string | number
  total?: string | number
}
export type responseType = {
  code: number
  data?: object | string | Array<any>
  msg?: string
  total?: number
}
