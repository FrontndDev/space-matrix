<template>
  <div class="partners-cells">
    <div class="partners-cells__header">
      <Tabs
          type="little"
          :cells="true"
          :tabs="tabs"
      />
    </div>
    <div class="partners-cells__container">
      <SmallCell
          v-for="(cell, idx) in partnersPending?.list"
          :key="idx"
          :cell="cell"
          @open-m-matrix-partner="openMMatrixPartner(cell)"
          v-if="littleTabID === 1"
      />
      <SmallCell
          v-for="(cell, idx) in partnersExposed?.list"
          :key="idx"
          :cell="cell"
          @open-m-matrix-partner="openMMatrixPartner(cell)"
          v-if="littleTabID === 2"
      />
    </div>
  </div>
  <EmptyCells
      cellsType="partners"
      v-if="partnersPending.list?.length === 0 && littleTabID === 1 || partnersExposed.list?.length === 0 && littleTabID === 2"
  />

<!--  <Pagination v-if="partnersExposed.count !== 0" />-->
</template>

<script setup lang="ts">
import Tabs from "../../../UI/Tabs/Tabs.vue";
import {
  reactive,
  computed,
  ComputedRef,
} from "vue";
import SmallCell from "../../../SmallCell/SmallCell.vue";
// import Pagination from "../../../Pagination/Pagination.vue";
import EmptyCells from "../../../EmptyCells/EmptyCells.vue";
import { useStore } from "vuex";
import { IPartners } from "../../../../interfaces/partners.interface.ts";
import { Matrix } from "../../../../interfaces/store.interface.ts";

const emit = defineEmits(['open-m-matrix-partner', 'select-partner'])

const store = useStore()

const partnersExposed: ComputedRef<IPartners> = computed(() => store.state.partners.partnersExposed)
const partnersPending: ComputedRef<IPartners> = computed(() => store.state.partners.partnersPending)

const littleTabID: ComputedRef<number> = computed(() => store.state.partners.littleTabID)

const tabs = reactive([
  {
    id: 1,
    name: 'В ожидании',
    value: computed(() => partnersPending.value.count)
  },
  {
    id: 2,
    name: 'Выставленные',
    value: computed(() => partnersExposed.value.count)
  },
]);

const openMMatrixPartner = (cell: Matrix) => {
  const selectedPartner = {
    depth: 0,
    pos: 0,
    matrix: cell,
    allowBuyClone: false,
    allowSniper: false,
    fillRevard: [],
    isInfinity: false,
  }
  emit('open-m-matrix-partner')
  emit('select-partner', selectedPartner)
}
</script>

<style scoped lang="scss">
@import "partnerCells";
</style>