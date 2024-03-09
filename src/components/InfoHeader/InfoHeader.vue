<template>
  <div class="header-info">
    <h2>Партнеры</h2>
    <div class="header-info__selects">
      <MySelect/>
    </div>
  </div>
</template>

<script setup lang="ts">
import MySelect from "@/components/UI/MySelect/MySelect.vue";
</script>

<style scoped lang="scss">
@import "infoHeader";
</style>