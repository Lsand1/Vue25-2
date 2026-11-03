<template>
  <div class="mobile-nav">
    <button type="button" class="mobile-nav-toggle" :aria-expanded="open" aria-controls="mobile-nav-links" aria-label="打开导航菜单" @click="open = !open">☰</button>
    <div v-if="open" id="mobile-nav-links" class="mobile-nav-links">
      <router-link v-for="item in links" :key="item.to" :to="item.to" @click="open = false">{{ item.label }}</router-link>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'

const open = ref(false)
const route = useRoute()
const links = [
  { to: '/', label: '首页' },
  { to: '/culture', label: '中华文化' },
  { to: '/festivals', label: '传统节日' },
  { to: '/heritage', label: '非遗文化' },
  { to: '/ai', label: 'AI助手' },
  { to: '/workshop', label: '剪纸工坊' },
]
watch(() => route.fullPath, () => { open.value = false })
</script>
