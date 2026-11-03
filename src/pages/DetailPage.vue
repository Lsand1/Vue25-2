<template>
  <main v-if="detail" class="detail-page">
    <header class="topbar">
      <router-link class="brand" to="/"><b>华</b><span>华夏智游<small>HUAXIA INTELLIGENT JOURNEY</small></span></router-link>
      <nav><router-link to="/">首页</router-link><router-link to="/culture">中华文化</router-link><router-link to="/festivals">传统节日</router-link><router-link to="/heritage">非遗文化</router-link><router-link to="/workshop">剪纸工坊</router-link><router-link to="/ai">AI助手</router-link></nav>
      <div class="head-actions"><SearchButton /><AccountButton /><MobileNav /></div>
    </header>

    <section class="detail-hero" :class="{ 'detail-hero-illustrated': !detail.cover }" :style="{ '--detail-image': detail.cover ? `url(${detail.cover})` : 'none' }">
      <span v-if="!detail.cover" class="detail-emblem" aria-hidden="true">{{ detail.emblem }}</span>
      <div class="detail-hero-shade"></div>
      <div class="detail-hero-copy"><router-link class="detail-back" :to="detail.backTo">← 返回{{ detail.category }}</router-link><span>{{ detail.eyebrow }}</span><h1>{{ detail.title }}</h1><p>{{ detail.heroText }}</p><div class="detail-meta"><b>{{ detail.period }}</b><i></i><b>{{ detail.location }}</b><i></i><b>{{ detail.category }}</b></div></div>
      <aside class="detail-quote"><span>一句话读懂</span><p>{{ detail.tagline }}</p></aside>
    </section>

    <section class="detail-main">
      <article class="detail-article">
        <div class="article-lead"><span>HUAXIA CULTURAL ARCHIVE</span><p>{{ detail.summary }}</p></div>
        <section v-for="(section, index) in detail.sections" :key="section.title" class="detail-section"><div class="detail-section-no">0{{ index + 1 }}</div><div><h2>{{ section.title }}</h2><p>{{ section.content }}</p></div></section>
        <section class="detail-highlights"><article v-for="highlight in detail.highlights" :key="highlight.title"><span>{{ highlight.label }}</span><h3>{{ highlight.title }}</h3><p>{{ highlight.text }}</p></article></section>
        <section v-if="detail.sources?.length" class="detail-sources"><h2>延伸阅读</h2><p>想了解更多细节，可以继续阅读以下资料。</p><a v-for="source in detail.sources" :key="source.url" :href="source.url" target="_blank" rel="noopener noreferrer">{{ source.title }} ↗</a></section>
      </article>

      <aside class="detail-sidebar">
        <section class="detail-facts"><span>文化档案</span><div v-for="fact in detail.facts" :key="fact.label"><small>{{ fact.label }}</small><b>{{ fact.value }}</b></div></section>
        <section class="detail-ai"><header><b>🐉</b><div><span>小华 · AI文化导游</span><small>正在为你讲解{{ detail.title }}</small></div></header><p v-if="!aiAnswer">想从哪个角度继续了解？</p><div v-if="!aiAnswer" class="detail-prompts"><button v-for="question in detail.questions" :key="question" :disabled="loading" @click="askAI(question)">{{ question }}　→</button></div><div v-else class="detail-ai-answer"><p>{{ aiAnswer }}</p><button @click="aiAnswer = ''">换个问题　↻</button></div><em v-if="loading">小华正在查阅文化资料…</em></section>
      </aside>
    </section>

    <section class="detail-next"><span>CONTINUE THE JOURNEY</span><h2>{{ detail.nextTitle }}</h2><router-link :to="detail.nextTo">{{ detail.nextAction }}　→</router-link></section>
    <SiteFooter />
  </main>
  <main v-else class="detail-not-found">
    <span>内容未找到</span>
    <h1>这段文化旅程暂时不存在</h1>
    <p>请返回首页，继续探索中华文化。</p>
    <router-link to="/">返回首页 →</router-link>
  </main>
</template>

<script setup>
import { computed, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { askXiaohua } from '../services/ai'
import '../detail.css'
import { moreDetails } from '../data/moreDetails'

const route = useRoute()
const loading = ref(false)
const aiAnswer = ref('')

const detailMap = {
  ...moreDetails,
  故宫: { title: '故宫', category: '中华文化', eyebrow: 'THE FORBIDDEN CITY · BEIJING', period: '明清两代', location: '北京中轴线', backTo: '/culture', heroText: '沿着中轴线，走进一座以礼序、尺度与时间写成的宫殿之城。', tagline: '一座城，藏着中国古代建筑的秩序感。', summary: '故宫是中国古代宫殿建筑的代表作，也是中华文明中轴线秩序、礼制与审美的集中体现。穿过一重重门阙与庭院，空间的递进让庄严成为可以被身体感知的体验。', cover: 'https://images.unsplash.com/photo-1680537006773-67878eb8b20a?auto=format&fit=crop&w=1800&q=90', sections: [{ title: '从紫禁城到故宫', content: '故宫始建于明永乐年间，曾是明清两代皇帝居住和处理政务的中心。今天，它从“紫禁城”走向公众，成为理解中国历史、艺术与建筑的重要入口。' }, { title: '中轴线上的礼序', content: '太和殿、中和殿、保和殿依次展开，配合台基、门庭与广场，构成层层递进的空间节奏。这种秩序并不只为壮观，更承载古人对天地、家国与礼仪的理解。' }, { title: '屋檐之下的细节', content: '彩画、藻井、石雕、琉璃瓦与匾额共同构成故宫的视觉语言。每一处装饰都不只是点缀，也在讲述等级、祝愿与工艺之美。' }], highlights: [{ label: '建筑', title: '中轴对称', text: '以清晰的空间主线，建立庄严而有节奏的视觉体验。' }, { label: '工艺', title: '琉璃与彩画', text: '朱墙金瓦与繁复纹样，让建筑在四季光影中不断变化。' }, { label: '故事', title: '六百年时间', text: '宫墙之内，保存着王朝生活，也映照着今天的文化记忆。' }], facts: [{ label: '原名', value: '紫禁城' }, { label: '核心建筑', value: '太和殿' }, { label: '文化关键词', value: '中轴 · 礼序 · 宫殿' }], questions: ['为什么故宫要沿中轴线展开？', '太和殿以前是做什么的？', '故宫屋顶的颜色有什么意义？'], nextTitle: '再听一段舞台上的中华故事', nextAction: '走近京剧', nextTo: '/detail/京剧' },
  京剧: { title: '京剧', category: '非遗文化', eyebrow: 'PEKING OPERA · LIVING HERITAGE', period: '清代中后期', location: '舞台艺术', backTo: '/heritage', heroText: '一方舞台，几种程式，把历史、人物与情感浓缩成中国戏曲的独特语言。', tagline: '唱念做打之间，是人物，也是人生。', summary: '京剧融合文学、音乐、舞蹈、武术与舞台美术，以唱、念、做、打塑造人物，是中国传统戏曲中极具代表性的艺术形式。', cover: 'https://images.unsplash.com/photo-1692634338039-75c2b3b9c665?auto=format&fit=crop&w=1800&q=90', sections: [{ title: '百戏汇流而成', content: '京剧在清代中后期逐渐形成，吸收多种地方戏曲的唱腔、表演与锣鼓经，最终成为具有全国影响力的剧种。' }, { title: '唱念做打的语言', content: '唱是声腔，念是念白，做是身段表演，打是武打与舞蹈化动作。四者共同构成高度提炼又富于情感的戏曲表达。' }, { title: '脸谱并非面具', content: '脸谱通过色彩、线条和构图强化角色性格，它是一套可被观看、也可被读懂的舞台人物语言。' }], highlights: [{ label: '表演', title: '唱念做打', text: '声音、动作与节奏共同完成角色塑造。' }, { label: '视觉', title: '脸谱行当', text: '色彩与装扮帮助观众迅速进入人物世界。' }, { label: '传承', title: '一台戏的功夫', text: '从基本功到剧目，技艺在一代代演员之间传递。' }], facts: [{ label: '核心表达', value: '唱 · 念 · 做 · 打' }, { label: '代表剧目', value: '霸王别姬' }, { label: '文化关键词', value: '脸谱 · 行当 · 程式' }], questions: ['为什么京剧脸谱有不同颜色？', '京剧里的生旦净丑是什么？', '第一次看京剧该从哪部开始？'], nextTitle: '去看一张红纸里的民间想象', nextAction: '探索剪纸', nextTo: '/heritage' },
  中秋节: { title: '中秋节', category: '传统节日', eyebrow: 'MID-AUTUMN FESTIVAL', period: '农历八月十五', location: '月圆之夜', backTo: '/festivals', heroText: '一轮明月，把团圆、思念与丰收的心意照进千家万户。', tagline: '月圆时，人也在寻找彼此。', summary: '中秋节是中华传统节日之一，围绕月亮、秋收与团圆展开。赏月、吃月饼、点花灯，让自然节律与亲情记忆在同一个夜晚相遇。', cover: 'https://images.unsplash.com/photo-1530789253388-582c481c54b0?auto=format&fit=crop&w=1800&q=90', sections: [{ title: '月圆与丰收', content: '中秋正值秋收时节，明月、收成与感恩共同构成节日最初的情感底色。' }, { title: '团圆的想象', content: '无论身在何处，人们借同一轮月亮寄托思念。月饼与团圆饭，便成了可分享的节日语言。' }, { title: '从古诗到花灯', content: '诗词中的月色、民间的花灯和现代家庭的相聚，让这一节日不断拥有新的表达。' }], highlights: [{ label: '食俗', title: '月饼', text: '一枚圆月般的点心，寄托团圆与祝福。' }, { label: '习俗', title: '赏月', text: '在夜色里与自然相望，也与远方亲人相连。' }, { label: '意象', title: '花灯', text: '灯火点亮节日，也照见人们对美好生活的愿望。' }], facts: [{ label: '日期', value: '农历八月十五' }, { label: '核心意象', value: '明月 · 团圆' }, { label: '文化关键词', value: '赏月 · 月饼 · 思念' }], questions: ['为什么中秋节强调团圆？', '月饼最早是怎么来的？', '中秋有哪些有趣的地方习俗？'], nextTitle: '沿着四季，继续阅读节日', nextAction: '探索传统节日', nextTo: '/festivals' },
}

const detail = computed(() => Object.hasOwn(detailMap, route.params.id) ? detailMap[route.params.id] : null)
let requestId = 0
watch(detail, (current) => {
  requestId++
  aiAnswer.value = ''
  loading.value = false
  document.title = `${current?.title || '内容未找到'}｜华夏智游`
}, { immediate: true })
async function askAI(question) {
  const id = ++requestId
  loading.value = true
  aiAnswer.value = ''
  try {
    const answer = await askXiaohua([{ role: 'user', text: question }], `${detail.value.title}详情页`)
    if (id === requestId) aiAnswer.value = answer
  } catch (error) {
    if (id === requestId) aiAnswer.value = `抱歉，小华暂时无法回答：${error.message || 'AI 服务连接失败。'}`
  } finally { if (id === requestId) loading.value = false }
}
</script>
