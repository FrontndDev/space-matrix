<template>
  <div class="modal-matrix-partner">
    <ModalHeader
        modal-header="MMatrixPartner"
        @open-m-matrix-partner="parentMatrix"
        @close-modal="$emit('close-modal')"
    >
      Матрица партнера
    </ModalHeader>
    <div class="modal-matrix-partner__container">
      <div class="modal-matrix-partner__overflow">
        <div class="modal-matrix-partner__cell">
          <!--     PARTNER CEIL      -->
          <PartnerCell
              size="small"
              cellType="circle-avatar"
              :type="getTypeForSelectedCeil"
              :ceil="selectedPartner?.matrix"
              v-if="selectedPartner?.matrix"
              @circle-avatar="getUser"
          />
          <AddPartnerCell
              size="small"
              type="loading"
              :ceil="selectedPartner"
              :partners-count="partnersCount"
              v-if="!selectedPartner?.matrix"
          />
        </div>
        <div class="modal-matrix-partner__block">

          <div class="modal-matrix-partner__savings">
            <div class="modal-matrix-partner__block-title">
              {{ [getTypeForFirstCeil, getTypeForSecondCeil].includes('profitable') ? 'Доходные' : 'Накопительные' }}
            </div>
            <div class="savings__partners savings__partners_mt-16">
              <!--       FIRST CEIL        -->
              <PartnerCell
                  size="small"
                  :type="getTypeForFirstCeil"
                  :ceil="firstCeil.matrix"
                  v-if="firstCeil?.matrix"
                  @open-m-matrix-partner="openMMatrixPartner(firstCeil)"
              />
              <AddPartnerCell
                  size="small"
                  :type="getTypeForFirstCeil"
                  :cell-type="getTypeForFirstCeil"
                  :ceil="firstCeil"
                  :partners-count="partnersCount"
                  v-if="!firstCeil?.matrix"
                  @open-m-add-partner="openMAddPartner(getPosition(1, 1))"
              />

              <!--       SECOND CEIL        -->
              <PartnerCell
                  size="small"
                  :type="getTypeForSecondCeil"
                  :ceil="secondCeil.matrix"
                  v-if="secondCeil?.matrix"
                  @open-m-matrix-partner="openMMatrixPartner(secondCeil)"
              />
              <AddPartnerCell
                  size="small"
                  :type="getTypeForSecondCeil"
                  :cell-type="getTypeForSecondCeil"
                  :ceil="secondCeil"
                  :partners-count="partnersCount"
                  v-if="!secondCeil?.matrix"
                  @open-m-add-partner="openMAddPartner(getPosition(1, 2))"
              />
            </div>
          </div>

          <div class="modal-matrix-partner__endless">
            <div class="modal-matrix-partner__block-title">Бесконечные</div>
            <InfinityPartnerCard
                modal="m-matrix-partner"
                :ceil="thirdCeil"
                :partners-count="infinityPartnersCount"
                @open-m-infinity-cell="$emit('open-m-infinity-cell')"
            />
          </div>
        </div>
      </div>
      <CopyLink @click="useCopyLink(store.state.matrixById.matrix?.id)"/>
    </div>
  </div>
</template>

<script setup lang="ts">

import ModalHeader from "../../../ModalHeader/ModalHeader.vue";
import PartnerCell from "../../../PartnerCell/PartnerCell.vue";
import CopyLink from "../../../Views/Home/CopyLink/CopyLink.vue";
import AddPartnerCell from "../../../AddPartnerCell/AddPartnerCell.vue";
import InfinityPartnerCard from "../../../InfinityPartnerCard/InfinityPartnerCard.vue";
import { useStore } from "vuex";
import {
  computed,
  ComputedRef,
  inject,
  Ref
} from "vue";
import {
  Ceil,
  Ceils,
  IMatrix,
} from "../../../../interfaces/store.interface.ts";
import {
  IPosition
} from "../../../../interfaces/partners.interface.ts";
import { useCopyLink } from "../../../../use/useCopyLink.ts";

const emit = defineEmits([
  'open-m-add-partner',
  'open-m-infinity-cell',
  'open-m-matrix-partner',
  'select-partner',
  'close-modal',
])

const store = useStore()

const partnersCount: ComputedRef<number> = computed(() => store.state.partners.partnersPendingSecond.count)

const ceils: Ref<Ceils> = computed(() => store.state.matrixById?.ceilsCollection?.['1'])

const selectedPartner = inject('selectedPartner') as Ref<Ceil>

const firstCeil: ComputedRef<Ceil> = computed(() => ceils.value?.['1'])
const secondCeil: ComputedRef<Ceil> = computed(() => ceils.value?.['2'])
const thirdCeil: ComputedRef<Ceil> = computed(() => ceils.value?.['3'])

const infinityPartnersCount: ComputedRef<number> = computed(() =>
    store.state.partners.infinityPartnersSecond?.length ?? 0
)

const selectedCeilIsCumulative: ComputedRef<boolean> = computed(() =>
    !!selectedPartner.value.fillRevard?.find(reward => reward.event === 'freeze')
)

const firstCeilIsCumulative: ComputedRef<boolean> = computed(() =>
    !!firstCeil.value.fillRevard.find(reward => reward.event === 'freeze')
)
const secondCeilIsCumulative: ComputedRef<boolean> = computed(() =>
    !!firstCeil.value.fillRevard.find(reward => reward.event === 'freeze')
)

// TODO Не трогать!!! Хочу сделать покомпактнее!!!
// const getCeilType = (num: number) => {
//   let ceil: Ceil | null = null
//   switch (num) {
//     case 1:
//       ceil = firstCeil.value
//       break;
//     case 2:
//       ceil = secondCeil.value
//       break;
//     default:
//       break;
//   }
// }

const getTypeForSelectedCeil: ComputedRef<string> = computed(() => {
  if (!selectedPartner) {
    return 'loading'
  }

  return selectedCeilIsCumulative.value ? 'cumulative' : 'profitable'
})

const getTypeForFirstCeil: ComputedRef<string> = computed(() => {
  if (!firstCeil.value?.matrix) {
    if (!store.state.matrixById?.matrix) {
      return 'loading'
    }
    if (!firstCeil.value?.allowSniper || !partnersCount.value) {
      return 'disable'
    }

    if (firstCeil.value.matrix?.is_booster) {
      return 'boost'
    }
  }

  return firstCeilIsCumulative.value ? 'cumulative' : 'profitable'
})

const getTypeForSecondCeil: ComputedRef<string> = computed(() => {
  if (!secondCeil.value?.matrix) {
    if (!store.state.matrixById?.matrix) {
      return 'loading'
    }
    if (!secondCeil.value?.allowSniper || !partnersCount.value) {
      return 'disable'
    }

    if (secondCeil.value.matrix?.is_booster) {
      return 'boost'
    }
  }

  return secondCeilIsCumulative.value ? 'cumulative' : 'profitable'
})

const getPosition = (depth: number, pos: number): IPosition => {
  return { depth, pos }
}

const openMAddPartner = (pos: IPosition) => {
  const ceil: Ceil = ceils.value[String(pos.pos)]
  if (partnersCount.value && ceil.allowSniper || ceil.allowBuyClone) {
    emit('open-m-add-partner', pos)
  }
}

const openMMatrixPartner = (ceil: Ceil) => {
  if (!ceil?.matrix?.is_booster) {
    emit('open-m-matrix-partner')
    emit('select-partner', ceil)
  }
}

const getUser = () => {
  // @ts-ignore
  getUserInfo(selectedPartner.value.matrix?.owner.id)
  console.log('getuser')
}

const parentMatrix = async () => {
  const parentMatrixId = selectedPartner.value?.matrix?.parent_matrix_id
  if (parentMatrixId) {
    emit('select-partner', {})
    store.commit('SET_MATRIX_BY_ID', {})

    const response = await store.dispatch('getMatrixById', parentMatrixId)

    if (response?.error_code) {
      emit('close-modal')
    }

    if (response?.data?.matrix) {
      selectedPartner.value = {
        depth: 0,
        pos: 0,
        matrix: response.data.matrix,
        allowBuyClone: false,
        allowSniper: false,
        fillRevard: [],
        isInfinity: false,
      }
    }
  }
}
</script>

<style scoped lang="scss">
@import "mMatrixPartner";
</style>