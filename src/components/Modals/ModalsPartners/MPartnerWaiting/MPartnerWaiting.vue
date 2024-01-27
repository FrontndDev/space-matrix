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
              :show-partner-type="!onlyInfinityCell"
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
    <Pagination
        :count="store.state.partners.partnersPending.totalPages"
        :selected-page="selectedPage"
        v-if="store.state.partners.partnersPending.totalPages > 1"
        @select-page="selectPage"
    />
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
import Pagination from "../../../Pagination/Pagination.vue";

const emit = defineEmits(['close-modal', 'open-m-add-partner'])

const store = useStore()
const cells: ComputedRef<Matrix[]> = computed(() => store.state.partners.partnersPending?.list)

const onlyInfinityCell: ComputedRef<boolean> = computed(() => store.getters.onlyInfinityCell)

const selectedPartner = inject('selectedPartner') as Ref<Ceil>
const partnerPos = inject('partnerPos') as Ref<IPosition>
let selectedCell: Ref<Matrix | null> = ref(null)

const selectedPage: ComputedRef<number> = computed(() => store.state.partners.pageIdPartners)

const selectPage = (page: number) => {
  store.commit('partners/SET_PAGE_ID_PARTNERS', page)
  store.dispatch('partners/getPendingPartners')
}

const selectCell = (cell: Matrix) => {
  selectedCell.value = cell
}

const removePartnerFromList = () => {
  if (selectedCell.value) {
    const partnersPending = store.state.partners.partnersPending
    const index = partnersPending.list.map((partner: Matrix) => partner.id).indexOf(+selectedCell.value?.id)
    partnersPending.list.splice(index, 1)
    partnersPending.totalCount--

    const newPartnersPending = store.state.partners.newPartnersPending
    if (newPartnersPending.list?.[0]?.type === store.state.selectedType.type) {
      newPartnersPending.list.splice(index, 1)
      newPartnersPending.totalCount--
    }
  }
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
    if (!partnerMatrix) {
      store.state.matrixByType.ceilsCollection['1'][String(partnerPos.value.pos)].queueId = 1
    }

    await store.dispatch('partners/exposePartner', data)

    if (!partnerMatrix && myMatrix) {
      await store.dispatch('getMatrixByType', store.state.selectedType.type)
      await store.dispatch('partners/getPendingPartners', { isPartnerMatrix: false })

      if (selectedCell.value?.time_to_activate) {
        await store.dispatch('getListOfTypes')
      }
    }
    removePartnerFromList()
    emit('close-modal')
  }
}
</script>

<style scoped lang="scss">
@import "mPartnerWaiting";
</style>