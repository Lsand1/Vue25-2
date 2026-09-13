import axios from 'axios'

const cultureClient = axios.create({
  baseURL: '/api/mock',
  timeout: 5000,
})

cultureClient.interceptors.response.use(
  (response) => response.data,
  (error) => Promise.reject(new Error(error.response?.data?.message || '文化数据暂时无法加载')),
)

export async function getCultureHighlights() {
  const result = await cultureClient.get('/culture-highlights')
  if (result.code !== 0 || !Array.isArray(result.data)) throw new Error(result.message || '文化数据格式异常')
  return result.data
}
