<template>
  <div class="modal-partner-waiting">
    <ModalHeader
        @close-modal="emit('close-modal')"
    >
      Партнеры в ожидании
    </ModalHeader>
    <div
        class="modal-partner-waiting__container"
        :class="{'less-four': cells?.length < 4 }"
    >
      <template v-if="cells">
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
      <Preloader :with-text="true" v-if="!cells"/>
    </div>
    <div class="modal-partner-waiting__buttons">
      <template v-if="selectedCell">
        <CancelButton @click="emit('open-m-add-partner')" />
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
  IPosition
} from "../../../../interfaces/partners.interface.ts";
import Preloader from "../../../UI/Preloader/Preloader.vue";
import {
  Ceil,
  Matrix
} from "../../../../interfaces/store.interface.ts";

const emit = defineEmits(['close-modal', 'open-m-add-partner'])

const store = useStore()
const cells: ComputedRef<Matrix[]> = computed(() => store.state.partners.partnersPending?.list)

const selectedPartner = inject('selectedPartner') as Ref<Ceil>
const partnerPos = inject('partnerPos') as Ref<IPosition>
let selectedCell: Ref<Matrix | null> = ref(null)

const selectCell = (cell: Matrix) => {
  selectedCell.value = cell
}

const exposePartner = async () => {
  const myMatrix = store.state.matrixByType?.matrix
  const partnerMatrix = selectedPartner.value?.matrix

  if ((partnerMatrix || myMatrix) && selectedCell.value) {
    // @ts-ignore
    const data: IExposePartnerParams = {
      matrix_id: partnerMatrix ? +partnerMatrix.id : +myMatrix?.id,
      child_id: +selectedCell.value?.id,
      depth: partnerPos.value.depth,
      pos: partnerPos.value.pos
    }
    await store.dispatch('partners/exposePartner', data)

    if (!partnerMatrix && myMatrix) {
      await store.dispatch('getMatrixByType', store.state.selectedType.type)
      await store.dispatch('partners/getPendingPartners', { isPartnerMatrix: false })
    }
    emit('close-modal')
  }
}
</script>

<style scoped lang="scss">
@import "mPartnerWaiting";
</style>