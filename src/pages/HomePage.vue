<template>
  <main class="home-page">
    <header class="topbar">
      <a class="brand" href="#home"><b>华</b><span>华夏智游<small>HUAXIA INTELLIGENT JOURNEY</small></span></a>
      <nav>
        <router-link to="/" class="active">首页</router-link>
        <router-link to="/culture">中华文化</router-link>
        <router-link to="/festivals">传统节日</router-link>
        <router-link to="/heritage">非遗文化</router-link>
        <router-link to="/workshop">剪纸工坊</router-link><router-link to="/ai">AI助手</router-link>
      </nav>
      <div class="head-actions">
        <SearchButton />
        <AccountButton /><MobileNav />
      </div>
    </header>

    <section id="home" class="hero" :style="{ '--hero-image': 'url(' + forbiddenCity + ')' }">
      <div class="hero-copy">
        <div class="eyebrow">AI + 中华文化数字体验平台</div>
        <h1><span>一眼千年，</span><em>智游华夏</em></h1>
        <p>在故宫的晨光与飞檐之间，让小华陪你读懂每一段华夏记忆。</p>
        <div class="actions">
          <button class="primary" @click="$router.push('/culture')">开启文化漫游　→</button>
          <button class="outline" @click="open('给我推荐一个今天值得了解的中华文化主题')">🐉 问问小华</button>
        </div>
        <div class="social"><b>AI</b> 和小华一起探索中华文化</div>
      </div>
      <div class="hero-place">北京 · 故宫博物院</div>
      <button type="button" class="scroll" @click="scrollToExplore">向下探索</button>
    </section>

    <section id="explore" class="section">
      <div class="section-title">
        <div>
          <span>CULTURAL ARCHIVE</span>
          <h2>文化漫游</h2>
          <p>从一器一物，到一段鲜活的历史</p>
        </div>
        <button @click="open('我想从中华文化中选择一个主题开始探索')">让小华推荐　→</button>
      </div>
      <div class="archive">
        <article class="feature papercut-feature">
          <div class="feature-visual"><img :src="paperCutArt" alt="凤凰与牡丹纹样的红色剪纸" loading="lazy" /></div>
          <div class="feature-copy">
            <small>本期精选 · 民间美术</small>
            <h3>一纸之间，<br/>万象新生</h3>
            <p>在镂空与留白之间，<br/>读懂中国人的吉祥心意。</p>
            <button @click="$router.push('/workshop')">亲手剪一张窗花　→</button>
          </div>
        </article>
        <div class="archive-list">
          <article v-for="(c,i) in cards" :key="c[1]" role="button" tabindex="0" @keydown.enter="open('给我介绍一下'+c[1])" @click="open('给我介绍一下'+c[1])">
            <span>0{{i+1}}</span>
            <img :src="c[0]" :alt="c[1]" loading="lazy"/>
            <div>
              <h4>{{c[1]}}</h4>
              <p>{{c[2]}}</p>
            </div>
            <i>↗</i>
          </article>
        </div>
      </div>
    </section>

    <section id="heritage" class="section beige">
      <div class="section-title">
        <div>
          <span>INTANGIBLE HERITAGE</span>
          <h2>非遗新生</h2>
          <p>在当代生活里，看见手艺的温度</p>
        </div>
        <button @click="$router.push('/heritage')">浏览全部　→</button>
      </div>
      <div class="heritage-grid">
        <article v-for="(h, index) in heritage" :key="h[1]" role="button" tabindex="0" @keydown.enter="open('给我介绍一下'+h[1]+'，讲一个有趣的故事')" @click="open('给我介绍一下'+h[1]+'，讲一个有趣的故事')">
          <div class="heritage-icon"><img :src="h[0]" :alt="h[1]" loading="lazy"/><span class="heritage-number">0{{ index + 1 }}</span></div>
          <small>非物质文化遗产</small>
          <h3>{{h[1]}}</h3>
          <p>{{h[2]}}</p>
          <b>了解更多　→</b>
        </article>
      </div>
    </section>

    <section id="scenic" class="guide-section">
      <div class="guide-art"><img :src="forbiddenCity" alt="北京故宫太和殿" loading="lazy"/><span>北京 · 故宫博物院</span></div>
      <div class="guide-copy">
        <span>AI CULTURAL GUIDE</span>
        <h2>此刻，让小华<br/>带你走进<strong>太和殿</strong></h2>
        <p>昔日大典在此举行。抬头望去，藻井、金龙与屋脊，共同讲述着古代宫殿的庄严与想象。</p>
        <div class="pills">
          <button @click="guide=true;open('为什么叫太和殿？')">为什么叫太和殿？</button>
          <button @click="guide=true;open('这里以前是干什么的？')">这里以前是干什么的？</button>
          <button @click="guide=true;open('给我讲一个故宫故事')">讲一个故宫故事</button>
        </div>
        <button class="primary" @click="guide=true;open('请为我开启故宫太和殿的 AI 导览')">开启 AI 导览　→</button>
      </div>
    </section>

    <footer>
      <div class="brand"><b>华</b><span>华夏智游</span></div>
      <p>以科技激活文化，让传承自然发生。</p>
      <small>© 2025 华夏智游 · AI+中华文化数字体验平台</small>
    </footer>

    <button v-if="!assistantOpen" class="fab" aria-label="打开小华 AI 文化助手" @click="open()"><b>华<small>AI</small></b><span>问问小华<small>AI 文化助手</small></span><i></i></button>

    <transition name="fade">
      <aside v-if="assistantOpen" class="chat">
        <header>
          <b>🐉</b>
          <div><strong>小华 · AI文化助手</strong><small>● {{context}}</small></div>
          <button aria-label="关闭文化助手" @click="assistantOpen=false">×</button>
        </header>
        <div ref="chat" class="messages">
          <div class="listening">✦ <span><b>小华正在聆听</b><small>告诉我你对中华文化的好奇</small></span></div>
          <div v-for="(m,i) in messages" :key="i" class="msg" :class="m.role">
            <b v-if="m.role==='ai'">🐉</b>
            <p>{{m.text}}</p>
          </div>
        </div>
        <div class="quick">
          <button :disabled="isAiLoading" @click="message='为什么京剧脸谱有不同颜色？';send()">脸谱的颜色</button>
          <button :disabled="isAiLoading" @click="message='给我推荐一条文化路线';send()">一日文化路线</button>
        </div>
        <form @submit.prevent="send">
          <input v-model="message" placeholder="输入你想了解的文化…"/>
          <button :disabled="isAiLoading">{{ isAiLoading ? '…' : '↑' }}</button>
        </form>
      </aside>
    </transition>

  </main>
</template>

<script setup>
import { computed, nextTick, ref } from 'vue'
import paperCutArt from '../assets/paper-cut-window-art.webp'
import { askXiaohua } from '../services/ai'

const assistantOpen=ref(false),message=ref(''),guide=ref(false),chat=ref(null),isAiLoading=ref(false)
const forbiddenCity='https://images.unsplash.com/photo-1680537006773-67878eb8b20a?auto=format&fit=crop&w=1600&q=85'
const cards=[[forbiddenCity,'故宫中轴线','古建 · 礼序之美'],['https://www.reed.edu/chinese/chin-hum/LandscapePaintings/Hum230/pics/020792.jpg','千里江山图','丹青 · 山河气象'],['https://d2mpxrrcad19ou.cloudfront.net/item_images/795794/10041640_fullsize.jpg','景泰蓝','非遗 · 匠心温度']]
const heritage=[['https://images.unsplash.com/photo-1692634338039-75c2b3b9c665?auto=format&fit=crop&w=900&q=85','京剧','一腔一式，演尽百年风华'],['https://www.suzhouprivatetour.com/upload/ueditor/image/20170731/6363709845732031255390366.jpg','苏绣','针尖上的诗意江南'],[paperCutArt,'剪纸','一纸镂刻，万象新生']]
const messages=ref([{role:'ai',text:'你好，我是小华。今天想从哪一段华夏故事开始？'},{role:'ai',text:'我能结合你正在浏览的内容，为你讲解典故、规划路线，也能出一道文化挑战题。'}])
const context=computed(()=>guide.value?'故宫 · 太和殿导览中':'正在浏览 · 首页')
function open(text=''){assistantOpen.value=true;if(text){message.value=text;nextTick(send)}}
async function send(){let x=message.value.trim();if(!x||isAiLoading.value)return;messages.value.push({role:'user',text:x});message.value='';isAiLoading.value=true;const pending={role:'ai',text:'小华正在查阅文化资料…'};messages.value.push(pending);try{pending.text=await askXiaohua(messages.value.slice(0,-1).map((item)=>({role:item.role==='ai'?'assistant':'user',text:item.text})),context.value)}catch(error){pending.text=`抱歉，小华暂时无法回答：${error.message||'AI 服务连接失败。'}`}finally{isAiLoading.value=false;nextTick(()=>chat.value&&(chat.value.scrollTop=chat.value.scrollHeight))}}
function scrollToExplore(){
  document.getElementById('explore')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}
</script>
