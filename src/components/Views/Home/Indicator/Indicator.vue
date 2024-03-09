<template>
  <div class="indicator">
    <span>+15 000</span>
    <component :is="TonIcon"/>
  </div>
</template>

<script setup lang="ts">
import TonIcon from "@/assets/svg/ton.svg?component"
</script>

<style scoped lang="scss">
@import "indicator";
</style>