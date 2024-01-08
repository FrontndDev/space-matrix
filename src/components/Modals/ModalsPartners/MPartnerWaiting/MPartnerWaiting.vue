<template>
  <div class="modal-partner-waiting">
    <ModalHeader @close-modal="$emit('close-modal')">
      Партнеры в ожидании
    </ModalHeader>
    <div
        class="modal-partner-waiting__container"
        :class="{'less-four': cells.length < 4 }"
    >
      <div
          class="modal-partner-waiting__block"
          v-for="cell in cells"
          :key="cell.id"
      >
<!--        active-->
        <SmallCell :cell="cell"/>
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
import { useStore } from "vuex";
import {
  computed,
  ComputedRef,
  onMounted,
} from "vue";
import {
  IPartnersList
} from "../../../../interfaces/partners.interface.ts";

const store = useStore()
const cells: ComputedRef<IPartnersList[]> = computed(() => store.state.partners.partnersPending.list)

onMounted(() => {
  store.dispatch('partners/getPendingPartners',
      {
        matrixFilterUserId: 2969585,
        matrixFilterPageId: 1,
      }
  )
})
</script>

<style scoped>
@import "_mPartnerWaiting.scss";
</style>