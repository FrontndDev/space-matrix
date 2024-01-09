<template>
  <div class="modal-partner-waiting">
    <ModalHeader @close-modal="$emit('close-modal')">
      Партнеры в ожидании
    </ModalHeader>
    <div
        class="modal-partner-waiting__container"
        :class="{'less-four': cells.length < 4 }"
    >
      <template v-if="cells.length">
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
        </div>
      </template>
      <Preloader :with-text="true" v-if="!cells.length"/>
    </div>
    <div class="modal-partner-waiting__buttons">
      <template v-if="selectedCell">
        <CancelButton @click="$emit('open-m-add-partner')" />
        <ChainsButton @click="exposePartner">
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
  inject,
  Ref,
  ref,
} from "vue";
import {
  IExposePartnerParams,
  IPartnersList,
  IPosition
} from "../../../../interfaces/partners.interface.ts";
import Preloader from "../../../UI/Preloader/Preloader.vue";

const store = useStore()
const cells: ComputedRef<IPartnersList[]> = computed(() => store.state.partners.partnersPending.list)

const partnerPos = inject('partnerPos') as Ref<IPosition>
let selectedCell: Ref<IPartnersList | null> = ref(null)

const selectCell = (cell: IPartnersList) => {
  selectedCell.value = cell
}

const exposePartner = () => {
  if (selectedCell.value) {
    const data: IExposePartnerParams = {
      matrix_id: store.state.viewLastOwn.matrix?.id,
      child_id: +selectedCell.value.owner.id,
      depth: partnerPos.value.depth,
      pos: partnerPos.value.pos
    }
    store.dispatch('partners/exposePartner', data)
  }
}
</script>

<style scoped>
@import "_mPartnerWaiting.scss";
</style>