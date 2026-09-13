<template>
  <Teleport to="body">
    <Transition name="search-fade">
      <div v-if="open" class="search-overlay" @click.self="close">
        <section class="search-panel" role="dialog" aria-modal="true" aria-label="文化内容搜索">
          <div class="search-panel-head">
            <div>
              <span>EXPLORE HUAXIA</span>
              <h2>搜索文化内容</h2>
            </div>
            <button type="button" aria-label="关闭搜索" @click="close">×</button>
          </div>
          <label class="search-field">
            <span>⌕</span>
            <input ref="input" v-model="keyword" type="search" placeholder="搜索故宫、京剧、中秋、剪纸……" @keydown.esc="close" />
          </label>
          <div class="search-meta">{{ keyword ? `找到 ${results.length} 个相关内容` : '热门探索：故宫 · 京剧 · 中秋 · 剪纸' }}</div>
          <div class="search-results">
            <button v-for="item in results" :key="item.title" type="button" @click="go(item)">
              <span>{{ item.category }}</span>
              <strong>{{ item.title }}</strong>
              <p>{{ item.description }}</p>
              <i>→</i>
            </button>
            <p v-if="keyword && !results.length" class="no-results">暂未找到相关内容，试试“故宫”“京剧”或“中秋”。</p>
          </div>
        </section>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { computed, nextTick, onBeforeUnmount, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const open = ref(false)
const keyword = ref('')
const input = ref(null)

const content = [
  { title: '故宫', category: '华夏名胜', description: '从中轴礼序读懂中国古代宫殿建筑。', to: '/detail/故宫' },
  { title: '京剧', category: '非遗文化', description: '脸谱、唱腔与程式化动作共同构成舞台艺术。', to: '/detail/京剧' },
  { title: '剪纸', category: '非遗文化', description: '把节令情感与吉祥愿望镂刻在一张红纸上。', to: '/heritage' },
  { title: '苏绣', category: '非遗文化', description: '在细密针法与丝线之间，感受江南工艺之美。', to: '/heritage' },
  { title: '春节', category: '传统节日', description: '从贴春联、守岁到家宴团聚，感受中国年的温度。', to: '/festivals' },
  { title: '端午', category: '传统节日', description: '赛龙舟与粽子背后的纪念、祈福与团聚。', to: '/festivals' },
  { title: '中秋节', category: '传统节日', description: '在赏月与团圆里感受共享月华的中华审美。', to: '/detail/中秋节' },
  { title: '千里江山图', category: '中华文化', description: '用青绿山水体会山河与心境相映的审美传统。', to: '/culture' },
  { title: '景泰蓝', category: '中华文化', description: '看见器物之中流动的匠心与生活美学。', to: '/culture' },
]

const results = computed(() => {
  const query = keyword.value.trim().toLowerCase()
  if (!query) return content.slice(0, 5)
  return content.filter((item) => `${item.title}${item.category}${item.description}`.toLowerCase().includes(query))
})

async function show() {
  open.value = true
  keyword.value = ''
  await nextTick()
  input.value?.focus()
}

function close() {
  open.value = false
}

function go(item) {
  close()
  router.push(item.to)
}

function onSearchOpen() {
  show()
}

function onKeydown(event) {
  if (event.key === 'Escape' && open.value) close()
}

onMounted(() => {
  window.addEventListener('culture-search:open', onSearchOpen)
  window.addEventListener('keydown', onKeydown)
})

onBeforeUnmount(() => {
  window.removeEventListener('culture-search:open', onSearchOpen)
  window.removeEventListener('keydown', onKeydown)
})
</script>
