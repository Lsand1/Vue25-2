<template>
  <main class="topic-page heritage-page">
    <header class="topbar">
      <router-link class="brand" to="/"><b>华</b><span>华夏智游<small>HUAXIA INTELLIGENT JOURNEY</small></span></router-link>
      <nav><router-link to="/">首页</router-link><router-link to="/culture">中华文化</router-link><router-link to="/festivals">传统节日</router-link><router-link to="/heritage" class="active">非遗文化</router-link><router-link to="/workshop">剪纸工坊</router-link><router-link to="/ai">AI助手</router-link></nav>
      <div class="head-actions"><SearchButton /><AccountButton /><MobileNav /></div>
    </header>
    <section class="topic-hero heritage-topic-hero"><div class="topic-hero-copy"><span>INTANGIBLE HERITAGE</span><h1>一双手，留住<br/>会呼吸的文化</h1><p>非遗不只是“被保存”的传统，而是仍在被演、被做、被使用的生活艺术。每一项技艺背后，都有一群让它继续生长的人。</p><button class="topic-primary" @click="$router.push('/detail/京剧')">先听一段京剧　→</button><router-link class="workshop-entry" to="/workshop">亲手做一张窗花 ↗</router-link></div><div class="craft-mark"><b>传</b><i>手艺 · 人 · 生活</i></div></section>
    <nav class="topic-jump-links" aria-label="本页阅读导航"><span>继续探索</span><a href="#reading-lab">互动阅读 ↓</a><a href="#knowledge-check">知识小测 ↓</a></nav>
    <section class="topic-section heritage-statement"><div class="section-kicker">MADE BY HAND, LIVED BY HEART</div><div class="split-heading"><h2>非遗的珍贵，<br/>在于它仍然<em>活着</em></h2><p>它存在于舞台上的一声唱腔、绣架前的一根丝线，也存在于节日窗上的一抹红。走近技艺，便是走近一段仍在继续的生活。</p></div><div class="heritage-stats"><div><b>技</b><span>一门技艺<br/>是一套时间练成的语言</span></div><div><b>人</b><span>一位传承人<br/>是一座活着的文化档案</span></div><div><b>用</b><span>一次使用<br/>让传统重新回到日常</span></div></div></section>
    <section class="topic-section craft-gallery"><article v-for="craft in crafts" :key="craft.title"><div class="craft-cover" :class="craft.theme"><img :src="craft.image" :alt="craft.title" loading="lazy"/><span>{{ craft.kind }}</span><b>{{ craft.mark }}</b></div><small>{{ craft.region }}</small><h2>{{ craft.title }}</h2><p>{{ craft.description }}</p><div class="craft-tags"><span v-for="tag in craft.tags" :key="tag">{{ tag }}</span></div><router-link :to="craft.to">跟着小华了解　↗</router-link></article></section>
    <section class="topic-section maker-section"><div class="maker-quote"><span>THE CRAFT CONTINUES</span><h2>当传统被年轻人<br/>重新使用，它就有了新的明天。</h2><p>买一件手作、听一次戏、参加一场体验课，都是让非遗与当代生活重新相遇的方式。</p></div><div class="maker-actions"><button @click="$router.push('/detail/京剧')"><b>01</b><span>听见舞台上的<br/>百年唱腔</span>↗</button><button @click="$router.push('/workshop')"><b>02</b><span>看见一张红纸里的<br/>民间想象</span>↗</button><button @click="$router.push('/detail/景泰蓝')"><b>03</b><span>发现器物之中的<br/>生活美学</span>↗</button></div></section>
    <ReadingExplorer id="reading-lab" eyebrow="BEHIND THE CRAFT" title="走近手艺的制作现场" description="不只看成品，也看看技艺怎样被实践、理解和传递。" :items="heritageReading" />
    <KnowledgeQuiz id="knowledge-check" :questions="heritageQuiz" />
    <SiteFooter />
  </main>
</template>

<script setup>
import ReadingExplorer from '../components/ReadingExplorer.vue'
import KnowledgeQuiz from '../components/KnowledgeQuiz.vue'
import { heritageReading, heritageQuiz } from '../data/pageLearning'
import paperCutArt from '../assets/paper-cut-window-art.webp'
const craftImages = ['https://images.unsplash.com/photo-1692634338039-75c2b3b9c665?auto=format&fit=crop&w=900&q=85', 'https://www.suzhouprivatetour.com/upload/ueditor/image/20170731/6363709845732031255390366.jpg', paperCutArt]
const crafts = [
  { title: '京剧', kind: '表演艺术', mark: '戏', theme: 'opera', region: '唱腔 · 身段 · 脸谱', description: '唱、念、做、打之间，人物的情感和历史被凝练成独有的舞台语言。', tags: ['脸谱', '程式', '锣鼓'], to: '/detail/京剧' },
  { title: '苏绣', kind: '传统技艺', mark: '绣', theme: 'embroidery', region: '江南 · 丝线 · 针法', description: '细若发丝的线，在绣娘指尖铺陈出花鸟、山水与温润克制的江南气韵。', tags: ['双面绣', '丝线', '江南'], to: '/detail/苏绣' },
  { title: '剪纸', kind: '民间美术', mark: '剪', theme: 'papercut', region: '窗花 · 节令 · 祝福', description: '剪刀起落之间，丰收、团圆与吉祥愿望从一张红纸里生长出来。', tags: ['窗花', '纹样', '年俗'], to: '/detail/剪纸' },
].map((craft, index) => ({ ...craft, image: craftImages[index] }))
</script>
