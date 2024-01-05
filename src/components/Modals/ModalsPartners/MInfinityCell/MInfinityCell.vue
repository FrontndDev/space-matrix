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
      <PartnerCell type="infinity" size="small"/>
      <PartnerCell type="infinity" size="small"/>
      <PartnerCell type="infinity" size="small"/>
      <PartnerCell type="infinity" size="small"/>
      <PartnerCell type="infinity" size="small"/>
      <PartnerCell type="infinity" size="small"/>
      <PartnerCell type="infinity" size="small"/>
      <PartnerCell type="infinity" size="small"/>
      <PartnerCell type="infinity" size="small"/>
      <PartnerCell type="infinity" size="small"/>
      <PartnerCell type="infinity" size="small"/>
      <PartnerCell type="infinity" size="small"/>
    </div>
  </div>
</template>

<script setup lang="ts">

import ModalHeader from "../../../ModalHeader/ModalHeader.vue";
import PartnerCell from "../../../PartnerCell/PartnerCell.vue";

</script>

<style scoped>
@import "MInfinityCell.scss";
</style>