<template>
  <div class="reward">
    <svg xmlns="http://www.w3.org/2000/svg" width="17" height="16" viewBox="0 0 17 16" fill="none">
      <path d="M8.04776 12.9728C7.91075 12.894 7.7911 12.7763 7.70597 12.6197L3.51746 4.91596C3.18871 4.31129 3.62495 3.57406 4.31149 3.57406H8.04776V12.9728Z" fill="white"/>
      <path d="M13.4825 4.91596L9.29403 12.6197C9.20889 12.7763 9.08925 12.894 8.95223 12.9728V3.57406H12.6885C13.3751 3.57406 13.8113 4.31129 13.4825 4.91596Z" fill="white"/>
    </svg>
    10
  </div>
</template>

<script setup lang="ts">

</script>

<style scoped lang="scss">
@import "../../../assets/scss/variables";
@import "../../../assets/scss/mixins";

.reward {
  @include flexbox(row, flex-start, center);
  column-gap: 6px;
  margin: 0 auto;
  padding: 2px 8px 2px 2px;
  width: fit-content;
  border-radius: 16px;
  background: $bg-transparency-black;
  backdrop-filter: blur(8px);

  @include get-font(12px, 500);

  position: absolute;
  bottom: 8px;
  left: 0;
  right: 0;
}
</style>