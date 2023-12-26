<template>
  <div class="header">
    <h1>Мои матрицы</h1>

    <div class="header__buttons header__buttons_mt-16">
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
import DButton from "../../../../UI/DButton.vue";
</script>

<style scoped lang="scss">
@import "../../../../../assets/scss/variables";

.header {
  padding: 16px;
  border-radius: 16px 16px 0 0;
  background: $bg-base;

  &__buttons {
    display: flex;
    column-gap: 8px;

    &_mt-16 {
      margin-top: 16px;
    }
  }
}
</style>