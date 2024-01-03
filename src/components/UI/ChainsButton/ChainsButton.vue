<template>
  <button class="chain-button">
    <slot></slot>
  </button>
</template>

<script setup lang="ts">

</script>

<style scoped lang="scss">
.chain-button {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 12px 16px;
  background: #B043FF;
  color: #fff;
  font-size: 14px;
  font-weight: 500;
  line-height: 140%;
  border-radius: 12px;
  height: 44px;

  & path {
    fill: #fff;
    width: 16px;
    height: 16px;
  }
}
</style>