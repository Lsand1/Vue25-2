<template>
  <main class="topic-page culture-page">
    <header class="topbar">
      <router-link class="brand" to="/"><b>华</b><span>华夏智游<small>HUAXIA INTELLIGENT JOURNEY</small></span></router-link>
      <nav><router-link to="/">首页</router-link><router-link to="/culture" class="active">中华文化</router-link><router-link to="/festivals">传统节日</router-link><router-link to="/heritage">非遗文化</router-link><router-link to="/ai">AI助手</router-link></nav>
      <div class="head-actions"><SearchButton /><AccountButton /></div>
    </header>
    <section class="topic-hero">
      <div class="topic-hero-copy"><span>CHINESE CIVILIZATION</span><h1>在器物、礼序与山河之间<br/>读懂中华文化</h1><p>它不是停在博物馆里的过去，而是仍在语言、节日、审美和日常选择中流动的共同记忆。</p><button class="topic-primary" @click="$router.push('/detail/故宫')">从故宫中轴线开始　→</button></div>
      <div class="hero-seal"><b>文</b><i>礼 · 艺 · 器 · 境</i></div>
    </section>
    <section class="topic-section culture-intro">
      <div class="section-kicker">A LIVING ARCHIVE</div><div class="split-heading"><h2>文明，从来不是<br/><em>单一的答案</em></h2><p>中华文化以绵延的时间为底，以不同地域、族群与生活方式为经纬。我们从三条线索，重新走近它的精神脉络。</p></div>
      <div class="culture-pillars"><article v-for="item in pillars" :key="item.no"><span>{{ item.no }}</span><i>{{ item.icon }}</i><h3>{{ item.title }}</h3><p>{{ item.description }}</p><button @click="$router.push(item.to)">{{ item.action }}　→</button></article></div>
    </section>
    <ContentSection class="topic-section culture-live-section">
      <template #eyebrow>DAILY CULTURE PICKS</template>
      <template #title><h2>今日文化推荐</h2><p>从一个细节出发，打开通往中华文明的三扇门。</p></template>
      <template #action><el-tag type="success" effect="plain">今日数据已更新</el-tag></template>
      <el-skeleton :loading="loading" :rows="4" animated>
        <div class="live-culture-grid">
          <article v-for="item in highlights" :key="item.id">
            <el-tag size="small" effect="plain">{{ item.category }}</el-tag>
            <h3>{{ item.title }}</h3>
            <p>{{ item.summary }}</p>
            <el-button text type="danger" @click="$router.push(item.route)">继续探索 →</el-button>
          </article>
        </div>
      </el-skeleton>
      <template #footer>
        <el-alert v-if="loadError" :title="loadError" type="error" :closable="false" show-icon />
        <p v-else>推荐内容由本地文化数据服务实时提供。</p>
      </template>
    </ContentSection>
    <section class="topic-section ink-section"><div class="ink-title"><span>CULTURAL THREADS</span><h2>三条线索，通向同一个华夏</h2></div><div class="thread-list"><article v-for="(thread,index) in threads" :key="thread.title"><b>0{{ index + 1 }}</b><div><small>{{ thread.label }}</small><h3>{{ thread.title }}</h3><p>{{ thread.description }}</p></div><button @click="$router.push(thread.to)">探索　↗</button></article></div></section>
    <section class="topic-section quote-section"><p>“文化不是遥远的名词，<br/>而是我们看待世界的方式。”</p><div><span>下一站推荐</span><strong>去看一幅画，读一座城，或听一段戏。</strong><router-link to="/heritage">探索非遗文化　→</router-link></div></section>
  </main>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import ContentSection from '../components/ContentSection.vue'
import { getCultureHighlights } from '../services/cultureApi'

const highlights = ref([])
const loading = ref(true)
const loadError = ref('')

onMounted(async () => {
  try {
    highlights.value = await getCultureHighlights()
  } catch (error) {
    loadError.value = error.message
  } finally {
    loading.value = false
  }
})

const pillars = [
  { no: '01', icon: '礼', title: '礼序与家国', description: '从建筑中轴到日常礼仪，秩序感让人与人、人与天地之间有了恰当的位置。', action: '看故宫礼序', to: '/detail/故宫' },
  { no: '02', icon: '艺', title: '丹青与诗意', description: '山水、书法、诗词把自然与内心写在同一幅画面里，留下含蓄而辽阔的审美。', action: '走近山水', to: '/culture' },
  { no: '03', icon: '器', title: '器物与日常', description: '一只碗、一件衣、一盏灯，都凝结着手作技艺和人们对美好生活的想象。', action: '发现匠心', to: '/heritage' },
]
const threads = [
  { label: '空间叙事', title: '中轴线：建筑里的秩序观', description: '沿着一条轴线展开的宫殿、城门与广场，让“礼”变得可以行走、可以看见。', to: '/detail/故宫' },
  { label: '山河意境', title: '千里江山：画卷里的中国想象', description: '青绿山水并不只是风景，它邀请人走进一种与天地相处的心境。', to: '/culture' },
  { label: '民间创造', title: '手艺传承：生活里的文化密码', description: '从针线到剪刀，从唱腔到木槌，民间技艺把地域记忆留在每一次手工里。', to: '/heritage' },
]
</script>
