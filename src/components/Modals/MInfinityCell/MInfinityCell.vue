<template>
  <div class="modal-infinity-cell">
    <ModalHeader />
    <div class="modal-infinity-cell__container">
      <PartnerCell v-for="item in 10" type="infinity" size="small"/>
    </div>
  </div>
</template>

<script setup lang="ts">

import ModalHeader from "../../ModalHeader/ModalHeader.vue";
import PartnerCell from "../../PartnerCell/PartnerCell.vue";
</script>

<style scoped>
@import "MInfinityCell.scss";
</style>