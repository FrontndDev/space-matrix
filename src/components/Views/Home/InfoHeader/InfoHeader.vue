<template>
  <div class="header-info">
    <Tabs
        :tabs="tabs"
        @open-cells="openCells"
    />
    <div class="header-info__selects">
      <div v-if="props.infoHeader === 1">
        <Select
            data="static"
            :items="selectItemsPartners"
            v-show="littleTabID !== 1"
            @select="changeLineOfPartners"
        />
      </div>
      <div>
        <Select
            keyObj="title"
            keyOfID="type"
            route="types"
            :items="listOfTypes?.types"
            @select="changeMatrixType"
        />
      </div>
    </div>
<!--    <ChainsButton v-if="props.infoHeader === 3">-->
<!--      <span>Примеры цепочек</span>-->
<!--      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">-->
<!--        <path fill-rule="evenodd" clip-rule="evenodd" d="M5.16668 4.66667C3.32282 4.66667 1.83334 6.15614 1.83334 8C1.83334 9.84386 3.32282 11.3333 5.16668 11.3333C7.01053 11.3333 8.50001 9.84386 8.50001 8C8.50001 7.72386 8.72387 7.5 9.00001 7.5C9.27615 7.5 9.50001 7.72386 9.50001 8C9.50001 10.3961 7.56282 12.3333 5.16668 12.3333C2.77053 12.3333 0.833344 10.3961 0.833344 8C0.833344 5.60386 2.77053 3.66667 5.16668 3.66667C5.44282 3.66667 5.66668 3.89052 5.66668 4.16667C5.66668 4.44281 5.44282 4.66667 5.16668 4.66667Z" fill="white"/>-->
<!--        <path fill-rule="evenodd" clip-rule="evenodd" d="M10.6667 4.5C8.73615 4.5 7.16668 6.06948 7.16668 8C7.16668 8.27614 6.94282 8.5 6.66668 8.5C6.39053 8.5 6.16668 8.27614 6.16668 8C6.16668 5.51719 8.18387 3.5 10.6667 3.5C13.1495 3.5 15.1667 5.51719 15.1667 8C15.1667 10.4828 13.1495 12.5 10.6667 12.5C10.3905 12.5 10.1667 12.2761 10.1667 12C10.1667 11.7239 10.3905 11.5 10.6667 11.5C12.5972 11.5 14.1667 9.93052 14.1667 8C14.1667 6.06948 12.5972 4.5 10.6667 4.5Z" fill="white"/>-->
<!--      </svg>-->
<!--    </ChainsButton>-->
  </div>
</template>

<script setup lang="ts">
import Tabs from "../../../UI/Tabs/Tabs.vue";
import {
  computed,
  reactive,
  Ref,
  watch
} from "vue";
import Select from "../../../UI/Select/Select.vue";
// import ChainsButton from "../../../UI/ChainsButton/ChainsButton.vue";
import { useStore } from "vuex";
import { ListOfTypes, Type } from "../../../../interfaces/store.interface.ts";
import { ILineOfPartners } from "../../../../interfaces/partners.interface.ts";

const props = defineProps({
  infoHeader: {
    type: Number,
    default: 1
  }
})

const store = useStore()
const emit = defineEmits(['open-cells'])

const littleTabID = computed(() => store.state.partners.littleTabID)
const listOfTypes: Ref<ListOfTypes> = computed(() => store.state.listOfTypes)

const levelIDOfPartners = computed(() => store.state.partners.levelID)
const levelIDOfBoosters = computed(() => store.state.boosters.levelID)

const changeLineOfPartners = (item: ILineOfPartners) => {
  store.dispatch('partners/getExposedPartners', { filter: item.id })
}

const changeMatrixType = (item: Type) => {
  store.commit('SET_NEW_TYPE_MATRIX', item.type)
  store.dispatch('partners/getExposedPartners', { filter: levelIDOfPartners.value })
  store.dispatch('partners/getPendingPartners', { isPartnerMatrix: false })

  store.dispatch('boosters/getPendingBoosters')
  store.dispatch('boosters/getExposedBoosters', { filter:  levelIDOfBoosters.value })
}

const openCells = (id: number) => {
  emit('open-cells', id)
}

watch(() => store.state.selectedType, () => {
  store.dispatch('partners/getExposedPartners', { filter: levelIDOfPartners.value || 1 })

  store.dispatch('partners/getPendingPartners', { matrixFilterUserId: 2969585, matrixFilterPageId: 1 })

  store.dispatch('boosters/getPendingBoosters')

  store.dispatch('boosters/getExposedBoosters')
})

const tabs = reactive([
  {
    id: 1,
    name: 'Партнеры',
    indicator: computed(() => store.state.partners.partnersPending.count > 0),
  },
  {
    id: 2,
    name: 'Бустеры',
    indicator: computed(() => store.state.boosters.boostersPending.count > 0),
  },
  {
    id: 3,
    name: 'Цепочки',
    indicator: false,
  },
]);

const selectItemsPartners = reactive([
  {
    id: 1,
    name: '1 линия'
  },
  {
    id: 2,
    name: '2 линия'
  },
  {
    id: 3,
    name: '3 линия'
  },
  {
    id: 4,
    name: '4 линия'
  },
  {
    id: 5,
    name: '5 линия'
  },
  {
    id: 6,
    name: '6 линия'
  },
  {
    id: 7,
    name: '7 линия'
  },
  {
    id: 8,
    name: '8 линия'
  },
  {
    id: 9,
    name: '9 линия'
  },
]);
</script>

<style scoped lang="scss">
@import "infoHeader";
</style>