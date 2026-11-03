<template>
  <main class="workshop-page">
    <header class="topbar">
      <router-link class="brand" to="/"><b>华</b><span>华夏智游<small>HUAXIA INTELLIGENT JOURNEY</small></span></router-link>
      <nav aria-label="主导航"><router-link to="/">首页</router-link><router-link to="/culture">中华文化</router-link><router-link to="/festivals">传统节日</router-link><router-link to="/heritage">非遗文化</router-link><router-link to="/workshop" class="active">剪纸工坊</router-link><router-link to="/ai">AI助手</router-link></nav>
      <div class="head-actions"><SearchButton /><AccountButton /><MobileNav /></div>
    </header>

    <section class="workshop-intro">
      <div><span class="workshop-kicker">PAPER · SYMMETRY · IMAGINATION</span><h1>一剪一世界</h1><p>在折纸上落下一剪，看一朵属于你的窗花慢慢展开。</p></div>
      <router-link to="/detail/剪纸">先读懂剪纸的虚与实 ↗</router-link>
    </section>

    <section class="workbench" aria-label="数字剪纸工作台">
      <div class="workshop-tools">
        <div class="tool-heading"><span>01 / 折与剪</span><b>从这里，落下第一剪</b></div>
        <div class="symmetry-options" role="group" aria-label="对称方向"><button v-for="count in [4, 6, 8]" :key="count" :aria-pressed="symmetry === count" @click="symmetry = count">{{ count }} 向对称</button></div>
        <div class="cutting-board">
          <svg ref="cuttingSvg" viewBox="0 0 360 360" role="button" tabindex="0" aria-label="折纸画布，点击纸面剪出纹样，也可按回车或空格落剪" @click="cutAtPointer" @keydown.enter.prevent="cutWithKeyboard" @keydown.space.prevent="cutWithKeyboard">
            <defs><pattern id="fold-grid" width="20" height="20" patternUnits="userSpaceOnUse"><path d="M 20 0 L 0 0 0 20" fill="none" stroke="#cbbb9b" stroke-width=".5"/></pattern></defs>
            <rect width="360" height="360" fill="url(#fold-grid)"/>
            <path :d="foldPath" :fill="color" stroke="#a48054" stroke-width="1"/>
            <path v-for="(cut, index) in cuts" :key="index" :d="shapePath(cut.shape, cut.size * foldRadius / artRadius)" :transform="foldTransform(cut)" fill="#f0e8d8"/>
            <path d="M180 315 L180 40" fill="none" stroke="#f9e6bb" stroke-width="1" stroke-dasharray="4 5" opacity=".55"/>
            <circle cx="180" cy="315" r="3" fill="#ead8b7"/>
          </svg>
          <span>点击红纸区域落剪 · 支持键盘 Enter</span>
        </div>
        <div class="tool-controls">
          <div class="tool-label">选择剪口</div>
          <div class="shape-options" role="group" aria-label="剪口形状"><button v-for="shape in shapes" :key="shape.id" :aria-pressed="selectedShape === shape.id" @click="selectedShape = shape.id"><svg viewBox="-26 -26 52 52" aria-hidden="true"><path :d="shapePath(shape.id, 15)"/></svg>{{ shape.label }}</button></div>
          <label class="cut-size">剪口大小 <input v-model.number="size" type="range" min="7" max="20" aria-label="剪口大小"/><span>{{ size }}</span></label>
          <div class="palette" role="group" aria-label="纸张颜色"><span>纸色</span><button v-for="paper in papers" :key="paper.color" :style="{ '--swatch': paper.color }" :aria-label="paper.name" :aria-pressed="color === paper.color" @click="color = paper.color"><span v-if="color === paper.color">✓</span></button></div>
        </div>
        <div class="cut-actions"><button :disabled="!cuts.length" @click="undo">撤回一剪 ↶</button><button @click="reset">重新开始</button></div>
        <a class="mobile-preview-link" href="#workshop-art">查看展开作品 ↓</a>
        <p class="workshop-status" role="status">{{ status }}</p>
      </div>

      <div id="workshop-art" class="workshop-preview">
        <div class="preview-heading"><span>02 / 展开成花</span><span>{{ symmetry }} 向对称 · {{ cuts.length }} 处剪口</span></div>
        <div class="artwork-mat">
          <span class="artwork-caption">华夏智游 · 数字剪纸</span>
          <svg :key="revealKey" ref="artworkSvg" class="window-art" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 480" role="img" aria-label="实时生成的对称剪纸窗花">
            <title>华夏智游 · 我的对称窗花</title>
            <defs><mask id="window-cuts" maskUnits="userSpaceOnUse" x="0" y="0" width="480" height="480"><rect width="480" height="480" fill="black"/><circle cx="240" cy="240" :r="artRadius" fill="white"/><g v-for="(cut, index) in cuts" :key="index" fill="black"><template v-for="direction in symmetry" :key="direction"><path v-for="mirror in [-1, 1]" :key="mirror" :d="shapePath(cut.shape, cut.size)" :transform="artTransform(cut, direction - 1, mirror)"/></template></g></mask></defs>
            <circle cx="240" cy="240" :r="artRadius" :fill="color" mask="url(#window-cuts)"/>
          </svg>
          <div class="artwork-sign"><span>留白之间<br/>万象新生</span><b>手作</b></div>
        </div>
        <div class="preview-actions"><button class="reveal-button" @click="revealKey++">✧ 再展开一次</button><button class="export-button" @click="download">保存我的窗花 ↓</button></div>
        <p class="export-hint">导出 SVG 矢量图，可用于打印或作品展示。</p>
      </div>
    </section>

    <section class="workshop-presets"><div><span class="workshop-kicker">A LITTLE INSPIRATION</span><h2>从一份灵感开始</h2><p>试试不同的剪口组合，再加上自己的想法。</p></div><div class="preset-buttons"><button v-for="preset in presets" :key="preset.id" @click="loadPreset(preset)"><b>{{ preset.mark }}</b><span>{{ preset.name }}<small>{{ preset.description }}</small></span><i>↗</i></button></div></section>
    <section class="workshop-notes"><article><span>折 · 重复</span><h3>一处变化，处处呼应</h3><p>对折让同一个剪口重复出现。切换对称方向，看看纹样的节奏怎样改变。</p></article><article><span>剪 · 留白</span><h3>剪去的部分，也在构图</h3><p>空隙与留下的纸共同形成图案。试着改变剪口大小，比较画面的疏密。</p></article><article><span>看 · 发现</span><h3>带着发现，再读传统</h3><p>这里用数字对称呈现剪纸的构图趣味，更多地方风格与传统技法，可以在专题里继续了解。</p><router-link to="/detail/剪纸">阅读剪纸专题 →</router-link></article></section>
    <SiteFooter />
  </main>
</template>

<script setup>
import { computed, ref } from 'vue'
import './workshop.css'

const artRadius = 210
const foldRadius = 275
const symmetry = ref(6)
const color = ref('#aa352f')
const selectedShape = ref('petal')
const size = ref(12)
const revealKey = ref(0)
const cuttingSvg = ref(null)
const artworkSvg = ref(null)
const status = ref('已有一份初始纹样。点击纸面，添加属于你的变化。')
const shapes = [{ id: 'petal', label: '花瓣' }, { id: 'diamond', label: '菱角' }, { id: 'circle', label: '圆孔' }]
const papers = [{ name: '朱砂红', color: '#aa352f' }, { name: '胭脂红', color: '#842c40' }, { name: '黛玉绿', color: '#285749' }]
const presets = [
  { id: 'blossom', mark: '花', name: '繁花', description: '花瓣与圆孔的呼应', symmetry: 6, cuts: [{ radius: .24, angle: .32, shape: 'diamond', size: 9 }, { radius: .49, angle: .38, shape: 'petal', size: 17 }, { radius: .77, angle: .4, shape: 'petal', size: 20 }, { radius: .88, angle: .82, shape: 'circle', size: 6 }] },
  { id: 'star', mark: '星', name: '星芒', description: '八向展开的几何节奏', symmetry: 8, cuts: [{ radius: .3, angle: .38, shape: 'diamond', size: 10 }, { radius: .55, angle: .55, shape: 'diamond', size: 15 }, { radius: .79, angle: .38, shape: 'diamond', size: 17 }] },
  { id: 'moon', mark: '月', name: '月影', description: '圆孔之间的疏与密', symmetry: 4, cuts: [{ radius: .3, angle: .4, shape: 'circle', size: 11 }, { radius: .58, angle: .48, shape: 'circle', size: 20 }, { radius: .82, angle: .25, shape: 'circle', size: 14 }, { radius: .82, angle: .75, shape: 'circle', size: 9 }] },
]
const cuts = ref(presets[0].cuts.map(cut => ({ ...cut })))

function polar(radius, degrees) {
  const angle = degrees * Math.PI / 180
  return { x: radius * Math.cos(angle), y: radius * Math.sin(angle) }
}
const foldPath = computed(() => {
  const left = polar(foldRadius, -90 - 180 / symmetry.value)
  const right = polar(foldRadius, -90 + 180 / symmetry.value)
  return `M180 315 L${180 + left.x} ${315 + left.y} A${foldRadius} ${foldRadius} 0 0 1 ${180 + right.x} ${315 + right.y} Z`
})
function shapePath(shape, radius) {
  if (shape === 'circle') return `M${-radius} 0 a${radius} ${radius} 0 1 0 ${radius * 2} 0 a${radius} ${radius} 0 1 0 ${-radius * 2} 0`
  if (shape === 'diamond') return `M0 ${-radius * 1.5} L${radius * .65} 0 L0 ${radius * 1.5} L${-radius * .65} 0 Z`
  return `M0 ${-radius * 1.6} C${radius * 1.2} ${-radius * .4} ${radius * 1.2} ${radius * .8} 0 ${radius * 1.6} C${-radius * 1.2} ${radius * .8} ${-radius * 1.2} ${-radius * .4} 0 ${-radius * 1.6} Z`
}
function foldTransform(cut) {
  const angle = cut.angle * 180 / symmetry.value
  const point = polar(cut.radius * foldRadius, -90 + angle)
  return `translate(${180 + point.x} ${315 + point.y}) rotate(${angle})`
}
function artTransform(cut, direction, mirror) {
  const angle = direction * 360 / symmetry.value + cut.angle * 180 / symmetry.value * mirror
  const point = polar(cut.radius * artRadius, -90 + angle)
  return `translate(${240 + point.x} ${240 + point.y}) rotate(${angle})`
}
function addCut(radius, angle) {
  if (cuts.value.length >= 30) {
    status.value = '纸面已经很丰富了，可以撤回一剪，或保存这份作品。'
    return
  }
  cuts.value.push({ radius, angle, shape: selectedShape.value, size: size.value })
  status.value = `第 ${cuts.value.length} 处剪口已完成，右侧窗花已同步展开。`
}
function cutAtPointer(event) {
  const matrix = cuttingSvg.value?.getScreenCTM()
  if (!matrix) return
  const point = new DOMPoint(event.clientX, event.clientY).matrixTransform(matrix.inverse())
  const x = point.x - 180
  const y = point.y - 315
  const radius = Math.hypot(x, y) / foldRadius
  const angle = (Math.atan2(y, x) * 180 / Math.PI + 90) / (180 / symmetry.value)
  if (radius < .14 || radius > .88 || Math.abs(angle) > .9) {
    status.value = '请在折纸内部落剪，边缘留一点连接。'
    return
  }
  addCut(radius, angle)
}
function cutWithKeyboard() {
  const radius = .3 + cuts.value.length % 5 * .12
  const angle = .2 + cuts.value.length % 3 * .2
  addCut(radius, angle)
}
function undo() {
  cuts.value.pop()
  status.value = '已撤回最近一剪。'
}
function reset() {
  cuts.value = []
  status.value = '纸张已备好，请点击折纸，剪出第一处纹样。'
}
function loadPreset(preset) {
  symmetry.value = preset.symmetry
  cuts.value = preset.cuts.map(cut => ({ ...cut }))
  revealKey.value++
  status.value = `已放入「${preset.name}」灵感，可以继续添加剪口。`
}
function download() {
  const serialized = new XMLSerializer().serializeToString(artworkSvg.value)
  const blob = new Blob([serialized], { type: 'image/svg+xml;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = `华夏智游-${symmetry.value}向窗花.svg`
  link.click()
  setTimeout(() => URL.revokeObjectURL(url), 1000)
  status.value = '窗花已生成，浏览器将保存 SVG 文件。'
}
</script>
