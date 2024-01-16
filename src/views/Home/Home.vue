<template>
  <div class="home">
    <div class="container">
      <div class="home__content">
        <div class="home__matrices">
          <MatrixHeader style="grid-area: header;"/>

          <template v-if="Object.keys(matrixByType).length">
            <div class="home__matrices-inner" v-if="!matrixByType?.ctaText && !matrixIsTemporarilyUnavailable">
              <Savings
                  @open-m-matrix-partner="openModalPartner(2)"
                  @open-m-add-partner="openModalPartner(3)"
                  @set-position-for-partner="setPositionForPartner"
                  @select-partner="selectPartner"
              />
              <Endless
                  @open-m-infinity-cell="openModalPartner(1)"
                  @open-m-add-partner="openModalPartner(4)"
                  @set-position-for-partner="setPositionForPartner"
              />
            </div>

            <template v-if="!matrixByType?.in_queue">
              <NotActivatedMatrix
                  :matrix-by-type="matrixByType"
                  @open-payment-form="toggleModalPaymentForm = true"
                  v-if="matrixByType?.ctaText && !matrixIsTemporarilyUnavailable"
              />
              <TimeActivatedMatrix
                  v-if="matrixIsTemporarilyUnavailable"
              />
            </template>
            <template v-else>
              <MatrixActivationInProgress/>
            </template>

          </template>
          <div class="home__preloader" v-if="!Object.keys(matrixByType).length">
            <Preloader :with-text="true"/>
          </div>

          <CopyLink
              style="grid-area: copy-link;"
              v-if="
                !matrixByType?.in_queue &&
                !matrixIsTemporarilyUnavailable &&
                Object.keys(matrixByType).length
              "
              @click="useCopyLink(matrixByType.matrix?.id ?? 0, matrixByType.matrix?.type ?? '')"
          />
        </div>
        <div class="home__info">
          <InfoHeader
              :infoHeader="isCells"
              @open-cells="openCells"
          />
          <PartnerCells
              v-if="isCells === 1"
              @open-m-matrix-partner="openModalPartner(2)"
              @select-partner="selectPartner"
          />
          <BoostersCells
              v-else-if="isCells === 2"
              @open-m-matrix-partner="openModalPartner(2)"
              @select-partner="selectPartner"
          />
          <ChainsCells
              @open-general-chains="openModalChain(1)"
              @open-m-teleport="openModalTeleport"
              @select-chain="selectChain"
              v-else-if="isCells === 3"
          />
        </div>
      </div>
    </div>
    <ModalsPartners
        :toggleModalPartners="toggleModalPartners"
        :openModalPartners="openModalPartners"
        @open-m-infinity-cell="openModalPartner(1)"
        @open-m-matrix-partner="openModalPartner(2)"
        @open-m-add-partner="openModalPartner(3)"
        @open-partner-waiting="openModalPartner(5)"
        @close-modal="closeModal"

        @set-partner-by="setPartnerBy"
        @select-partner="selectPartner"
        @set-position-for-partner="setPositionForPartner"
    />
    <ModalChains
        :toggleModalChains="toggleModalChains"
        :openModalChains="openModalChains"
        @open-general-chains="openModalChain(1)"
        @open-m-replace-partner="openModalChain(2)"
        @open-change-partner="openModalChain(3)"
        @open-expose-partner="openModalChain(4)"
        @open-add-partner-chains="openModalChain(6)"
        @open-partner-waiting-chains="openModalChain(7)"

        @close-modal="closeModal"
    />
    <ModalPaymentForm
        :toggleModalPaymentForm="toggleModalPaymentForm"
        @close-modal="closeModal"
    />
    <ModalConfirmPayment
        :toggleModalConfirmPayment="toggleModalConfirmPayment"
        :result="resultModalConfirmPayment"
        @close-modal="closeModal"
    />
  </div>
</template>

<script setup lang="ts">
import Endless from "../../components/Views/Home/Endless/Endless.vue";
import CopyLink from "../../components/Views/Home/CopyLink/CopyLink.vue";
import MatrixHeader from "../../components/Views/Home/MatrixHeader/MatrixHeader.vue";
import Savings from "../../components/Views/Home/Savings/Savings.vue";
import InfoHeader from "../../components/Views/Home/InfoHeader/InfoHeader.vue";
import PartnerCells from "../../components/Views/Home/PartnerCells/PartnerCells.vue";
import ModalsPartners from "../../components/Modals/ModalsPartners/ModalsPartners.vue";

import NotActivatedMatrix from "../../components/NotActivatedMatrix/NotActivatedMatrix.vue";

import {
  computed,
  ComputedRef,
  onMounted,
  provide,
  Ref,
  ref,
  watch
} from "vue";
import TimeActivatedMatrix from "../../components/TimeActivatedMatrix/TimeActivatedMatrix.vue";
import ChainsCells from "../../components/Views/Home/ChainsCells/ChainsCells.vue";
import BoostersCells from "../../components/Views/Home/BoostersCells/BoostersCells.vue";
import ModalChains from "../../components/Modals/ModalsChains/ModalChains.vue";
import { useStore } from "vuex";
import Preloader from "../../components/UI/Preloader/Preloader.vue";
import ModalPaymentForm from "../../components/Modals/ModalPaymentForm/ModalPaymentForm.vue";
import { IPosition } from "../../interfaces/partners.interface.ts";
import {
  Ceil,
  IMatrix,
  ListOfTypes,
} from "../../interfaces/store.interface.ts";
import { useRoute } from "vue-router";
import { useCopyLink } from "../../use/useCopyLink.ts";
import MatrixActivationInProgress from "../../components/MatrixActivationInProgress/MatrixActivationInProgress.vue";
import ModalConfirmPayment from "../../components/Modals/ModalConfirmPayment/ModalConfirmPayment.vue";
import { IChains } from "../../interfaces/chains.interface.ts";

const isCells = ref(1)

const toggleModalPartners = ref(false)
const openModalPartners = ref(0)

const toggleModalChains = ref(false)
const openModalChains = ref(0)

const toggleModalNotification = ref(false)

const toggleModalPaymentForm = ref(false)

const toggleModalConfirmPayment = ref(false)
const resultModalConfirmPayment = ref('failure')

const store = useStore()
const route = useRoute()

const interval: Ref<number | null> = ref(null)

const selectedChain: Ref<IChains | null> = ref(null)
const selectedType: Ref<string> = ref('type')

const setPartnerBy = (type: string) => {
  selectedType.value = type
}

const selectChain = (chain: IChains) => {
  selectedChain.value = chain
}

const matrixIsInQueueForPublication: ComputedRef<boolean> = computed(() => {
  const ceilsCollection = store.state.matrixByType?.ceilsCollection?.['1']
  return ceilsCollection ? Object.values(ceilsCollection).map(ceil => !!(ceil as Ceil).queueId).includes(true) : false
})

const matrixByType: ComputedRef<IMatrix> = computed(() => store.state.matrixByType)

watch(() => matrixIsInQueueForPublication.value, () => {
  if (matrixIsInQueueForPublication.value) {
    interval.value = setInterval(() => {
      store.dispatch('getMatrixByType', store.state.selectedType.type);
    }, 3000);
  } else if (!matrixIsInQueueForPublication.value && interval.value) {
    clearInterval(interval.value);
  }
});

watch(() => matrixByType.value?.in_queue, () => {
  if (matrixByType.value?.in_queue) {
    interval.value = setInterval(() => {
      store.dispatch('getMatrixByType', store.state.selectedType.type);
    }, 3000);
  } else if (!matrixByType.value?.in_queue && interval.value) {
    clearInterval(interval.value);
  }
})

watch(() => store.state.chains.chainsList.list?.length, () => {
  openChainViaLink()
})

const listOfTypes: ComputedRef<ListOfTypes> = computed(() => store.state.listOfTypes)

const matrixIsTemporarilyUnavailable: ComputedRef<boolean> = computed(() => {
  const teamOpened = listOfTypes.value.teamOpened
  return teamOpened ? Object.keys(teamOpened).includes(route.params.type as string) : false
})


const partnerPos: Ref<IPosition> = ref({ depth: 0, pos: 0 })

const selectedPartner: Ref<Ceil | null> = ref(null)

provide('partnerPos', partnerPos)
provide('selectedPartner', selectedPartner)
provide('selectedChain', selectedChain)
provide('selectedType', selectedType)

const openChainViaLink = () => {
  const chain = store.state.chains.chainsList.list.find((chain: IChains) => chain.id === +(route.query.chainId ?? 0))
  if (chain) {
    store.dispatch('chains/getChainDetail', chain.id)
    selectChain(chain)
    openModalChain(1)
  }
}

const openModalPartner = (num: number) => {
  toggleModalPartners.value = true
  openModalPartners.value = num
  document.body.style.overflow = 'hidden'
}

const openModalChain = (num: number) => {
  toggleModalChains.value = true
  openModalChains.value = num
  document.body.style.overflow = 'hidden'
}

const openCells = (id: number) => {
  isCells.value = id
}

const openModalTeleport = () => {
  toggleModalChains.value = true
  openModalChains.value = 5
  document.body.style.overflow = 'hidden'
}

const closeModal = () => {
  store.commit('SET_MATRIX_BY_ID', {})
  selectedPartner.value = null
  selectedType.value = 'type'

  toggleModalPartners.value = false
  toggleModalChains.value = false
  toggleModalNotification.value = false
  toggleModalPaymentForm.value = false
  toggleModalConfirmPayment.value = false
  document.body.style.overflow = 'auto'
}

const setPositionForPartner = (pos: IPosition) => {
  partnerPos.value = pos
}

const selectPartner = async (ceil: Ceil) => {
  if (ceil?.matrix) {
    // Получаем Матрицу партнёра
    store.commit('SET_MATRIX_BY_ID', {})
    const response = await store.dispatch('getMatrixById', ceil.matrix.id)

    if (response?.error_code) {
      closeModal()
    }

    // Получаем партнеров в ожидании "Матрицы партнёра"
    store.dispatch('partners/getPendingPartners', { isPartnerMatrix: true })
  }
  selectedPartner.value = ceil
}

onMounted(async () => {
  const query = route.query
  if (query.id) {
    const { data } = await store.dispatch('getMatrixById', route.query.id)

    // Получаем партнеров в ожидании "Матрицы партнёра"
    store.dispatch('partners/getPendingPartners', { isPartnerMatrix: true })

    if (data?.matrix && !data.matrix.is_booster) {
      selectedPartner.value = {
        depth: 0,
        pos: 0,
        queueId: null,
        matrix: data.matrix,
        allowBuyClone: false,
        allowSniper: false,
        fillRevard: [],
        isInfinity: false,
      }

      openModalPartner(2)
    }
  }


  if (query.chainId && store.state.chains.chainsList?.list?.length) {
    openChainViaLink()
  }

  // TODO УДАЛИТЬ ПРИ ЗАЛИВКЕ НА ПРОД!!!
  // await store.dispatch('getWallets')
})
</script>

<style scoped lang="scss">
@import "home";
</style>