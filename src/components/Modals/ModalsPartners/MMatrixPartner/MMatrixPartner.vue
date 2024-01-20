<template>
  <div class="modal-matrix-partner">
    <ModalHeader
        modal-header="MMatrixPartner"
        :allowTop="matrixById?.allowTop"
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
                  disabled-subtitle="Доходная ячейка"
                  :type="getTypeForFirstCeil"
                  :cell-type="getCellTypeFirstCeil"
                  :ceil="firstCeil"
                  :partners-count="partnersCount"
                  :title="!firstCeil?.allowSniper && !partnersCount && firstCeil?.allowBuyClone ? 'Купить <span>BOOST</span>' : 'Выставить партнера'"
                  :subtitle="!firstCeil?.allowSniper && !partnersCount && firstCeil?.allowBuyClone ? `${matrixById.matrixConfig.price}` : ''"
                  v-if="!firstCeil?.matrix"
                  @open-m-add-partner="openMAddPartner(getPosition(1, 1))"
              >
                <template #subtitleIcon v-if="!firstCeil?.allowSniper && !partnersCount && firstCeil?.allowBuyClone">
                  <svg xmlns="http://www.w3.org/2000/svg" width="17" height="16" viewBox="0 0 17 16" fill="none">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M7.08823 12.4278C7.69766 13.5451 9.302 13.5451 9.91143 12.4278L13.6345 5.60209C14.219 4.5306 13.4435 3.22419 12.2229 3.22419H4.77671C3.55619 3.22419 2.78066 4.5306 3.36511 5.60209L7.08823 12.4278ZM9.20563 12.0428L12.9287 5.21711C13.221 4.68137 12.8332 4.02816 12.2229 4.02816H8.90181V12.3557C9.02361 12.2858 9.12996 12.1816 9.20563 12.0428ZM7.79403 12.0428C7.8697 12.1816 7.97605 12.2858 8.09784 12.3557V4.02816H4.77671C4.16645 4.02816 3.77869 4.68137 4.07091 5.21711L7.79403 12.0428Z" fill="#7B879D"/>
                  </svg>
                </template>
              </AddPartnerCell>

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
                  :title="!secondCeil?.allowSniper && !partnersCount && secondCeil?.allowBuyClone ? 'Купить <span>BOOST</span>' : 'Выставить партнера'"
                  :subtitle="!secondCeil?.allowSniper && !partnersCount && secondCeil?.allowBuyClone ? `${matrixById.matrixConfig.price}` : ''"
                  :disabled-subtitle="!firstCeil?.matrix ? 'Заполните левую ячейку' : 'Доходная ячейка'"
                  v-if="!secondCeil?.matrix"
                  @open-m-add-partner="openMAddPartner(getPosition(1, 2))"
              >
                <template #subtitleIcon v-if="!secondCeil?.allowSniper && !partnersCount && secondCeil?.allowBuyClone">
                  <svg xmlns="http://www.w3.org/2000/svg" width="17" height="16" viewBox="0 0 17 16" fill="none">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M7.08823 12.4278C7.69766 13.5451 9.302 13.5451 9.91143 12.4278L13.6345 5.60209C14.219 4.5306 13.4435 3.22419 12.2229 3.22419H4.77671C3.55619 3.22419 2.78066 4.5306 3.36511 5.60209L7.08823 12.4278ZM9.20563 12.0428L12.9287 5.21711C13.221 4.68137 12.8332 4.02816 12.2229 4.02816H8.90181V12.3557C9.02361 12.2858 9.12996 12.1816 9.20563 12.0428ZM7.79403 12.0428C7.8697 12.1816 7.97605 12.2858 8.09784 12.3557V4.02816H4.77671C4.16645 4.02816 3.77869 4.68137 4.07091 5.21711L7.79403 12.0428Z" fill="#7B879D"/>
                  </svg>
                </template>
              </AddPartnerCell>
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
  onMounted,
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
import { useCopyLink } from "../../../../composables/useCopyLink.ts";
import {
  useRoute,
  useRouter
} from "vue-router";

const emit = defineEmits([
  'open-m-add-partner',
  'open-m-infinity-cell',
  'open-m-matrix-partner',
  'select-partner',
  'set-partner-by',
  'close-modal',
])

const router = useRouter()
const route = useRoute()

const store = useStore()

const onlyInfinityCell: ComputedRef<boolean> = computed(() => store.getters.onlyInfinityCell)

const matrixById: ComputedRef<IMatrix> = computed(() => store.state.matrixById)

const partnersCount: ComputedRef<number> = computed(() => store.state.partners.partnersPendingSecond.totalCount ?? 0)

const ceils: ComputedRef<Ceils> = computed(() => store.state.matrixById?.ceilsCollection?.['1'])

const selectedPartner = inject('selectedPartner') as Ref<Ceil>

const firstCeil: ComputedRef<Ceil> = computed(() => ceils.value?.['1'])
const secondCeil: ComputedRef<Ceil> = computed(() =>
    onlyInfinityCell.value ? ceils.value?.['1'] : ceils.value?.['2']
)
const thirdCeil: ComputedRef<Ceil> = computed(() =>
    onlyInfinityCell.value ? ceils.value?.['1'] : ceils.value?.['3']
)

const selectedCeilIsCumulative: ComputedRef<boolean> = computed(() =>
    !!selectedPartner.value.fillRevard?.find(reward => reward.event === 'freeze')
)

const firstCeilIsCumulative: ComputedRef<boolean> = computed(() =>
    !!firstCeil.value?.fillRevard.find(reward => reward.event === 'freeze')
)
const secondCeilIsCumulative: ComputedRef<boolean> = computed(() =>
    !!firstCeil.value?.fillRevard.find(reward => reward.event === 'freeze')
)

const interval: Ref<number | null> = ref(null)

const matrixIsInQueueForPublication: ComputedRef<boolean> = computed(() => {
  const ceilsCollection = store.state.matrixById?.ceilsCollection?.['1']
  return ceilsCollection ? Object.values(ceilsCollection).map(ceil => !!(ceil as Ceil).queueId).includes(true) : false
})

const loadMatrix = () => {
  if (matrixIsInQueueForPublication.value) {
    console.log('interval')
    interval.value = setInterval(() => {
      store.dispatch('getMatrixById', matrixById.value.matrix?.id);
    }, 3000);
  } else if (!matrixIsInQueueForPublication.value && interval.value) {
    console.log('clear interval')
    clearInterval(interval.value);
  }
}

watch(() => matrixIsInQueueForPublication.value, () => {
  loadMatrix()
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
  if (onlyInfinityCell.value) {
    return 'disable3'
  }

  if (!matrixById.value?.matrix || firstCeil.value?.queueId) {
    return 'loading'
  }

  if (!firstCeil.value?.matrix && !firstCeil.value?.allowBuyClone && !firstCeil.value?.allowSniper) {
    return 'disable'
  }

  if (firstCeil.value?.matrix?.is_booster) {
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
  if (onlyInfinityCell.value) {
    return 'disable3'
  }

  if (!matrixById.value?.matrix || secondCeil.value?.queueId) {
    return 'loading'
  }

  if (
      !secondCeil.value?.matrix &&
      (!firstCeil.value?.matrix || !secondCeil.value?.allowBuyClone && !secondCeil.value?.allowSniper)
  ) {
    return 'disable'
  }

  if (secondCeil.value?.matrix?.is_booster) {
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
  if (!onlyInfinityCell.value && !ceil.queueId && (ceil?.allowSniper || ceil?.allowBuyClone)) {
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
    await router.push(route.path + `?id=${parentMatrixId}`)
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

onMounted(() => {
  loadMatrix()
})
</script>

<style scoped lang="scss">
@import "mMatrixPartner";
</style>