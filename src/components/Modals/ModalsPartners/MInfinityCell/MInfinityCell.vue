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
<!--      <PartnerCell-->
<!--          type="infinity"-->
<!--          size="small"-->
<!--          v-for="partner in infinityPartners"-->
<!--          :key="partner.id"-->
<!--          :ceil="partner"-->
<!--      />-->
    </div>
  </div>
</template>

<script setup lang="ts">
import ModalHeader from "../../../ModalHeader/ModalHeader.vue";
// import PartnerCell from "../../../PartnerCell/PartnerCell.vue";
// import {
//   computed,
//   ComputedRef
// } from "vue";
// import { useStore } from "vuex";
// import { IPartnersList } from "../../../../interfaces/partners.interface.ts";

// const store = useStore()

// const infinityPartners: ComputedRef<IPartnersList[]> = computed(() => store.state.partners.infinityPartners)


</script>

<style scoped lang="scss">
@import "mInfinityCell";
</style>