<template>
  <div class="partners-cells">
    <div class="partners-cells__header">
      <Tabs
          type="little"
          :tabs="tabs"
          :cells="true"
      />
    </div>
    <div class="partners-cells__container">
      <SmallCell
          v-for="(cell, idx) in partnersExposed?.list"
          :key="idx"
          :cell="cell"
          v-if="pagePartnerID === 1"
      />
      <SmallCell
          v-for="(cell, idx) in partnersPending?.list"
          :key="idx"
          :cell="cell"
          v-if="pagePartnerID === 2"
      />
<!--      :type="cell.type"-->
<!--      :state="cell.state"-->
    </div>
  </div>
  <EmptyCells
      :cellsType="'partners'"
      v-if="partnersExposed.count === 0"
  />

  <Pagination v-if="partnersExposed.count !== 0" />
</template>

<script setup lang="ts">
import Tabs from "../../../UI/Tabs/Tabs.vue";
import {
  reactive,
  computed,
  ComputedRef,
  watch
} from "vue";
import SmallCell from "../../../SmallCell/SmallCell.vue";
import Pagination from "../../../Pagination/Pagination.vue";
import EmptyCells from "../../../EmptyCells/EmptyCells.vue";
import { useStore } from "vuex";
import { IPartners } from "../../../../interfaces/partners.interface.ts";

const store = useStore()

const partnersExposed: ComputedRef<IPartners> = computed(() => store.state.partners.partnersExposed)
const partnersPending: ComputedRef<IPartners> = computed(() => store.state.partners.partnersPending)

const pagePartnerID: ComputedRef<number> = computed(() => store.state.partners.pagePartnerID)

const tabs = reactive([
  {
    id: 1,
    name: 'Выставленные',
    value: computed(() => partnersExposed.value.count)
  },
  {
    id: 2,
    name: 'В ожидании',
    value: computed(() => partnersPending.value.count)
  }
]);

watch(() => store.state.selectedType, () => {
  store.dispatch('partners/getExposedPartners',
      {
        matrixFilterUserId: 2969585,
        matrixFilterPageId: 1,
      }
  )

  store.dispatch('partners/getPendingPartners',
      {
        matrixFilterUserId: 2969585,
        matrixFilterPageId: 1,
      }
  )

  store.dispatch('boosters/getPendingBoosters',
      {
        matrixFilterUserId: 2969585,
        matrixFilterPageId: 1,
      }
  )
})


// const smallCells = ref([
//   { type: 'partners', state: 'exhibited', id: 0 },
//   { type: 'partners', state: 'exhibited', id: 1 },
//   { type: 'partners', state: 'waiting', id: 2 },
//   { type: 'partners', state: 'exhibited', id: 3 },
//   { type: 'partners', state: 'exhibited', id: 4 },
//   { type: 'partners', state: 'exhibited', id: 5 },
//   { type: 'partners', state: 'exhibited', id: 6 },
//   { type: 'partners', state: 'exhibited', id: 7 },
//   { type: 'partners', state: 'waiting', id: 8 },
//   { type: 'partners', state: 'exhibited', id: 9 },
//   { type: 'partners', state: 'exhibited', id: 10 },
//   { type: 'partners', state: 'exhibited', id: 11 },
//   { type: 'partners', state: 'exhibited', id: 12 },
//   { type: 'partners', state: 'exhibited', id: 13},
//   { type: 'partners', state: 'waiting', id: 14 },
//   { type: 'partners', state: 'exhibited', id: 15 },
//   { type: 'partners', state: 'exhibited', id: 16 },
//   { type: 'partners', state: 'exhibited', id: 17 },
// ])
</script>

<style scoped lang="scss">
@import "partnerCells";
</style>