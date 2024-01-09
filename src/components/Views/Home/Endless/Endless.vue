<template>
  <div class="endless">
    <div class="endless__title">Бесконечные</div>

    <div class="endless__menu endless__menu_mt-16">
      <AddPartnerCell
          type="infinity"
          :ceil="thirdCeil"
          @open-m-add-partner="openMAddPartner(getPosition(1, 3))"
      />
      <InfinityPartnerCard
          :ceil="thirdCeil"
          @open-m-infinity-cell="emit('open-m-infinity-cell')"
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
  Ref
} from "vue";
import {
  Ceil,
  Ceils
} from "../../../../interfaces/store.interface.ts";
import { IPosition } from "../../../../interfaces/partners.interface.ts";
import { ComputedRef } from "vue/dist/vue";

const emit = defineEmits(['open-m-infinity-cell', 'open-m-add-partner', 'set-position-for-partner'])

const store = useStore()
const partnersCount: ComputedRef<number> = computed(() => store.state.partners.partnersPending.count)

const ceils: Ref<Ceils> = computed(() => store.state.matrixByType?.ceilsCollection['1'])
const thirdCeil: Ref<Ceil> = computed(() => ceils.value?.['3'])

const getPosition = (depth: number, pos: number): IPosition => {
  return { depth, pos }
}

const openMAddPartner = (pos: IPosition) => {
  if (partnersCount.value) {
    emit('open-m-add-partner')
    emit('set-position-for-partner', pos)
  }
}
</script>

<style scoped lang="scss">
@import "endless";
</style>