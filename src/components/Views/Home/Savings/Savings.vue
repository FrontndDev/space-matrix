<template>
  <div class="savings">
    <h3>Накопительные</h3>

    <div class="savings__partners savings__partners_mt-16">
      <PartnerCell
          type="cumulative"
          @open-m-matrix-partner="emit('open-m-matrix-partner')"
          v-if="ceils?.['1']?.matrix"
      />
      <AddPartnerCell
          type="cumulative"
          @open-m-add-partner="emit('open-m-add-partner')"
          v-if="!ceils?.['1']?.matrix"
      />
      <PartnerCell
          type="cumulative"
          @open-m-matrix-partner="emit('open-m-matrix-partner')"
          v-if="ceils?.['2']?.matrix"
      />
      <AddPartnerCell
          :type="!ceils?.['1']?.matrix ? 'disable' : 'cumulative'"
          @open-m-add-partner="emit('open-m-add-partner')"
          v-if="!ceils?.['2']?.matrix"
      />
    </div>
  </div>
</template>

<script setup lang="ts">

import PartnerCell from "../../../PartnerCell/PartnerCell.vue";
import AddPartnerCell from "../../../AddPartnerCell/AddPartnerCell.vue";
import { useStore } from "vuex";
import {
  computed,
  Ref
} from "vue";
import { Ceils } from "../../../../interfaces/store.interface.ts";

const emit = defineEmits(['open-m-matrix-partner', 'open-m-add-partner'])

const store = useStore()

const ceils: Ref<Ceils> = computed(() => store.state.viewLastOwn?.ceilsCollection?.['1'])
</script>

<style scoped lang="scss">
@import 'savings';
</style>