<template>
  <div class="endless">
    <h3>Бесконечные</h3>

    <div class="endless__menu endless__menu_mt-16">
      <AddPartnerCell type="infinity"/>
      <InfinityPartnerCard
          @open-modal="$emit('open-modal')"
      />
    </div>
  </div>
</template>

<script setup lang="ts">

import AddPartnerCell from "../../../AddPartnerCell/AddPartnerCell.vue";
import InfinityPartnerCard from "../../../InfinityPartnerCard/InfinityPartnerCard.vue";
</script>

<style scoped lang="scss">
@import "endless";
</style>