<template>
  <div class="modal-matrix-partner">
    <ModalHeader
        modal-header="MMatrixPartner"
        @open-m-matrix-partner="parentMatrix"
        :allowTop="matrixById?.allowTop"
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
              {{ [getCellTypeFirstCeil, getCellTypeSecondCeil].includes('profitable') ? 'Доходные' : 'Накопительные' }}
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
                  :cell-type="getCellTypeFirstCeil"
                  :ceil="firstCeil"
                  :partners-count="partnersCount"
                  :subtitle="!firstCeil?.allowSniper && !partnersCount && firstCeil?.allowBuyClone ? 'Купить <span>BOOST</span>' : 'Выставить партнера'"
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
                  :cell-type="getCellTypeSecondCeil"
                  :ceil="secondCeil"
                  :partners-count="partnersCount"
                  :subtitle="!secondCeil?.allowSniper && !partnersCount && secondCeil?.allowBuyClone ? 'Купить <span>BOOST</span>' : 'Выставить партнера'"
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
                :partners-count="store.state.matrixById.countInInfinity"
                @open-m-infinity-cell="openMInfinityCell"
            />
          </div>
        </div>
      </div>
      <CopyLink @click="useCopyLink(store.state.matrixById.matrix?.id, selectedPartner?.matrix?.type ?? '')"/>
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
  ref,
  Ref,
  watch,
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
  'set-partner-by',
  'close-modal',
])

const store = useStore()

const thisIsDreamTon9: ComputedRef<boolean> = computed(() => store.getters.thisIsDreamTon9)

const matrixById: ComputedRef<IMatrix> = computed(() => store.state.matrixById)

const partnersCount: ComputedRef<number> = computed(() => store.state.partners.partnersPendingSecond.totalCount ?? 0)

const ceils: ComputedRef<Ceils> = computed(() => store.state.matrixById?.ceilsCollection?.['1'])

const selectedPartner = inject('selectedPartner') as Ref<Ceil>

const firstCeil: ComputedRef<Ceil> = computed(() => ceils.value?.['1'])
const secondCeil: ComputedRef<Ceil> = computed(() =>
    thisIsDreamTon9.value ? ceils.value?.['1'] : ceils.value?.['2']
)
const thirdCeil: ComputedRef<Ceil> = computed(() =>
    thisIsDreamTon9.value ? ceils.value?.['1'] : ceils.value?.['3']
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

const interval: Ref<number | null> = ref(null)

watch(() => matrixById.value?.in_queue, () => {
  if (matrixById.value?.in_queue) {
    interval.value = setInterval(() => {
      store.dispatch('getMatrixById', matrixById.value.matrix?.id);
    }, 3000);
  } else if (!matrixById.value?.in_queue && interval.value) {
    clearInterval(interval.value);
  }
})

const getTypeForSelectedCeil: ComputedRef<string> = computed(() => {
  if (!selectedPartner.value || matrixById.value?.in_queue) {
    return 'loading'
  }

  if (selectedPartner.value?.matrix?.is_booster) {
    return 'boost'
  }

  return selectedCeilIsCumulative.value ? 'cumulative' : 'profitable'
})

const getTypeForFirstCeil: ComputedRef<string> = computed(() => {
  if (thisIsDreamTon9.value) {
    return 'disable3'
  }

  if (!matrixById.value?.matrix || firstCeil.value?.queueId) {
    return 'loading'
  }

  if (!firstCeil.value?.matrix) {
    if (!firstCeil.value?.allowBuyClone && !firstCeil.value?.allowSniper) {
      return 'disable3'
    }

    if (!firstCeil.value.allowBuyClone && !firstCeil.value?.allowSniper || !firstCeil.value?.allowBuyClone && !partnersCount.value) {
      return 'disable'
    }
  }

  if (firstCeil.value.matrix?.is_booster) {
    return 'boost'
  }

  return firstCeilIsCumulative.value ? 'cumulative' : 'profitable'
})

const getCellTypeFirstCeil: ComputedRef<string> = computed(() => {
  if (getTypeForFirstCeil.value === 'disable') {
    return firstCeilIsCumulative.value ? 'cumulative' : 'profitable'
  } else {
    return getTypeForFirstCeil.value
  }
})

const getTypeForSecondCeil: ComputedRef<string> = computed(() => {
  if (thisIsDreamTon9.value) {
    return 'disable3'
  }

  if (!matrixById.value?.matrix || secondCeil.value?.queueId) {
    return 'loading'
  }

  if (!secondCeil.value?.matrix) {
    if (!secondCeil.value?.allowBuyClone && !secondCeil.value?.allowSniper) {
      return 'disable3'
    }

    if (!secondCeil.value?.allowSniper && !secondCeil.value.allowBuyClone || !secondCeil.value?.allowBuyClone && !partnersCount.value) {
      return 'disable'
    }
  }

  if (secondCeil.value.matrix?.is_booster) {
    return 'boost'
  }

  return secondCeilIsCumulative.value ? 'cumulative' : 'profitable'
})

const getCellTypeSecondCeil: ComputedRef<string> = computed(() => {
  if (getTypeForSecondCeil.value === 'disable') {
    return secondCeilIsCumulative.value ? 'cumulative' : 'profitable'
  } else {
    return getTypeForSecondCeil.value
  }
})

const getPosition = (depth: number, pos: number): IPosition => {
  return { depth, pos }
}

const openMInfinityCell = () => {
  store.dispatch('partners/getInfinityPartners', {
      parentId: store.state.matrixById.matrix?.id,
      isPartnerMatrix: true
  })
  emit('open-m-infinity-cell')
}

const openMAddPartner = (pos: IPosition) => {
  const ceil: Ceil = ceils.value[String(pos.pos)]
  if (!thisIsDreamTon9.value && !ceil.queueId && (partnersCount.value && ceil.allowSniper || ceil.allowBuyClone)) {
    // emit('select-partner', null)
    emit('set-partner-by', 'id')
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
        queueId: null,
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