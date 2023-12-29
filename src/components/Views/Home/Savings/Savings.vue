<template>
  <div class="savings">
    <h3>Накопительные</h3>

    <div class="savings__partners savings__partners_mt-16">
      <PartnerCell type="cumulative"/>
      <AddPartnerCell type="cumulative"/>
    </div>
  </div>
</template>

<script setup lang="ts">
import PartnerCell from "../../../PartnerCell/PartnerCell.vue";
import AddPartnerCell from "../../../AddPartnerCell/AddPartnerCell.vue";
import MissingCell from "../../../MissingCell/MissingCell.vue";


</script>

<style scoped lang="scss">
@import 'savings';
</style>