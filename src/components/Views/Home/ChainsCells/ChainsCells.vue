<template>
  <div class="chains-cells">
    <div class="chains-cells__header">
      <Tabs
          type="little"
          :tabs="tabs"
          :cells="true"
          @toggle-expose-tabs="selectTab"
      />
    </div>
    <div class="chains-cells__container">
      <ChainCell
          type="default"
          v-for="cell in chainsList?.list"
          :key="cell?.id"
          :id="cell?.id"
          :cost="cell.price?.amount"
          :reward="cell.profit?.amount"
          :matrixStart="cell?.start"
          :matrixEnd="cell?.end"
          :countLinks="cell?.count_links"
          :avatar="cell?.initiator.photo"
          @open-general-chains="openGeneralChains"
          @open-m-teleport="$emit('open-m-teleport')"
          v-if="littleTabID === 5"
      />
      <ChainCell
          type="teleport"
          v-for="cell in teleportList?.list"
          :key="cell?.id"
          :id="cell?.id"
          :reward="1234"
          :matrixStart="cell?.start"
          :matrixEnd="cell?.end"
          :countLinks="cell?.count_links"
          :avatar="cell?.owner.photo"
          @open-general-chains="openGeneralChains"
          @open-m-teleport="$emit('open-m-teleport')"
          v-if="littleTabID === 6"
      />
    </div>
  </div>
  <EmptyCells
      cellsType="chains"
      v-if="chainsList.totalCount === 0"
  />
  <Pagination
      :count="data.find(tab => tab.id === littleTabID)?.value.totalPages"
      :selected-page="selectedPage"
      v-if="(data.find(tab => tab.id === littleTabID)?.value.totalPages ?? 0) > 1"
      @select-page="selectPage"
  />
</template>

<script setup lang="ts">
import Tabs from "../../../UI/Tabs/Tabs.vue";
import {
  computed,
  ComputedRef,
  reactive,
} from "vue";
import ChainCell from "../../../ChainCell/ChainCell.vue";
import Pagination from "../../../Pagination/Pagination.vue";
import EmptyCells from "../../../EmptyCells/EmptyCells.vue";
import {
  IChainsList,
  ITeleportList
} from "../../../../interfaces/chains.interface.ts";
import { useStore } from "vuex";

const store = useStore()

const chainsList: ComputedRef<IChainsList> = computed(() => store.state.chains.chainsList)
const teleportList: ComputedRef<ITeleportList> = computed(() => store.state.chains.teleportList)

const littleTabID: ComputedRef<number> = computed(() => store.state.partners.littleTabID)

const emit = defineEmits([
  'open-general-chains',
  'open-m-teleport',
  'select-chain',
])

const selectedPage: ComputedRef<number> = computed(() => store.state.chains.pageIdChains)

const selectPage = (page: number) => {
  store.commit('chains/SET_PAGE_ID_CHAINS', page)
  switch (littleTabID.value) {
    case 5:
      store.dispatch('chains/getChainsList')
      break
    case 6:
      store.dispatch('chains/getTeleportList')
  }
}

const selectTab = () => {
  selectPage(1)
}

const tabs = reactive([
  {
    id: 5,
    name: 'Прибыльные',
    value: computed(() => chainsList.value.totalCount)
  },
  {
    id: 6,
    name: 'Телепорт',
    value: computed(() => teleportList.value.totalCount)
  },
]);

const data = reactive([
  {
    id: 5,
    value: computed(() => chainsList.value)
  },
  {
    id: 6,
    value: computed(() => teleportList.value)
  },
])

const openGeneralChains = (id: number) => {
  store.dispatch('chains/getChainDetail', id)
  emit('select-chain', chainsList.value?.list.find(chain => chain.id === id))
  emit('open-general-chains')
}

</script>

<style scoped lang="scss">
@import "chainsCells";
</style>