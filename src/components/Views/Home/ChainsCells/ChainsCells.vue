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
          v-for="(cell, idx) in chainsList?.list"
          :key="idx"
          :type="'default'"
          :cost="cell.price?.amount"
          :reward="cell.profit?.amount"
          :matrixStart="cell?.start"
          :matrixEnd="cell?.end"
          :countLinks="cell?.count_links"
          @open-general-chains="openGeneralChains"
          @open-m-teleport="$emit('open-m-teleport')"
      />
    </div>
  </div>
  <EmptyCells
      cellsType="chains"
      v-if="chainsList.totalCount === 0"
  />
<!--  <Pagination v-if="cells.length !== 0"/>-->
</template>

<script setup lang="ts">
import Tabs from "../../../UI/Tabs/Tabs.vue";
import {
  computed,
  ComputedRef,
  reactive
} from "vue";
import ChainCell from "../../../ChainCell/ChainCell.vue";
// import Pagination from "../../../Pagination/Pagination.vue";
import EmptyCells from "../../../EmptyCells/EmptyCells.vue";
import { IChainsList } from "../../../../interfaces/chains.interface.ts";
import { useStore } from "vuex";

const tabs = reactive([
  {
    id: 5,
    name: 'Выставленные',
    value: computed(() => chainsList.value.totalCount)
  }
]);

const store = useStore()
const emit = defineEmits(['open-general-chains', 'open-m-teleport'])

const openGeneralChains = () => {
  store.dispatch('chains/getChainDetail', )
  emit('open-general-chains')
}

const chainsList: ComputedRef<IChainsList> = computed(() => store.state.chains.chainsList)

</script>

<style scoped>
@import "_chainsCells.scss";
</style>