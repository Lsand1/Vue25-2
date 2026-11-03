<template>
  <section class="topic-section reading-explorer">
    <div class="section-kicker">{{ eyebrow }}</div>
    <div class="explorer-heading"><h2>{{ title }}</h2><p>{{ description }}</p></div>
    <div class="explorer-choices" role="group" :aria-label="title">
      <button v-for="(item, index) in items" :key="item.title" :aria-pressed="selected === index" @click="selected = index"><small>0{{ index + 1 }}</small>{{ item.label }}</button>
    </div>
    <article class="explorer-panel" aria-live="polite">
      <div class="explorer-intro"><span>{{ current.kicker }}</span><h3>{{ current.title }}</h3><p>{{ current.summary }}</p><router-link :to="current.to">阅读完整专题 ↗</router-link></div>
      <ol class="explorer-steps"><li v-for="(step, index) in current.steps" :key="step.title"><b>0{{ index + 1 }}</b><div><h4>{{ step.title }}</h4><p>{{ step.text }}</p></div></li></ol>
    </article>
    <div class="explorer-note"><b>试着发现</b><span>{{ current.tip }}</span></div>
  </section>
</template>

<script setup>
import { computed, ref } from 'vue'
const props = defineProps({ eyebrow: String, title: String, description: String, items: { type: Array, required: true } })
const selected = ref(0)
const current = computed(() => props.items[selected.value])
</script>
