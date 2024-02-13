<template>
  <Teleport to="body">
    <transition name="modal" class="modal">
      <div v-if="props.toggleModalPartners" class="modal__container">
        <div class="modal__content">
          <MInfinityCell
              @open-m-matrix-partner="$emit('open-m-matrix-partner')"
              @open-m-add-partner="$emit('open-m-add-partner')"
              @close-modal="$emit('close-modal')"
              @select-matrix="selectMatrix"
              v-if="props.openModalPartners === 1"
          />
          <MMatrixPartner
              @open-m-infinity-cell="$emit('open-m-infinity-cell')"
              @open-m-add-partner="openMAddPartner"
              @select-matrix="selectMatrix"
              @set-partner-by="setPartnerBy"
              @close-modal="$emit('close-modal')"
              v-else-if="props.openModalPartners === 2"
          />
          <MAddPartner
              :selected-type="selectedType"
              @close-modal="closeAddPartnerModal"
              @open-partner-waiting="$emit('open-partner-waiting')"
              v-else-if="props.openModalPartners === 3"
          />
          <MAddpartnerInfinity
              @close-modal="$emit('close-modal')"
              @open-partner-waiting="$emit('open-partner-waiting')"
              v-else-if="props.openModalPartners === 4"
          />
          <MPartnerWaiting
              @close-modal="closePartnerWaitingModal"
              @open-m-add-partner="$emit('open-m-add-partner')"
              v-else-if="props.openModalPartners === 5"
          />
        </div>
        <div
            class="modal__overlay"
            @click="getEmitForModalOverlay(undefined)"
        />
      </div>
    </transition>
  </Teleport>
</template>

<script setup lang="ts">
import MInfinityCell from "./MInfinityCell/MInfinityCell.vue";
import MMatrixPartner from "./MMatrixPartner/MMatrixPartner.vue";
import MAddPartner from "./MAddPartner/MAddPartner.vue";
import MPartnerWaiting from "./MPartnerWaiting/MPartnerWaiting.vue";
import MAddpartnerInfinity from "./MAddPartnerInfinity/MAddpartnerInfinity.vue";
import { IPosition } from "@/interfaces/partners.interface.ts";
import {
  Ceil,
  Ceils,
  IMatrix
} from "@/interfaces/store.interface.ts";
import {
  computed,
  ComputedRef,
  inject,
  Ref,
} from "vue";
import { useStore } from "vuex";
import { TModalsPartners } from "@/types/types";

const props = defineProps({
  toggleModalPartners: {
    type: Boolean,
    default: false
  },
  openModalPartners: {
    type: Number,
    default: 0
  },
})

const emit = defineEmits([
  'open-m-matrix-partner',
  'open-m-add-partner',
  'open-m-infinity-cell',
  'set-position-for-partner',
  'open-partner-waiting',
  'select-matrix',
  'set-partner-by',
  'close-modal',
])

const selectedType = inject('selectedType') as Ref<string>
const selectedPartner = inject('selectedPartner') as Ref<Ceil>
const partnerPos = inject('partnerPos') as Ref<IPosition>

const store = useStore();

const matrixByType: ComputedRef<IMatrix> = computed(() => store.state.matrixByType)
const matrixById: ComputedRef<IMatrix> = computed(() => store.state.matrixById)

const ceils: ComputedRef<Ceils | undefined> = computed(() =>
    selectedType.value === 'id' ?
        matrixById.value?.ceilsCollection?.['1'] :
        matrixByType.value?.ceilsCollection?.['1']
)

const getCeil: ComputedRef<Ceil | undefined> = computed(() => {
  if (selectedType.value === 'id') {
    return ceils.value?.[String(partnerPos.value.pos)]
  } else {
    return selectedPartner.value ?? ceils.value?.[String(partnerPos.value.pos)]
  }
})

const partnersCount: ComputedRef<number> = computed(() =>
    selectedPartner.value ?
        store.state.partners.partnersPendingSecond.totalCount :
        store.state.partners.partnersPending.totalCount
)

const getEmitForModalOverlay = (emitName?: TModalsPartners) => {
  if (emitName) {
    emit(emitName)
  } else if (selectedType.value === 'id') {
    switch (props.openModalPartners) {
      case 3:
        emit('open-m-matrix-partner');
        break;
      case 5:
        if (!getCeil.value?.allowBuyClone && getCeil.value?.allowSniper && partnersCount.value) {
          emit('open-m-matrix-partner');
        } else {
          emit('open-m-add-partner');
        }
        break;
      default:
        emit('close-modal')
    }
  } else {
    emit('close-modal')
  }
}

const selectMatrix = (matrixId?: number) => {
  emit('select-matrix', matrixId)
}

const setPartnerBy = (type: string) => {
  // type, id
  emit('set-partner-by', type)
}

const openMAddPartner = (pos: IPosition) => {
  emit('set-position-for-partner', pos)
  emit('open-m-add-partner')
}

const closeAddPartnerModal = () => {
  selectedType.value === 'id' ? emit('open-m-matrix-partner') : emit('close-modal')
}

const closePartnerWaitingModal = (emitName?: TModalsPartners) => {
  emitName ? emit(emitName) : selectedType.value === 'id' ?
      emit('open-m-add-partner') :
      emit('close-modal')
}
</script>

<style scoped lang="scss">
@import "modalsPartners";
</style>