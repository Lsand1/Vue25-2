<template>
  <main class="topic-page festival-page">
    <header class="topbar">
      <router-link class="brand" to="/"><b>华</b><span>华夏智游<small>HUAXIA INTELLIGENT JOURNEY</small></span></router-link>
      <nav><router-link to="/">首页</router-link><router-link to="/culture">中华文化</router-link><router-link to="/festivals" class="active">传统节日</router-link><router-link to="/heritage">非遗文化</router-link><router-link to="/workshop">剪纸工坊</router-link><router-link to="/ai">AI助手</router-link></nav>
      <div class="head-actions"><SearchButton /><AccountButton /><MobileNav /></div>
    </header>
    <section class="topic-hero festival-hero"><div class="topic-hero-copy"><span>FESTIVALS OF CHINA</span><h1>顺着一年四季<br/>重逢中国人的节日</h1><p>节日是关于时间的仪式：在相聚、纪念与祈愿中，我们与自然同频，也与家人彼此相连。</p><button class="topic-primary" @click="$router.push('/detail/中秋节')">从团圆的中秋开始　→</button></div><div class="moon-art"><b>月</b><i>团圆 · 思念 · 丰收</i></div></section>
    <nav class="topic-jump-links" aria-label="本页阅读导航"><span>继续探索</span><a href="#reading-lab">互动阅读 ↓</a><a href="#knowledge-check">知识小测 ↓</a></nav>
    <section class="topic-section festival-calendar"><div class="section-kicker">YEAR IN MOTION</div><div class="split-heading"><h2>把一年过成<br/><em>有温度的时间</em></h2><p>从新春的爆竹，到中秋的月色，传统节日把季节变化、家人相聚与共同愿望编织成每个人都熟悉的生活节奏。</p></div><div class="season-line"><span>春</span><i></i><span>夏</span><i></i><span>秋</span><i></i><span>冬</span></div></section>
    <section class="topic-section festival-grid"><article v-for="(festival, index) in festivals" :key="festival.title" :class="festival.theme"><div class="festival-card-top"><span>0{{ index + 1 }} / {{ festival.time }}</span><b>{{ festival.symbol }}</b></div><h2>{{ festival.title }}</h2><p>{{ festival.description }}</p><div class="rituals"><small>节日记忆</small><span v-for="ritual in festival.rituals" :key="ritual">{{ ritual }}</span></div><div v-if="expanded === festival.title" :id="`festival-note-${index}`" class="festival-notes"><p>{{ notes[index] }}</p><router-link :to="festival.to">阅读{{ festival.title }}专题 →</router-link></div><button :aria-expanded="expanded === festival.title" :aria-controls="`festival-note-${index}`" @click="expanded = expanded === festival.title ? '' : festival.title">{{ expanded === festival.title ? '收起节日习俗 −' : '阅读节日习俗 ＋' }}</button></article></section>
    <section class="topic-section ritual-section"><div><span>RITUALS IN DAILY LIFE</span><h2>节日的意义，<br/>藏在一起完成的小事里</h2></div><ul><li v-for="item in ritualNotes" :key="item.title"><b>{{ item.no }}</b><div><h3>{{ item.title }}</h3><p>{{ item.text }}</p></div></li></ul></section>
    <ReadingExplorer id="reading-lab" eyebrow="MEMORIES WE SHARE" title="把节日，读进生活" description="切换一个节日，看看习俗背后的共同参与与地方记忆。" :items="festivalReading" />
    <KnowledgeQuiz id="knowledge-check" :questions="festivalQuiz" />
    <SiteFooter />
  </main>
</template>

<script setup>
import ReadingExplorer from '../components/ReadingExplorer.vue'
import KnowledgeQuiz from '../components/KnowledgeQuiz.vue'
import { festivalReading, festivalQuiz } from '../data/pageLearning'
import { ref } from 'vue'
const expanded = ref('')
const notes = ['春联把对新年的祝愿写在门上，守岁与拜年则让亲人、邻里在辞旧迎新中重新相聚。各地年俗各有特色，共同寄托着平安与丰收的愿望。', '端午的习俗因地域而异。龙舟竞渡、包粽子、挂艾草和佩香囊，让纪念、祈愿与日常生活在初夏相遇。', '中秋夜，赏月与分享月饼寄托着团圆的心意。不同地方还有燃灯、观潮等习俗，一轮明月连接着各地的节日记忆。']
const festivals = [
  { title: '春节', time: '农历正月初一', symbol: '春', theme: 'spring', description: '辞旧迎新的一天，也是家庭重新围坐、把祝福写进门楣的日子。', rituals: ['贴春联', '守岁', '拜年'], to: '/detail/春节' },
  { title: '端午', time: '农历五月初五', symbol: '舟', theme: 'summer', description: '艾草的清香、龙舟的鼓点，让纪念、祈福与勇气在初夏相遇。', rituals: ['赛龙舟', '包粽子', '佩香囊'], to: '/detail/端午' },
  { title: '中秋', time: '农历八月十五', symbol: '月', theme: 'autumn', description: '一轮明月照见千里共此时，也把思念与团圆放进一顿家宴。', rituals: ['赏明月', '吃月饼', '点花灯'], to: '/detail/中秋节' },
]
const ritualNotes = [
  { no: '01', title: '与自然对话', text: '节日依循月相、节气与农时，让人们在变化的季节里感知天地。' },
  { no: '02', title: '与亲人相聚', text: '团圆饭、走亲访友与一句问候，让时间拥有可以分享的温度。' },
  { no: '03', title: '与记忆相连', text: '一项习俗、一味食物，都让家族与地域的故事被一代代继续讲述。' },
]
</script>
