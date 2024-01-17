<template>
  <div class="savings">
    <div class="savings__title">
      {{ [getCellTypeFirstCeil, getTypeForSecondCeil].includes('profitable') ? 'Доходные' : 'Накопительные' }}
    </div>

    <div class="savings__partners savings__partners_mt-16">
      <!--   FIRST CEIL    -->
      <PartnerCell
          :type="getTypeForFirstCeil"
          :cell-type="getTypeForFirstCeil"
          :ceil="firstCeil.matrix"
          :fill-reward="firstCeil.fillRevard"
          v-if="firstCeil?.matrix && !firstCeil.queueId"
          @open-m-matrix-partner="openMMatrixPartner(firstCeil)"
      />
      <AddPartnerCell
          :type="getTypeForFirstCeil"
          :cell-type="getCellTypeFirstCeil"
          :ceil="firstCeil"
          :partners-count="partnersCount"
          v-if="!firstCeil?.matrix || firstCeil.queueId"
          @open-m-add-partner="openMAddPartner(getPosition(firstCeil.depth, firstCeil.pos))"
      />

      <!--   SECOND CEIL    -->
      <PartnerCell
          :type="getTypeForSecondCeil"
          :cell-type="getTypeForSecondCeil"
          :ceil="secondCeil.matrix"
          :fill-reward="secondCeil.fillRevard"
          v-if="secondCeil?.matrix && !secondCeil.queueId"
          @open-m-matrix-partner="openMMatrixPartner(secondCeil)"
      />
      <AddPartnerCell
          :type="getTypeForSecondCeil"
          :cell-type="getCellTypeSecondCeil"
          :ceil="secondCeil"
          :partners-count="partnersCount"
          v-if="!secondCeil?.matrix || secondCeil.queueId"
          @open-m-add-partner="openMAddPartner(getPosition(secondCeil.depth, secondCeil.pos))"
      />
    </div>
  </div>
</template>

<script setup lang="ts">

import PartnerCell from "../../../PartnerCell/PartnerCell.vue";
import AddPartnerCell from "../../../AddPartnerCell/AddPartnerCell.vue";
import { useStore } from "vuex";
import {
  computed,
  ComputedRef,
} from "vue";
import {
  Ceil,
  Ceils,
} from "../../../../interfaces/store.interface.ts";
import { IPosition } from "../../../../interfaces/partners.interface.ts";

const emit = defineEmits([
  'open-m-matrix-partner',
  'open-m-add-partner',
  'set-position-for-partner',
  'select-partner',
])

const store = useStore()

const thisIsDreamTon9: ComputedRef<boolean> = computed(() => store.getters.thisIsDreamTon9)

const partnersCount: ComputedRef<number> = computed(() => store.state.partners.partnersPending.totalCount)

const ceils: ComputedRef<Ceils> = computed(() => store.state.matrixByType?.ceilsCollection?.['1'])

const firstCeil: ComputedRef<Ceil> = computed(() => ceils.value?.['1'])
const secondCeil: ComputedRef<Ceil> = computed(() =>
    thisIsDreamTon9.value ? ceils.value?.['1'] : ceils.value?.['2']
)

const firstCeilIsCumulative: ComputedRef<boolean> = computed(() =>
    !!firstCeil.value.fillRevard.find(reward => reward.event === 'freeze')
)
const secondCeilIsCumulative: ComputedRef<boolean> = computed(() =>
    !!firstCeil.value.fillRevard.find(reward => reward.event === 'freeze')
)

const getTypeForFirstCeil: ComputedRef<string> = computed(() => {
  if (thisIsDreamTon9.value) {
    return 'disable3'
  }

  if (firstCeil.value.queueId) {
    return 'loading'
  }

  if (!firstCeil.value?.matrix) {
    if (!firstCeil.value?.allowBuyClone && !firstCeil.value?.allowSniper) {
      return 'disable3'
    }
  }

  if (firstCeil.value?.matrix?.is_booster) {
    return 'boost'
  }

  return firstCeilIsCumulative.value ? 'cumulative' : 'profitable'
})

const getCellTypeFirstCeil: ComputedRef<string> = computed(() => {
  if (getTypeForFirstCeil.value === 'disable') {
    return firstCeilIsCumulative.value ? 'cumulative' : 'profitable'
  } else {
    return getTypeForFirstCeil.value
  }
})

const getTypeForSecondCeil: ComputedRef<string> = computed(() => {
  if (thisIsDreamTon9.value) {
    return 'disable3'
  }

  if (secondCeil.value.queueId) {
    return 'loading'
  }

  if (!secondCeil.value?.matrix) {
    if (!firstCeil.value?.matrix) {
      return 'disable'
    }

    if (!secondCeil.value?.allowBuyClone && !secondCeil.value?.allowSniper) {
      return 'disable3'
    }
  }

  if (secondCeil.value?.matrix?.is_booster) {
    return 'boost'
  }

  return secondCeilIsCumulative.value ? 'cumulative' : 'profitable'
})

const getCellTypeSecondCeil: ComputedRef<string> = computed(() => {
  if (getTypeForSecondCeil.value === 'disable') {
    return secondCeilIsCumulative.value ? 'cumulative' : 'profitable'
  } else {
    return getTypeForSecondCeil.value
  }
})

const getPosition = (depth: number, pos: number): IPosition => {
  return { depth, pos }
}

const openMAddPartner = (pos: IPosition) => {
  const ceil: Ceil = ceils.value[String(pos.pos)]
  if (!thisIsDreamTon9.value && !ceil.queueId && (partnersCount.value && ceil.allowSniper || ceil.allowBuyClone)) {
    emit('open-m-add-partner')
    emit('set-position-for-partner', pos)
  }
}

const openMMatrixPartner = (ceil: Ceil) => {
  if (!ceil?.matrix?.is_booster) {
    emit('open-m-matrix-partner')
    emit('select-partner', ceil)
  }
}
</script>

<style scoped lang="scss">
@import 'savings';
</style>