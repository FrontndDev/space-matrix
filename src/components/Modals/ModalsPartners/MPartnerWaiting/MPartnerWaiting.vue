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
          :class="{ active: selectedCell?.id === cell.id }"
          v-for="cell in cells"
          :key="cell.id"
      >
        <SmallCell
            :cell="cell"
            @click="selectCell(cell)"
        />

        <Preloader :with-text="true" v-if="!cells.length"/>
      </div>
    </div>
    <div class="modal-partner-waiting__buttons">
      <template v-if="selectedCell">
        <CancelButton @click="$emit('open-m-add-partner')" />
        <ChainsButton>
          Выставить
        </ChainsButton>
      </template>
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
  Ref,
  ref,
} from "vue";
import {
  IPartnersList
} from "../../../../interfaces/partners.interface.ts";
import Preloader from "../../../UI/Preloader/Preloader.vue";

const store = useStore()
const cells: ComputedRef<IPartnersList[]> = computed(() => store.state.partners.partnersPending.list)

let selectedCell: Ref<IPartnersList | null> = ref(null)

const selectCell = (cell: IPartnersList) => {
  selectedCell.value = cell
}
</script>

<style scoped>
@import "_mPartnerWaiting.scss";
</style>