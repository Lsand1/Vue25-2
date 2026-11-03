<template>
  <main class="ai-page">
    <header class="topbar">
      <router-link class="brand" to="/"><b>华</b><span>华夏智游<small>HUAXIA INTELLIGENT JOURNEY</small></span></router-link>
      <nav>
        <router-link to="/">首页</router-link>
        <router-link to="/culture">中华文化</router-link>
        <router-link to="/festivals">传统节日</router-link>
        <router-link to="/heritage">非遗文化</router-link>
        <router-link to="/workshop">剪纸工坊</router-link><router-link to="/ai" class="active">AI助手</router-link>
      </nav>
      <div class="head-actions">
        <SearchButton />
        <AccountButton /><MobileNav />
      </div>
    </header>

    <section class="page-hero small-hero ai-hero">
      <div>
        <span>ASK · DISCOVER · EXPLORE</span>
        <h1>从一个问题，<br/>走近千年文化</h1>
        <p>典故、风俗与山河之间，你的好奇，都可以从这里开始。</p>
      </div>
    </section>

    <section class="ai-layout">
      <div class="ai-chat-panel">
        <div class="chat-header">
          <div class="chat-title"><b class="ai-monogram">华</b><span>小华 · 文化助手<small>你的中华文化探索伙伴</small></span></div>
          <span class="online-badge">文化问答</span>
        </div>

        <div class="error-banner" v-if="error">{{ error }}</div>

        <div ref="chatBody" class="chat-body" aria-live="polite" aria-label="对话记录">
          <div v-for="(message, index) in messages" :key="index" class="msg" :class="message.role">
            <b v-if="message.role === 'assistant'">华</b>
            <div>{{ message.text }}</div>
          </div>

        </div>

        <div class="quick-tags">
          <button @click="addPrompt('为什么春节要贴春联？')">为什么春节要贴春联？</button>
          <button @click="addPrompt('介绍一下京剧的艺术特色')">介绍一下京剧的艺术特色</button>
          <button @click="addPrompt('故宫为什么被称为中国古代建筑的代表？')">故宫为什么重要？</button>
        </div>

        <div class="chat-input-row">
          <input v-model="inputText" aria-label="向小华提问" placeholder="输入你想了解的中华文化内容…" @keydown.enter="!$event.isComposing && sendMessage()" />
          <button class="send-btn" @click="sendMessage" :disabled="isLoading">发送</button>
        </div>
      </div>

      <aside class="ai-sidebar">
        <div class="recommend-card">
          <span class="sidebar-kicker">A LITTLE INSPIRATION</span>
          <h3>好奇，从这里开始</h3>
          <p>选择一个主题，开启新的探索。</p>
          <div class="ai-topic-list"><button v-for="(topic, index) in ['京剧', '春节', '故宫', '中国书法']" :key="topic" @click="addPrompt('请介绍一下' + topic)"><small>0{{ index + 1 }}</small>{{ topic }}<span>↗</span></button></div>
        </div>

        <div class="recommend-card">
          <span class="sidebar-kicker">KEEP EXPLORING</span>
          <h3>让好奇走得更远</h3>
          <p>也可以从文化专题中寻找灵感，带着新的问题回来。</p>
          <router-link to="/culture" class="sidebar-link">走进中华文化 →</router-link>
        </div>
      </aside>
    </section>
    <SiteFooter />
  </main>
</template>

<script setup>
import { nextTick, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { askXiaohua } from '../services/ai'

const messages = ref([
  {
    role: 'assistant',
    text: '你好，我是华夏智游 AI 文化助手。今天想了解哪一段中华文化？',
  },
])

const inputText = ref('')
const chatBody = ref(null)
const route = useRoute()
watch(() => route.query.topic, (topic) => { if (typeof topic === 'string') inputText.value = `请介绍一下${topic.slice(0, 40)}` }, { immediate: true })
const isLoading = ref(false)
const error = ref('')
watch(messages, async () => { await nextTick(); if (chatBody.value) chatBody.value.scrollTop = chatBody.value.scrollHeight }, { deep: true })

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
