import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'

function installAiProxy(server, env) {
  const apiKey = env.DEEPSEEK_API_KEY || env.VITE_OPENAI_API_KEY
  const baseUrl = (env.DEEPSEEK_BASE_URL || env.VITE_OPENAI_BASE_URL || 'https://api.deepseek.com').replace(/\/$/, '')
  const model = env.DEEPSEEK_MODEL || env.VITE_OPENAI_MODEL || 'deepseek-v4-flash'

  server.middlewares.use('/api/ai/chat', async (request, response) => {
    response.setHeader('Content-Type', 'application/json; charset=utf-8')
    if (request.method !== 'POST') { response.statusCode = 405; response.end(JSON.stringify({ error: '仅支持 POST 请求。' })); return }
    if (!apiKey) { response.statusCode = 500; response.end(JSON.stringify({ error: '未配置 AI 服务密钥。' })); return }

    try {
      let rawBody = ''
      for await (const chunk of request) rawBody += chunk
      const body = JSON.parse(rawBody || '{}')
      const context = String(body.context || '华夏智游网站').slice(0, 200)
      const messages = Array.isArray(body.messages) ? body.messages.slice(-12) : []
      const safeMessages = messages
        .filter((item) => item && ['user', 'assistant'].includes(item.role) && typeof item.text === 'string')
        .map((item) => ({ role: item.role, content: item.text.slice(0, 2000) }))
      if (!safeMessages.length) { response.statusCode = 400; response.end(JSON.stringify({ error: '请输入想了解的文化问题。' })); return }

      const upstream = await fetch(`${baseUrl}/chat/completions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${apiKey}` },
        body: JSON.stringify({
          model,
          thinking: { type: 'disabled' },
          temperature: 0.7,
          max_tokens: 900,
          messages: [{ role: 'system', content: `你是“华夏智游”的 AI 文化助手小华。用户当前页面：${context}。请用简洁、友好、准确的中文回答中华文化、传统节日、非遗、名胜、历史与艺术问题。若问题超出文化范围，也可礼貌回答，但不要编造事实。` }, ...safeMessages],
        }),
      })
      const payload = await upstream.json().catch(() => ({}))
      if (!upstream.ok) { response.statusCode = upstream.status; response.end(JSON.stringify({ error: payload?.error?.message || 'DeepSeek 请求失败。' })); return }
      const content = payload?.choices?.[0]?.message?.content?.trim()
      if (!content) { response.statusCode = 502; response.end(JSON.stringify({ error: 'DeepSeek 未返回有效回答。' })); return }
      response.end(JSON.stringify({ content }))
    } catch (error) {
      response.statusCode = 500
      response.end(JSON.stringify({ error: error instanceof Error ? error.message : 'AI 服务连接失败。' }))
    }
  })
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  return {
    plugins: [
      vue(),
      {
        name: 'huaxia-ai-proxy',
        configureServer(server) { installAiProxy(server, env) },
        configurePreviewServer(server) { installAiProxy(server, env) },
      },
    ],
  }
})
