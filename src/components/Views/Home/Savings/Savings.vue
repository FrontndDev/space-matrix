<template>
  <div class="savings">
    <div class="savings__title">
      {{ [getTypeForFirstCeil, getTypeForSecondCeil].includes('profitable') ? 'Доходные' : 'Накопительные' }}
    </div>

    <div class="savings__partners savings__partners_mt-16">
      <!--   FIRST CEIL    -->
      <PartnerCell
          :type="getTypeForFirstCeil"
          :ceil="firstCeil.matrix"
          :fill-reward="firstCeil.fillRevard"
          @open-m-matrix-partner="openMMatrixPartner(firstCeil)"
          v-if="firstCeil?.matrix"
      />
      <AddPartnerCell
          :type="getTypeForFirstCeil"
          :ceil="firstCeil"
          :partners-count="partnersCount"
          @open-m-add-partner="openMAddPartner(getPosition(1, 1))"
          v-if="!firstCeil?.matrix"
      />

      <!--   SECOND CEIL    -->
      <PartnerCell
          :type="getTypeForSecondCeil"
          :ceil="secondCeil.matrix"
          :fill-reward="secondCeil.fillRevard"
          @open-m-matrix-partner="openMMatrixPartner(secondCeil)"
          v-if="secondCeil?.matrix"
      />
      <AddPartnerCell
          :type="getTypeForSecondCeil"
          :ceil="secondCeil"
          :partners-count="partnersCount"
          @open-m-add-partner="openMAddPartner(getPosition(1, 2))"
          v-if="!secondCeil?.matrix"
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
  Ceils
} from "../../../../interfaces/store.interface.ts";
import { IPosition } from "../../../../interfaces/partners.interface.ts";

const emit = defineEmits([
  'open-m-matrix-partner',
  'open-m-add-partner',
  'set-position-for-partner',
  'select-partner',
])

const store = useStore()

const partnersCount: ComputedRef<number> = computed(() => store.state.partners.partnersPending.count)

const ceils: ComputedRef<Ceils> = computed(() => store.state.matrixByType?.ceilsCollection?.['1'])

const firstCeil: ComputedRef<Ceil> = computed(() => ceils.value?.['1'])
const secondCeil: ComputedRef<Ceil> = computed(() => ceils.value?.['2'])

const firstCeilIsCumulative: ComputedRef<boolean> = computed(() =>
    !!firstCeil.value.fillRevard.find(reward => reward.event === 'freeze')
)
const secondCeilIsCumulative: ComputedRef<boolean> = computed(() =>
    !!firstCeil.value.fillRevard.find(reward => reward.event === 'freeze')
)

const getTypeForFirstCeil: ComputedRef<string> = computed(() => {
  if (!firstCeil.value?.matrix && (!firstCeil.value.allowSniper || !partnersCount.value && !firstCeil.value.allowBuyClone)) {
    return 'disable'
  }

  return firstCeilIsCumulative.value ? 'cumulative' : 'profitable'
})

const getTypeForSecondCeil: ComputedRef<string> = computed(() => {
  if (!secondCeil.value?.matrix && (!secondCeil.value.allowSniper || !partnersCount.value && !secondCeil.value.allowBuyClone)) {
    return 'disable'
  }

  return secondCeilIsCumulative.value ? 'cumulative' : 'profitable'
})

const getPosition = (depth: number, pos: number): IPosition => {
  return { depth, pos }
}

const openMAddPartner = (pos: IPosition) => {
  const ceil: Ceil = ceils.value[String(pos.pos)]
  if (partnersCount.value && ceil.allowSniper || ceil.allowBuyClone) {
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