<template>
  <div class="modal-partner-waiting">
    <ModalHeader
        modal-header="back"
        @close-modal="$emit('close-modal')"
        @back="back"
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
            v-for="(cell, idx) in cells"
            :key="cell.id"
        >
          <SmallCell
              :cell="cell"
              :show-partner-type="!onlyInfinityCell"
              :tooltip-position="(idx + 1) % 4 === 0 ? 'left' : 'right'"
              @click="selectCell(cell)"
          />
        </div>
      </template>
      <Preloader :with-text="true" v-if="!cells"/>
    </div>
    <div class="modal-partner-waiting__buttons" v-if="selectedCell">
      <CancelButton @click="emit('open-m-add-partner')" />
      <ChainsButton @click="exposePartner">
        Выставить
      </ChainsButton>
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
import ModalHeader from "@/components/ModalHeader/ModalHeader.vue";
import ChainsButton from "@/components/UI/ChainsButton/ChainsButton.vue";
import CancelButton from "@/components/UI/CancelButton/CancelButton.vue";
import SmallCell from "@/components/SmallCell/SmallCell.vue";
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
} from "@/interfaces/partners.interface.ts";
import Preloader from "@/components/UI/Preloader/Preloader.vue";
import {
  Ceil,
  Matrix
} from "@/interfaces/store.interface.ts";
import Pagination from "@/components/Pagination/Pagination.vue";
import {
  useRoute,
  useRouter
} from "vue-router";

const emit = defineEmits([
  'open-m-add-partner',
  'open-m-matrix-partner',
  'close-modal',
])

const store = useStore()
const router = useRouter()
const route = useRoute()

const cells: ComputedRef<Matrix[]> = computed(() =>
    selectedType.value === 'id' ?
        store.state.partners.partnersPendingSecond?.list :
        store.state.partners.partnersPending?.list
)

const selectedPartner = inject('selectedPartner') as Ref<Ceil>
const partnerPos = inject('partnerPos') as Ref<IPosition>
const selectedType = inject('selectedType') as Ref<string>

const onlyInfinityCell: ComputedRef<boolean> = computed(() =>
    selectedType.value === 'id' ?
        store.state.matrixById.matrix?.type === 'dream-ton_9' :
        store.getters.onlyInfinityCell
)

let selectedCell: Ref<Matrix | null> = ref(null)

const selectedPage: ComputedRef<number> = computed(() => store.state.partners.pageIdPartners)

const typeWaitingModal = inject('typeWaitingModal') as Ref<'view' | undefined>

const selectPage = (page: number) => {
  store.commit('partners/SET_PAGE_ID_PARTNERS', page)
  store.dispatch('partners/getPendingPartners')
}

const back = () => {
  typeWaitingModal.value === 'view' ? emit('open-m-matrix-partner') : emit('close-modal')
}

const selectCell = (cell: Matrix) => {
  if (!typeWaitingModal.value) {
    selectedCell.value = cell
  } else {
    router.push(route.path + `?uuid=${cell.id}`)
  }
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
    const data: IExposePartnerParams = {
      matrix_id: partnerMatrix ? +partnerMatrix.id : +myMatrix?.id,
      child_id: +selectedCell.value?.id,
      depth: partnerPos.value.depth,
      pos: partnerPos.value.pos
    }
    if (!partnerMatrix) {
      store.state.matrixByType.ceilsCollection['1'][String(partnerPos.value.pos)].queueId = 1
    } else {
      store.state.matrixById.ceilsCollection['1'][String(partnerPos.value.pos)].queueId = 1
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
    emit('close-modal', 'open-m-matrix-partner')
  }
}
</script>

<style scoped lang="scss">
@import "mPartnerWaiting";
</style>