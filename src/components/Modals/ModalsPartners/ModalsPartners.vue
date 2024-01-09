<template>
  <transition name="modal" class="modal">
    <div v-if="props.toggleModalPartners" class="modal__container">
      <div class="modal__content">
        <MInfinityCell
            @open-m-matrix-partner="$emit('open-m-matrix-partner')"
            @open-m-add-partner="$emit('open-m-add-partner')"
            @close-modal="$emit('close-modal')"
            v-if="props.openModalPartners === 1"
        />
        <MMatrixPartner
            @open-m-infinity-cell="$emit('open-m-infinity-cell')"
            @open-m-add-partner="openMAddPartner"
            @close-modal="$emit('close-modal')"
            v-else-if="props.openModalPartners === 2"
        />
        <MAddPartner
            @close-modal="$emit('close-modal')"
            @open-partner-waiting="$emit('open-partner-waiting')"
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
      <div @click="$emit('close-modal')" class="modal__overlay"></div>
    </div>
  </transition>
</template>

<script setup lang="ts">
import MInfinityCell from "./MInfinityCell/MInfinityCell.vue";
import MMatrixPartner from "./MMatrixPartner/MMatrixPartner.vue";
import MAddPartner from "./MAddPartner/MAddPartner.vue";
import MPartnerWaiting from "./MPartnerWaiting/MPartnerWaiting.vue";
import MAddpartnerInfinity from "./MAddPartnerInfinity/MAddpartnerInfinity.vue";
import { IPosition } from "../../../interfaces/partners.interface.ts";

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

const emit = defineEmits(['open-m-add-partner', 'set-position-for-partner'])

const openMAddPartner = (pos: IPosition) => {
  emit('set-position-for-partner', pos)
  emit('open-m-add-partner')
}
</script>

<style lang="scss" scoped>
@import "modalsPartners";
</style>