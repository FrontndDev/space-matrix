<template>
  <Teleport to="body">
    <transition name="modal" class="modal">
      <div v-if="props.toggleModalChains" class="modal__container">
        <div class="modal__content">
          <MGeneralChains
              v-if="props.openModalChains === 1"
              @close-modal="$emit('close-modal')"
              @open-expose-partner="$emit('open-expose-partner')"
              @open-add-partner-chains="$emit('open-add-partner-chains')"
          />
          <MReplacePartner
              v-if="props.openModalChains === 2"
              @close-modal="$emit('close-modal')"
              @open-general-chains="$emit('open-general-chains')"
              @open-change-partner="$emit('open-change-partner')"
          />
          <MChangePartner
              v-if="props.openModalChains === 3"
              @close-modal="$emit('close-modal')"
              @open-m-replace-partner="$emit('open-m-replace-partner')"
              @open-expose-partner="$emit('open-expose-partner')"
          />
          <MExposePartner
              v-if="props.openModalChains === 4"
              @close-modal="$emit('close-modal')"
              @open-change-partner="$emit('open-change-partner')"
              @open-general-chains="$emit('open-general-chains')"
          />
          <MTeleport
              v-if="props.openModalChains === 5"
              @close-modal="$emit('close-modal')"
          />
          <MAddPartnerChains
              v-if="props.openModalChains === 6"
              @close-modal="$emit('close-modal')"
              @buy-booster="$emit('buy-booster')"
          />
        </div>
        <div @click="$emit('close-modal')" class="modal__overlay" />
      </div>
    </transition>
  </Teleport>
</template>

<script setup lang="ts">
import MGeneralChains from "./MGeneralChains/MGeneralChains.vue";
import MReplacePartner from "./MReplacePartner/MReplacePartner.vue";
import MChangePartner from "./MChangePartner/MChangePartner.vue";
import MExposePartner from "./MExposePartner/MExposePartner.vue";
import MTeleport from "./MTeleport/MTeleport.vue";
import MAddPartnerChains from "./MAddPartnerChains/MAddPartnerChains.vue";

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
@import "_modalChains.scss";
</style>