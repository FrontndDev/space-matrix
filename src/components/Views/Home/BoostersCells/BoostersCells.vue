<template>
  <div class="boosters-cells">
    <div class="boosters-cells__header">
      <Tabs type="little"
            :tabs="tabs"
            :cells="true"
      />
    </div>
    <div class="boosters-cells__container">
      <SmallCell
          v-for="cell in smallCells"
          :key="cell.id"
          :type="cell.type"
          :state="cell.state"
      />
    </div>
  </div>
  <EmptyCells
      v-if="smallCells.length === 0"
      :cellsType="'boosters'"
  />
  <Pagination v-if="smallCells.length !== 0" />
</template>

<script setup lang="ts">
import Tabs from "../../../UI/Tabs/Tabs.vue";
import { ref, reactive } from "vue";
import SmallCell from "../../../SmallCell/SmallCell.vue";
import Pagination from "../../../Pagination/Pagination.vue";
import EmptyCells from "../../../EmptyCells/EmptyCells.vue";

const tabs = reactive([
  {
    id: 1,
    name: 'Все',
    value: 162
  },
  {
    id: 2,
    name: 'Выставленные',
    value: 110
  },
  {
    id: 3,
    name: 'В ожидании',
    value: 52
  }
]);

const smallCells = ref([
  { type: 'boost', state: 'exhibited', id: 0 },
  { type: 'boost', state: 'exhibited', id: 1 },
  { type: 'boost', state: 'waiting', id: 2 },
  { type: 'boost', state: 'waiting', id: 3 },
  { type: 'boost', state: 'waiting', id: 4 },
  { type: 'boost', state: 'waiting', id: 5 },
  { type: 'boost', state: 'exhibited', id: 6 },
  { type: 'boost', state: 'exhibited', id: 7 },
  { type: 'boost', state: 'waiting', id: 8 },
  { type: 'boost', state: 'waiting', id: 9 },
  { type: 'boost', state: 'waiting', id: 10 },
  { type: 'boost', state: 'waiting', id: 11 },
  { type: 'boost', state: 'exhibited', id: 12 },
  { type: 'boost', state: 'exhibited', id: 13},
  { type: 'boost', state: 'waiting', id: 14 },
  { type: 'boost', state: 'waiting', id: 15 },
  { type: 'boost', state: 'waiting', id: 16 },
  { type: 'boost', state: 'waiting', id: 17 },
])
</script>

<style scoped lang="scss">
@import "boostersCells";
</style>