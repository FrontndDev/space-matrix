<template>
  <Teleport to="body">
    <transition name="modal" class="modal">
      <div v-if="props.toggleModalPartners" class="modal__container">
        <div class="modal__content">
          <MInfinityCell
              @open-m-matrix-partner="$emit('open-m-matrix-partner')"
              @open-m-add-partner="$emit('open-m-add-partner')"
              @close-modal="$emit('close-modal')"
              @select-partner="selectPartner"
              v-if="props.openModalPartners === 1"
          />
          <MMatrixPartner
              @open-m-infinity-cell="$emit('open-m-infinity-cell')"
              @open-m-add-partner="openMAddPartner"
              @select-partner="selectPartner"
              @set-partner-by="setPartnerBy"
              @close-modal="$emit('close-modal')"
              v-else-if="props.openModalPartners === 2"
          />
          <MAddPartner
              :selected-type="selectedType"
              @close-modal="$emit('close-modal')"
              @open-partner-waiting="$emit('open-partner-waiting')"
              @open-m-matrix-partner="$emit('open-m-matrix-partner')"
              v-else-if="props.openModalPartners === 3"
          />
          <MAddpartnerInfinity
              @close-modal="$emit('close-modal')"
              @open-partner-waiting="$emit('open-partner-waiting')"
              v-else-if="props.openModalPartners === 4"
          />
          <MPartnerWaiting
              @close-modal="$emit('close-modal')"
              @open-m-add-partner="$emit('open-m-add-partner')"
              v-else-if="props.openModalPartners === 5"
          />
        </div>
        <div
            class="modal__overlay"
            @click="getEmitForModalOverlay"
        />
      </div>
    </transition>
  </Teleport>
</template>

<script setup lang="ts">
import MInfinityCell from "./MInfinityCell/MInfinityCell.vue";
import MMatrixPartner from "./MMatrixPartner/MMatrixPartner.vue";
import MAddPartner from "./MAddPartner/MAddPartner.vue";
import MPartnerWaiting from "./MPartnerWaiting/MPartnerWaiting.vue";
import MAddpartnerInfinity from "./MAddPartnerInfinity/MAddpartnerInfinity.vue";
import { IPosition } from "../../../interfaces/partners.interface.ts";
import { Ceil } from "../../../interfaces/store.interface.ts";
import {
  inject,
  Ref,
  ref
} from "vue";

const props = defineProps({
  toggleModalPartners: {
    type: Boolean,
    default: false
  },
  openModalPartners: {
    type: Number,
    default: 0
  },
})

const emit = defineEmits([
  'open-m-matrix-partner',
  'open-m-add-partner',
  'open-m-infinity-cell',
  'set-position-for-partner',
  'open-partner-waiting',
  'select-partner',
  'set-partner-by',
  'close-modal',
])

const selectedType = inject('selectedType') as Ref<string>

const getEmitForModalOverlay = () => {
  props.openModalPartners === 3 && selectedType.value === 'id' ? emit('open-m-matrix-partner') : emit('close-modal')
}

const selectPartner = (selectedCeil: Ceil) => {
  emit('select-partner', selectedCeil)
}

const setPartnerBy = (type: string) => {
  // type, id
  emit('set-partner-by', type)
}

const openMAddPartner = (pos: IPosition) => {
  emit('set-position-for-partner', pos)
  emit('open-m-add-partner')
}
</script>

<style scoped lang="scss">
@import "modalsPartners";
</style>