<template>
  <div class="matrices">
    <Header style="grid-area: header;"/>
    <Savings style="grid-area: savings;"/>
    <Endless style="grid-area: endless;"/>
  </div>
</template>

<script setup lang="ts">
import Header from "./Header/Header.vue";
import Savings from "./Savings/Savings.vue";
import Endless from "./Endless/Endless.vue";
</script>

<style scoped lang="scss">
.matrices {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 160px 348px 48px;
  grid-template-areas: "header header" "savings endless" "link link";
  grid-gap: 4px;
}
</style>