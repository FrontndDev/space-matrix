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
import PartnerCell from "../../../PartnerCell/PartnerCell.vue";
</script>

<style scoped lang="scss">
@import 'savings';
</style>