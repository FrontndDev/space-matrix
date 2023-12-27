<template>
  <div class="savings">
    <h3>Накопительные</h3>

    <div class="savings__partners savings__partners_mt-16">
      <PartnerCell type="cumulative"/>
      <PartnerCell type="cumulative" cell-type="boost"/>
    </div>
  </div>
</template>

<script setup lang="ts">
import PartnerCell from "../../../../PartnerCell/PartnerCell.vue";
</script>

<style scoped lang="scss">
@import "../../../../../assets/scss/variables";
@import "../../../../../assets/scss/mixins";

.savings {
  padding: 16px;
  background: $bg-base;
  text-align: center;

  &__partners {
    @include flexbox(row, center, flex-start);
    column-gap: 40px;
    margin: 0 auto;

    &_mt-16 {
      margin-top: 16px;
    }
  }
}
</style>