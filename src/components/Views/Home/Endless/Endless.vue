<template>
  <div class="endless">
    <div class="endless__title">Бесконечные</div>

    <div class="endless__menu endless__menu_mt-16">
      <AddPartnerCell
          cell-type="infinity"
          subtitle="Заполните ячейки накопления"
          :type="getTypeForThirdCeil"
          :ceil="thirdCeil"
          :partners-count="partnersCount"
          @open-m-add-partner="openMAddPartner(getPosition(thirdCeil.depth, thirdCeil.pos))"
      />
      <InfinityPartnerCard
          :ceil="thirdCeil"
          :partners-count="matrixByType.countInInfinity"
          :loading="!!thirdCeil?.queueId"
          @open-m-infinity-cell="openMInfinityCell"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import AddPartnerCell from "../../../AddPartnerCell/AddPartnerCell.vue";
import InfinityPartnerCard from "../../../InfinityPartnerCard/InfinityPartnerCard.vue";
import { useStore } from "vuex";
import {
  computed,
  Ref,
  ComputedRef
} from "vue";
import {
  Ceil,
  Ceils,
  IMatrix,
} from "../../../../interfaces/store.interface.ts";
import { IPosition } from "../../../../interfaces/partners.interface.ts";

const emit = defineEmits(['open-m-infinity-cell', 'open-m-add-partner', 'set-position-for-partner'])

const store = useStore()

const thisIsDreamTon9: ComputedRef<boolean> = computed(() => store.getters.thisIsDreamTon9)

const partnersCount: ComputedRef<number> = computed(() => store.state.partners.partnersPending.totalCount)

const ceils: Ref<Ceils> = computed(() => store.state.matrixByType?.ceilsCollection['1'])
const thirdCeil: Ref<Ceil> = computed(() =>
    thisIsDreamTon9.value ? ceils.value?.['1'] : ceils.value?.['3']
)

const matrixByType: ComputedRef<IMatrix> = computed(() => store.state.matrixByType)

const openMInfinityCell = () => {
  if (matrixByType.value?.matrix) {
    store.dispatch('partners/getInfinityPartners', {
      parentId: matrixByType.value.matrix.id
    })
    emit('open-m-infinity-cell')
  }
}

const getPosition = (depth: number, pos: number): IPosition => {
  return { depth, pos }
}

const getTypeForThirdCeil: ComputedRef<string> = computed(() => {
  if (thirdCeil.value.queueId) {
    return 'loading'
  }

  if (!thirdCeil.value?.matrix) {
    if (!thirdCeil.value?.allowBuyClone && !thirdCeil.value?.allowSniper) {
      return 'disable3'
    }

    if (!thirdCeil.value?.allowSniper && !thirdCeil.value.allowBuyClone || !thirdCeil.value?.allowBuyClone && !partnersCount.value) {
      return 'disable'
    }
  }

  return 'infinity'
})

const openMAddPartner = (pos: IPosition) => {
  if (partnersCount.value && thirdCeil.value.allowSniper || thirdCeil.value.allowBuyClone) {
    emit('open-m-add-partner')
    emit('set-position-for-partner', pos)
  }
}
</script>

<style scoped lang="scss">
@import "endless";
</style>