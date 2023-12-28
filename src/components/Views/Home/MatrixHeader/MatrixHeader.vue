<template>
  <div class="matrix-header">
    <h1>Мои матрицы</h1>

    <div class="matrix-header__buttons matrix-header__buttons_mt-16">
      <DButton
          v-for="(i, idx) in 9"
          :key="i"
          :idx="idx"
          :price="(idx + 1) * 10"
          :class="{ active: !idx, disabled: idx && idx > 3 }"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import DButton from "../../../UI/DButton/DButton.vue";
</script>

<style scoped lang="scss">
@import "matrixHeader";
</style>