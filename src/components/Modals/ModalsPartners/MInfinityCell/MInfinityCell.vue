<template>
  <div class="modal-infinity-cell">
    <ModalHeader
        @close-modal="$emit('close-modal')"
        @open-m-matrix-partner="$emit('open-m-matrix-partner')"
        :modalHeader="'back'"
    >
      Бесконечная ячейка
    </ModalHeader>
    <div class="modal-infinity-cell__container">
      <PartnerCell
          type="infinity"
          size="small"
          v-for="partner in infinityPartners"
          :key="partner.id"
          :ceil="partner"
          @open-m-matrix-partner="selectPartner(partner)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import ModalHeader from "../../../ModalHeader/ModalHeader.vue";
import PartnerCell from "../../../PartnerCell/PartnerCell.vue";
import {
  computed,
  ComputedRef,
  inject,
  Ref
} from "vue";
import { useStore } from "vuex";
import {
  Ceil,
  Matrix
} from "../../../../interfaces/store.interface.ts";

const emit = defineEmits([
  'close-modal',
  'open-m-matrix-partner',
  'select-partner',
])

const store = useStore()

const selectedPartner = inject('selectedPartner') as Ref<Ceil>

const infinityPartners: ComputedRef<Matrix[]> = computed(() => {
  const partnersState = store.state.partners
  return selectedPartner.value ? partnersState.infinityPartnersSecond : partnersState.infinityPartners
})

const selectPartner = (partner: Matrix) => {
  const ceil = {
    depth: 0,
    pos: 0,
    queueId: null,
    matrix: partner,
    allowBuyClone: false,
    allowSniper: false,
    fillRevard: [],
    isInfinity: false,
  }

  emit('select-partner', ceil)
  emit('open-m-matrix-partner')
}
</script>

<style scoped lang="scss">
@import "mInfinityCell";
</style>