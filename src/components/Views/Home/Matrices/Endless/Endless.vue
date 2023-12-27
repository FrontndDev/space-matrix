<template>
  <div class="endless">
    <h3>Бесконечные</h3>

    <div class="endless__menu endless__menu_mt-16">
      <AddPartnerCell type="infinity"/>
      <InfinityPartnerCard/>
    </div>
  </div>
</template>

<script setup lang="ts">

import AddPartnerCell from "../../../../AddPartnerCell/AddPartnerCell.vue";
import InfinityPartnerCard from "../../../../InfinityPartnerCard/InfinityPartnerCard.vue";
</script>

<style scoped lang="scss">
@import "../../../../../assets/scss/variables";
@import "../../../../../assets/scss/mixins";

.endless {
  padding: 16px;
  background: $bg-base;
  text-align: center;

  &__menu {
    @include flexbox(row, center, flex-start);
    column-gap: 40px;
    margin: 0 auto;

    &_mt-16 {
      margin-top: 16px;
    }
  }
}
</style>