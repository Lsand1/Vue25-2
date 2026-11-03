<template>
  <section class="topic-section knowledge-quiz">
    <div class="quiz-intro"><span class="section-kicker">A MINUTE TO REMEMBER</span><h2>带走一点新知识</h2><p>用 {{ questions.length }} 道小题，回顾刚刚的探索。</p><span class="quiz-counter">{{ finished ? '已完成' : `${index + 1} / ${questions.length}` }}</span></div>
    <div class="knowledge-card" aria-live="polite">
      <template v-if="!finished">
        <h3>{{ current.title }}</h3>
        <div class="knowledge-options"><button v-for="(option, optionIndex) in current.options" :key="option" :disabled="answered" :class="{ 'is-correct': answered && optionIndex === current.answer, 'is-wrong': answered && chosen === optionIndex && optionIndex !== current.answer }" @click="choose(optionIndex)"><small>{{ String.fromCharCode(65 + optionIndex) }}</small>{{ option }}<span v-if="answered && optionIndex === current.answer">✓</span></button></div>
        <div v-if="answered" class="knowledge-feedback"><b>{{ chosen === current.answer ? '答对了！' : '再记住这个细节' }}</b><p>{{ current.explanation }}</p><button @click="next">{{ index === questions.length - 1 ? '查看结果' : '下一题' }} →</button></div>
      </template>
      <template v-else><span class="knowledge-score">{{ score }}<small> / {{ questions.length }}</small></span><h3>每一次好奇，都有收获</h3><p>继续浏览专题，或带着新问题去问问小华。</p><div class="quiz-complete-actions"><button @click="restart">再试一次 ↻</button><router-link to="/ai">继续提问 →</router-link></div></template>
    </div>
  </section>
</template>

<script setup>
import { computed, ref } from 'vue'
const props = defineProps({ questions: { type: Array, required: true } })
const index = ref(0), chosen = ref(null), score = ref(0), finished = ref(false)
const answered = computed(() => chosen.value !== null)
const current = computed(() => props.questions[index.value])
function choose(option) { if (answered.value) return; chosen.value = option; if (option === current.value.answer) score.value++ }
function next() { if (!answered.value) return; if (index.value === props.questions.length - 1) finished.value = true; else { index.value++; chosen.value = null } }
function restart() { index.value = 0; chosen.value = null; score.value = 0; finished.value = false }
</script>
