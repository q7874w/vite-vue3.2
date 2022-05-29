// 转换query
export const formatQuery = (query: { [key: string]: any }) => {
  let newQuery = ''
  for (const key in query) {
    if (key !== 'totalNum' && !['', null, undefined].includes(query[key])) {
      newQuery += `&${key}=${query[key]}`
    }
  }
  return newQuery.slice(1)
}
