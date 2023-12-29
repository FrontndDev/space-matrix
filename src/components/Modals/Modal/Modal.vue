<template>
  <transition v-if="toggleModal" name="modal" class="modal">
    <div class="modal__container">
      <div class="modal__content">
        <MInfinityCell />
      </div>
      <div class="modal__overlay"></div>
    </div>
  </transition>
</template>

<script setup lang="ts">
import MInfinityCell from "../MInfinityCell/MInfinityCell.vue";

const props = defineProps({
  toggleModal: {
    type: Boolean,
    default: false
  }
})
</script>

<style lang="scss" scoped>
@import "Modal";
</style>