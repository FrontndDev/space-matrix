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
          v-for="(cell, idx) in partners"
          :key="idx"
          :cell="cell"
      />
<!--      :type="cell.type"-->
<!--      :state="cell.state"-->
    </div>
  </div>
  <EmptyCells
      :cellsType="'partners'"
      v-if="partners.length === 0"
  />
  <Pagination v-if="partners.length !== 0" />
</template>

<script setup lang="ts">
import Tabs from "../../../UI/Tabs/Tabs.vue";
import {
  reactive,
  computed,
  Ref,
  ComputedRef
} from "vue";
import SmallCell from "../../../SmallCell/SmallCell.vue";
import Pagination from "../../../Pagination/Pagination.vue";
import EmptyCells from "../../../EmptyCells/EmptyCells.vue";
import { useStore } from "vuex";
import { ExpectationList } from "../../../../interfaces/store.interface.ts";

const store = useStore()

const tabs = reactive([
  {
    id: 1,
    name: 'Все',
    value: 152
  },
  {
    id: 2,
    name: 'Выставленные',
    value: 100
  },
  {
    id: 3,
    name: 'В ожидании',
    value: 52
  }
]);

const partners: ComputedRef<ExpectationList[]> = computed(() => Object.values(store.state.expectationList))

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