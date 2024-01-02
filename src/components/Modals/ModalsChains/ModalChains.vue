<template>
  <transition name="modal" class="modal">
    <div v-if="toggleModalChains" class="modal__container">
      <div class="modal__content">
        <GeneralChains @close-modal="$emit('close-modal')" />

      </div>
      <div @click="$emit('close-modal')" class="modal__overlay"></div>
    </div>
  </transition>
</template>

<script setup lang="ts">


import GeneralChains from "./GeneralChains/GeneralChains.vue";

const props = defineProps({
  toggleModalChains: {
    type: Boolean,
    default: false
  },
  openModalChains: {
    type: Number,
    default: 0
  }
})
</script>

<style scoped>
@import "ModalChains.scss";
</style>