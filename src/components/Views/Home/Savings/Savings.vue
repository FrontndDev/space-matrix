<template>
  <div class="savings">
    <div class="savings__title">Накопительные</div>

    <div class="savings__partners savings__partners_mt-16">
      <!--   FIRST CEIL    -->
      <PartnerCell
          :type="firstCeilIsCumulative ? 'cumulative' : 'profitable'"
          :ceil="firstCeil"
          @open-m-matrix-partner="openMMatrixPartner(firstCeil)"
          v-if="firstCeil?.matrix"
      />
      <AddPartnerCell
          :type="firstCeilIsCumulative ? 'cumulative' : 'profitable'"
          :ceil="firstCeil"
          :partners-count="partnersCount"
          @open-m-add-partner="openMAddPartner(getPosition(1, 1))"
          v-if="!firstCeil?.matrix"
      />

      <!--   SECOND CEIL    -->
      <PartnerCell
          :type="secondCeilIsCumulative ? 'cumulative' : 'profitable'"
          :ceil="secondCeil"
          @open-m-matrix-partner="openMMatrixPartner(secondCeil)"
          v-if="secondCeil?.matrix"
      />
      <AddPartnerCell
          :type="secondCeilIsCumulative ? 'cumulative' : 'profitable'"
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

const getPosition = (depth: number, pos: number): IPosition => {
  return { depth, pos }
}

const openMAddPartner = (pos: IPosition) => {
  if (partnersCount.value) {
    emit('open-m-add-partner')
    emit('set-position-for-partner', pos)
  }
}

const openMMatrixPartner = (ceil: Ceil) => {
  emit('open-m-matrix-partner')
  emit('select-partner', ceil)
}
</script>

<style scoped lang="scss">
@import 'savings';
</style>