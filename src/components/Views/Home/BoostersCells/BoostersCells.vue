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
          v-for="(cell, idx) in boostersPending?.list"
          :cell="cell"
          :key="idx"
          v-if="littleTabID === 3"
      />

      <SmallCell
          v-for="(cell, idx) in boostersExposed?.list"
          :cell="cell"
          :key="idx"
          v-if="littleTabID === 4"
      />
    </div>
  </div>
  <EmptyCells
      v-if="boostersPending.count === 0"
      :cellsType="'boosters'"
  />
  <Pagination v-if="boostersPending.count !== 0" />
</template>

<script setup lang="ts">
import {
  computed,
  ComputedRef,
  reactive
} from "vue";

import SmallCell from "../../../SmallCell/SmallCell.vue";
import Tabs from "../../../UI/Tabs/Tabs.vue";
import Pagination from "../../../Pagination/Pagination.vue";
import EmptyCells from "../../../EmptyCells/EmptyCells.vue";
import { useStore } from "vuex";
import { IPartners } from "../../../../interfaces/partners.interface.ts";

const store = useStore()
const boostersPending: ComputedRef<IPartners> = computed(() => store.state.boosters.boostersPending)
const boostersExposed: ComputedRef<IPartners> = computed(() => store.state.boosters.boostersExposed)

const littleTabID: ComputedRef<number> = computed(() => store.state.partners.littleTabID)

const tabs = reactive([
  {
    id: 3,
    name: 'В ожидании',
    value: computed(() => boostersPending.value.count)
  },
  {
    id: 4,
    name: 'Выставленные',
    value: computed(() => boostersExposed.value.count)
  },
]);


</script>

<style scoped lang="scss">
@import "boostersCells";
</style>