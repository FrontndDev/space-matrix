<template>
  <div class="chains-cells">
    <div class="chains-cells__header">
      <Tabs
          type="little"
          :tabs="tabs"
          :cells="true"
      />
    </div>
    <div class="chains-cells__container">
      <ChainCell
          v-for="cell in cells"
          :key="cell.id"
          :type="cell.type"
          :cost="cell.cost"
          :reward="cell.reward"
          :lvlOne="cell.lvlOne"
          :lvlTwo="cell.lvlTwo"
          @open-general-chains="$emit('open-general-chains')"
          @open-m-teleport="$emit('open-m-teleport')"
      />
    </div>
  </div>
  <EmptyCells
      cellsType="chains"
      v-if="cells.length === 0"
  />
  <Pagination v-if="cells.length !== 0"/>
</template>

<script setup lang="ts">
import Tabs from "../../../UI/Tabs/Tabs.vue";
import {ref, reactive} from "vue";
import ChainCell from "../../../ChainCell/ChainCell.vue";
import Pagination from "../../../Pagination/Pagination.vue";
import EmptyCells from "../../../EmptyCells/EmptyCells.vue";

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

const cells = ref([
  { type: 'teleport', lvlOne: 1, lvlTwo: 2, reward: 20, cost: 10, id: 0 },
  { type: 'default', lvlOne: 1, lvlTwo: 3, reward: 40, cost: 10, id: 1 },
  { type: 'default', lvlOne: 1, lvlTwo: 4, reward: 40, cost: 20, id: 2 },
  { type: 'default', lvlOne: 2, lvlTwo: 5, reward: 80, cost: 40, id: 3 },
  { type: 'default', lvlOne: 2, lvlTwo: 4, reward: 30, cost: 20, id: 4 },
  { type: 'teleport', lvlOne: 1, lvlTwo: 3, reward: 60, cost: 30, id: 5 },
  { type: 'default', lvlOne: 1, lvlTwo: 2, reward: 20, cost: 10, id: 6 },
  { type: 'teleport', lvlOne: 1, lvlTwo: 3, reward: 40, cost: 10, id: 7 },
  { type: 'teleport', lvlOne: 1, lvlTwo: 4, reward: 40, cost: 20, id: 8 },
  { type: 'default', lvlOne: 2, lvlTwo: 5, reward: 80, cost: 40, id: 9 },
  { type: 'teleport', lvlOne: 2, lvlTwo: 4, reward: 30, cost: 20, id: 10 },
  { type: 'default', lvlOne: 1, lvlTwo: 3, reward: 60, cost: 30, id: 11 },
  { type: 'teleport', lvlOne: 1, lvlTwo: 2, reward: 20, cost: 10, id: 12 },
  { type: 'default', lvlOne: 1, lvlTwo: 3, reward: 40, cost: 10, id: 13 },
  { type: 'default', lvlOne: 1, lvlTwo: 4, reward: 40, cost: 20, id: 14 },
  { type: 'teleport', lvlOne: 2, lvlTwo: 5, reward: 80, cost: 40, id: 15 },
  { type: 'default', lvlOne: 2, lvlTwo: 4, reward: 30, cost: 20, id: 16 },
  { type: 'default', lvlOne: 1, lvlTwo: 3, reward: 60, cost: 30, id: 17 },
])

</script>

<style scoped>
@import "_chainsCells.scss";
</style>