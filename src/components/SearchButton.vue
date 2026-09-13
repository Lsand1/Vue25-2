<template>
  <button class="search-trigger" type="button" aria-label="搜索文化内容" @click="openSearch">⌕</button>
</template>

<script setup>
function openSearch() {
  window.dispatchEvent(new CustomEvent('culture-search:open'))
}
</script>
