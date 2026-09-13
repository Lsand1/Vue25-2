<template>
  <main>
    <header class="topbar">
      <a class="brand" href="#home"><b>华</b><span>华夏智游<small>HUAXIA INTELLIGENT JOURNEY</small></span></a>
      <nav>
        <router-link to="/">首页</router-link>
        <router-link to="/culture">中华文化</router-link>
        <router-link to="/festivals">传统节日</router-link>
        <router-link to="/heritage">非遗文化</router-link>
        <router-link to="/ai" class="active">AI助手</router-link>
      </nav>
      <div class="head-actions">
        <SearchButton />
        <AccountButton />
      </div>
    </header>

    <section class="page-hero small-hero ai-hero">
      <div>
        <span>AI文化助手</span>
        <h1>用真实 AI，跟我一起探索中华文化的细节与故事</h1>
      </div>
    </section>

    <section class="ai-layout">
      <div class="ai-chat-panel">
        <div class="chat-header">
          <div class="chat-title">🐉 华夏智游 AI文化助手</div>
          <span class="online-badge">在线</span>
        </div>

        <div class="error-banner" v-if="error">{{ error }}</div>

        <div class="chat-body">
          <div v-for="(message, index) in messages" :key="index" class="msg" :class="message.role">
            <b v-if="message.role === 'assistant'">🐉</b>
            <div>{{ message.text }}</div>
          </div>

          <div v-if="isLoading" class="msg assistant">
            <b>🐉</b>
            <div>正在思考中……</div>
          </div>
        </div>

        <div class="quick-tags">
          <button @click="addPrompt('为什么春节要贴春联？')">为什么春节要贴春联？</button>
          <button @click="addPrompt('介绍一下京剧的艺术特色')">介绍一下京剧的艺术特色</button>
          <button @click="addPrompt('故宫为什么被称为中国古代建筑的代表？')">故宫为什么重要？</button>
        </div>

        <div class="chat-input-row">
          <input v-model="inputText" placeholder="输入你想了解的中华文化内容…" @keyup.enter="sendMessage" />
          <button class="send-btn" @click="sendMessage" :disabled="isLoading">发送</button>
        </div>
      </div>

      <aside class="ai-sidebar">
        <div class="recommend-card">
          <h3>✨ 猜你想了解</h3>
          <p>猜你会对这些内容感兴趣：</p>
          <ul>
            <li>🎭 京剧</li>
            <li>🏮 春节</li>
            <li>🏯 故宫</li>
            <li>📜 中国书法</li>
          </ul>
        </div>

        <div class="recommend-card">
          <h3>🧭 AI对话说明</h3>
          <p>当前已接入你提供的 DeepSeek API 环境变量，支持真实 AI 回复。</p>
        </div>
      </aside>
    </section>
  </main>
</template>

<script setup>
import { ref } from 'vue'
import { askXiaohua } from '../services/ai'

const messages = ref([
  {
    role: 'assistant',
    text: '你好，我是华夏智游 AI 文化助手。今天想了解哪一段中华文化？',
  },
])

const inputText = ref('')
const isLoading = ref(false)
const error = ref('')

function addPrompt(text) {
  inputText.value = text
}

async function sendMessage() {
  if (!inputText.value.trim() || isLoading.value) return

  const userText = inputText.value.trim()
  inputText.value = ''
  messages.value.push({ role: 'user', text: userText })
  messages.value.push({ role: 'assistant', text: '正在思考中……' })
  isLoading.value = true
  error.value = ''

  try {
    const result = await askXiaohua(messages.value.slice(0, -1).map((item) => ({
      role: item.role === 'assistant' ? 'assistant' : 'user',
      text: item.text,
    })), 'AI文化助手专题页')

    messages.value = messages.value.filter((item) => item.text !== '正在思考中……')
    messages.value.push({ role: 'assistant', text: result.trim() })
  } catch (err) {
    messages.value = messages.value.filter((item) => item.text !== '正在思考中……')
    messages.value.push({
      role: 'assistant',
      text: '抱歉，当前 AI 接口暂时不可用。请检查环境变量、接口地址或 API Key 是否正确。',
    })
    error.value = err.message || '请求失败'
  } finally {
    isLoading.value = false
  }
}
</script>
