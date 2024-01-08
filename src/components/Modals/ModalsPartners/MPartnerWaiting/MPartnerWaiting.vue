<template>
  <div class="modal-partner-waiting">
    <ModalHeader @close-modal="$emit('close-modal')">
      Партнеры в ожидании
    </ModalHeader>
    <div
        class="modal-partner-waiting__container"
        :class="{'less-four': cells.length < 4 }"
    >
      <div class="modal-partner-waiting__block active">
        <SmallCell />
      </div>
      <div class="modal-partner-waiting__block">
        <SmallCell />
      </div>
      <div class="modal-partner-waiting__block">
        <SmallCell />
      </div>
      <div class="modal-partner-waiting__block">
        <SmallCell />
      </div>
      <div class="modal-partner-waiting__block">
        <SmallCell />
      </div>
    </div>
    <div class="modal-partner-waiting__buttons">
      <CancelButton @click="$emit('open-m-add-partner')" />
      <ChainsButton>
        Выставить
      </ChainsButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import ModalHeader from "../../../ModalHeader/ModalHeader.vue";
import ChainsButton from "../../../UI/ChainsButton/ChainsButton.vue";
import CancelButton from "../../../UI/CancelButton/CancelButton.vue";
import SmallCell from "../../../SmallCell/SmallCell.vue";

const cells = [
  { id: 0 },
  { id: 1 },
  { id: 2 },
  { id: 3 },
]

</script>

<style scoped>
@import "_mPartnerWaiting.scss";
</style>