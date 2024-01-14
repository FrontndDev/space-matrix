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
          v-for="cell in chainsList?.list"
          :key="cell?.id"
          :id="cell?.id"
          :type="'default'"
          :cost="cell.price?.amount"
          :reward="cell.profit?.amount"
          :matrixStart="cell?.start"
          :matrixEnd="cell?.end"
          :countLinks="cell?.count_links"
          :avatar="cell?.initiator.photo"
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

]);

const store = useStore()
const emit = defineEmits(['open-general-chains', 'open-m-teleport'])

const openGeneralChains = (id: number) => {
  store.dispatch('chains/getChainDetail', id)
  emit('open-general-chains')
}

const chainsList: ComputedRef<IChainsList> = computed(() => store.state.chains.chainsList)

</script>

<style scoped>
@import "_chainsCells.scss";
</style>