<template>
  <Teleport to="body">
    <transition name="modal" class="modal">
      <div  class="modal__container">\
<!--        v-if="props.toggleModalConfirmPayment"-->
        <div class="modal__content">
          <MConfirmPayment
              :result="props.result"
              :price="-1"
          />
          <div @click="$emit('close-modal')" class="modal__overlay"></div>
        </div>
      </div>
    </transition>
  </Teleport>
</template>

<script setup lang="ts">
import MConfirmPayment from "./MConfirmPayment/MConfirmPayment.vue";

const props = defineProps({
  toggleModalConfirmPayment: {
    type: Boolean,
    default: false
  },
  result: {
    type: String,
    default: 'success'
  }
})
</script>

<style scoped lang="scss">
@import "modalConfirmPayment";
</style>