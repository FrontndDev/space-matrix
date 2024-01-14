<template>
  <div class="endless">
    <div class="endless__title">Бесконечные</div>

    <div class="endless__menu endless__menu_mt-16">
      <AddPartnerCell
          cell-type="infinity"
          :type="getTypeForThirdCeil"
          :ceil="thirdCeil"
          :partners-count="partnersCount"
          @open-m-add-partner="openMAddPartner(getPosition(1, 3))"
      />
      <InfinityPartnerCard
          :ceil="thirdCeil"
          :partners-count="matrixByType.countInInfinity"
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
  Type
} from "../../../../interfaces/store.interface.ts";
import { IPosition } from "../../../../interfaces/partners.interface.ts";

const emit = defineEmits(['open-m-infinity-cell', 'open-m-add-partner', 'set-position-for-partner'])

const store = useStore()

const selectedType: ComputedRef<Type> = computed(() => store.state.selectedType)

const partnersCount: ComputedRef<number> = computed(() => store.state.partners.partnersPending.count)

const ceils: Ref<Ceils> = computed(() => store.state.matrixByType?.ceilsCollection['1'])
const thirdCeil: Ref<Ceil> = computed(() => selectedType.value.type === 'dream-ton_9' ? ceils.value?.['1'] : ceils.value?.['3'])

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

  if (!thirdCeil.value.allowSniper || !partnersCount.value && !thirdCeil.value.allowBuyClone) {
    return 'disable'
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