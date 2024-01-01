<template>
  <transition name="modal" class="modal">
    <div v-if="toggleModal" class="modal__container">
      <div class="modal__content">
        <MInfinityCell
            @open-m-matrix-partner="$emit('open-m-matrix-partner')"
            @open-m-add-partner="$emit('open-m-add-partner')"
            @close-modal="$emit('close-modal')"
            v-if="openModal === 1"
        />
        <MMatrixPartner
            @open-m-infinity-cell="$emit('open-m-infinity-cell')"
            @open-m-add-partner="$emit('open-m-add-partner')"
            @close-modal="$emit('close-modal')"
            v-else-if="openModal === 2"
        />
        <MAddPartner
            @close-modal="$emit('close-modal')"
            v-else-if="openModal === 3"
        />
      </div>
      <div @click="$emit('close-modal')" class="modal__overlay"></div>
    </div>
  </transition>
</template>

<script setup lang="ts">
import MInfinityCell from "../MInfinityCell/MInfinityCell.vue";
import MMatrixPartner from "../MMatrixPartner/MMatrixPartner.vue";
import MAddPartner from "../MAddPartner/MAddPartner.vue";


const props = defineProps({
  toggleModal: {
    type: Boolean,
    default: false
  },
  openModal: {
    type: Number,
    default: 0
  }
})
</script>

<style lang="scss" scoped>
@import "Modal";
</style>