<template>
  <div class="savings">
    <h3>Накопительные</h3>

    <div class="savings__partners savings__partners_mt-16">
      <PartnerCell
          type="cumulative"
          @open-m-matrix-partner="emit('open-m-matrix-partner')"
      />
      <AddPartnerCell
          type="cumulative"
          @open-m-add-partner="emit('open-m-add-partner')"
      />
    </div>
  </div>
</template>

<script setup lang="ts">

import PartnerCell from "../../../PartnerCell/PartnerCell.vue";
import AddPartnerCell from "../../../AddPartnerCell/AddPartnerCell.vue";
import { useStore } from "vuex";

const emit = defineEmits(['open-m-matrix-partner', 'open-m-add-partner'])

const store = useStore()
</script>

<style scoped lang="scss">
@import 'savings';
</style>