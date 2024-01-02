<template>
  <transition name="modal" class="modal">
    <div v-if="toggleModalPartners" class="modal__container">
      <div class="modal__content">
        <MInfinityCell
            @open-m-matrix-partner="$emit('open-m-matrix-partner')"
            @open-m-add-partner="$emit('open-m-add-partner')"
            @close-modal="$emit('close-modal')"
            v-if="openModalPartners === 1"
        />
        <MMatrixPartner
            @open-m-infinity-cell="$emit('open-m-infinity-cell')"
            @open-m-add-partner="$emit('open-m-add-partner')"
            @close-modal="$emit('close-modal')"
            v-else-if="openModalPartners === 2"
        />
        <MAddPartner
            @close-modal="$emit('close-modal')"
            v-else-if="openModalPartners === 3"
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


const props = defineProps({
  toggleModalPartners: {
    type: Boolean,
    default: false
  },
  openModalPartners: {
    type: Number,
    default: 0
  }
})
</script>

<style lang="scss" scoped>
@import "ModalsPartners";
</style>