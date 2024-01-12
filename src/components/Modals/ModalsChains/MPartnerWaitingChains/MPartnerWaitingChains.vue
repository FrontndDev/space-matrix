<template>
  <div class="modal-partner-waiting-chains">
    <ModalHeader
        :partnerWaiting="true"
        @close-modal="emit('close-modal')"
        @open-m-add-partner="emit('open-m-add-partner')"
    >
      Партнеры в ожидании
    </ModalHeader>
    <div
        class="modal-partner-waiting-chains__container"
        :class="{'less-four': cells?.length < 4 }"
    >
      <template v-if="cells">
        <div
            class="modal-partner-waiting-chains__block"
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
      <Preloader :with-text="true" v-if="!cells"/>
    </div>
    <div class="modal-partner-waiting-chains__buttons">
      <template v-if="selectedCell">
        <CancelButton @click="emit('open-m-add-partner')" />
        <ChainsButton>
          Выставить
        </ChainsButton>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import CancelButton from "../../../UI/CancelButton/CancelButton.vue";
import ModalHeader from "../../../ModalHeader/ModalHeader.vue";
import Preloader from "../../../UI/Preloader/Preloader.vue";
import SmallCell from "../../../SmallCell/SmallCell.vue";
import ChainsButton from "../../../UI/ChainsButton/ChainsButton.vue";
import {
  computed,
  ComputedRef,
  inject,
  ref,
  Ref
} from "vue";
import {
  Ceil,
  Matrix
} from "../../../../interfaces/store.interface.ts";
import { useStore } from "vuex";
import { IPosition } from "../../../../interfaces/partners.interface.ts";

const emit = defineEmits(['close-modal', 'open-m-add-partner'])

const store = useStore()
const cells: ComputedRef<Matrix[]> = computed(() => store.state.partners.partnersPending?.list)

const selectedPartner = inject('selectedPartner') as Ref<Ceil>

const partnerPos = inject('partnerPos') as Ref<IPosition>
let selectedCell: Ref<Matrix | null> = ref(null)

const selectCell = (cell: Matrix) => {
  selectedCell.value = cell
}
</script>

<style scoped lang="scss">
@import "mPartnerWaitingChains";
</style>