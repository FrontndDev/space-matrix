<template>
  <div class="savings">
    <h3>Накопительные</h3>

    <div class="savings__partners savings__partners_mt-16">
      <PartnerCell
          @open-m-matrix-partner="$emit('open-m-matrix-partner')"
          type="cumulative"
      />
      <AddPartnerCell
          @open-m-add-partner="$emit('open-m-add-partner')"
          type="cumulative"/>

    </div>
  </div>
</template>

<script setup lang="ts">

import PartnerCell from "../../../PartnerCell/PartnerCell.vue";
import AddPartnerCell from "../../../AddPartnerCell/AddPartnerCell.vue";

const props = defineProps({

})

</script>

<style scoped lang="scss">
@import 'savings';
</style>