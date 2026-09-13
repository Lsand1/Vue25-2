const endpoint = '/api/ai/chat'

export async function askXiaohua(messages, context = '华夏智游网站') {
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ messages, context }),
  })
  const data = await response.json().catch(() => ({}))
  if (!response.ok) throw new Error(data.error || 'AI 服务暂时不可用。')
  if (!data.content) throw new Error('AI 未返回有效内容。')
  return data.content
}
