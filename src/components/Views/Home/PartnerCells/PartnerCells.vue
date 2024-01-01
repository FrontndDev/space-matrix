<template>
  <div class="partners-cells">
    <div class="partners-cells__header">
      <Tabs type="little"
            :tabs="tabs"
      />
      <Search/>
    </div>
    <div class="partners-cells__container">
      <SmallCell
          v-for="cell in smallCells"
          :key="cell.id"
          :type="cell.type"
          :state="cell.state"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import Tabs from "../../../UI/Tabs/Tabs.vue";
import { ref, reactive } from "vue";
import Search from "../../../UI/Search/Search.vue";
import SmallCell from "../../../SmallCell/SmallCell.vue";

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

const smallCells = ref([
  { type: 'partners', state: 'exhibited', id: 0 },
  { type: 'boost', state: 'exhibited', id: 1},
  { type: 'boost', state: 'waiting', id: 2 },
  { type: 'partners', state: 'exhibited', id: 3 },
  { type: 'partners', state: 'exhibited', id: 4 },
  { type: 'partners', state: 'exhibited', id: 5 },
])
</script>

<style scoped lang="scss">
@import "partnerCells";
</style>