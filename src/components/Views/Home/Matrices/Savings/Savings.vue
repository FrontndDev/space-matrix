<template>
  <div class="savings">
    <h3>Накопительные</h3>

    <div class="savings__users">
      <PartnerCell/>
      <PartnerCell/>
    </div>
  </div>
</template>

<script setup lang="ts">
import PartnerCell from "../../../../PartnerCell/PartnerCell.vue";
</script>

<style scoped lang="scss">
@import "../../../../../assets/scss/variables";

.savings {
  padding: 16px;
  background: $bg-base;
  text-align: center;

  &__users {
    display: flex;
    justify-content: center;
    align-items: center;
    column-gap: 40px;
    margin: 0 auto;
  }
}
</style>