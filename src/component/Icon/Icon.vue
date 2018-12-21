<style src="./Icon.scss" module lang="scss"></style>
<script src="./Icon.js"></script>

<template>
  <span
    :class="[$style.icon]"
    v-html="icon"
  />
</template>
