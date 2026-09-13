<template>
  <section class="content-slot-section">
    <header class="content-slot-head">
      <div>
        <div class="content-slot-eyebrow"><slot name="eyebrow" /></div>
        <slot name="title" />
      </div>
      <div class="content-slot-action"><slot name="action" /></div>
    </header>
    <div class="content-slot-body"><slot /></div>
    <footer v-if="$slots.footer" class="content-slot-footer"><slot name="footer" /></footer>
  </section>
</template>
