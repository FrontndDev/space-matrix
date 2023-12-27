<template>
  <div class="matrices">
    <Header style="grid-area: header;"/>
    <Savings style="grid-area: savings;"/>
    <Endless style="grid-area: endless;"/>
    <CopyLink style="grid-area: copy-link;"/>
  </div>
</template>

<script setup lang="ts">
import Header from "./Header/Header.vue";
import Savings from "./Savings/Savings.vue";
import Endless from "./Endless/Endless.vue";
import CopyLink from "./CopyLink/CopyLink.vue";
</script>

<style scoped lang="scss">
.matrices {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 160px auto 48px;
  grid-template-areas: "header header" "savings endless" "copy-link copy-link";
  grid-gap: 4px;
}
</style>