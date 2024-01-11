<template>
  <div class="home">
    <div class="container">
      <div class="home__content">
        <div class="home__matrices">
          <MatrixHeader style="grid-area: header;"/>

          <template v-if="Object.keys(store.state.matrixByType).length && store.state.partners.infinityPartners">
            <div class="home__matrices-inner" v-if="!store.state.matrixByType?.ctaText">
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

            <NotActivatedMatrix
                :matrix-by-type="store.state.matrixByType"
                @open-payment-form="toggleModalPaymentForm = true"
                v-if="store.state.matrixByType?.ctaText"
            />
            <TimeActivatedMatrix v-if="false"/>
          </template>
          <div class="home__preloader" v-if="!Object.keys(store.state.matrixByType).length || !infinityPartners">
            <Preloader :with-text="true"/>
          </div>

          <CopyLink style="grid-area: copy-link;" @click="useCopyLink(store.state.matrixByType.matrix?.id)"/>
        </div>
        <div class="home__info">
          <InfoHeader
              :infoHeader="isCells"
              @open-cells="openCells"
          />
          <PartnerCells v-if="isCells === 1" />
          <BoostersCells v-else-if="isCells === 2" />
          <ChainsCells
              @open-general-chains="openModalChain(1)"
              @open-m-teleport="openModalTeleport"
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

        @select-partner="selectPartner"
        @set-position-for-partner="setPositionForPartner"
    />
    <ModalChains
        :toggleModalChains="toggleModalChains"
        :openModalChains="openModalChains"
        @close-modal="closeModal"
        @open-general-chains="openModalChain(1)"
        @open-m-replace-partner="openModalChain(2)"
        @open-change-partner="openModalChain(3)"
        @open-expose-partner="openModalChain(4)"
    />
    <ModalNotification
        statusNotification="failure"
        :toggleModalNotification="toggleModalNotification"
        @close-modal="closeModal"
    />
    <ModalPaymentForm
        :toggleModalPaymentForm="toggleModalPaymentForm"
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
  ref
} from "vue";
import TimeActivatedMatrix from "../../components/TimeActivatedMatrix/TimeActivatedMatrix.vue";
import ChainsCells from "../../components/Views/Home/ChainsCells/ChainsCells.vue";
import BoostersCells from "../../components/Views/Home/BoostersCells/BoostersCells.vue";
import ModalChains from "../../components/Modals/ModalsChains/ModalChains.vue";
import ModalNotification from "../../components/Modals/ModalNotification/ModalNotification.vue";
import { useStore } from "vuex";
import Preloader from "../../components/UI/Preloader/Preloader.vue";
import ModalPaymentForm from "../../components/Modals/ModalPaymentForm/ModalPaymentForm.vue";
import { IPosition } from "../../interfaces/partners.interface.ts";
import {
  Ceil,
  Matrix,
} from "../../interfaces/store.interface.ts";
import { useRoute } from "vue-router";
import { useCopyLink } from "../../use/useCopyLink.ts";

const isCells = ref(1)

const toggleModalPartners = ref(false)
const openModalPartners = ref(0)

const toggleModalChains = ref(false)
const openModalChains = ref(0)

const toggleModalNotification = ref(false)

const toggleModalPaymentForm = ref(false)

const store = useStore()
const route = useRoute()

const partnerPos: Ref<IPosition> = ref({ depth: 0, pos: 0 })

const selectedPartner: Ref<Ceil | null> = ref(null)

provide('partnerPos', partnerPos)
provide('selectedPartner', selectedPartner)

const infinityPartners: ComputedRef<Matrix[] | null> = computed(() => store.state.partners.infinityPartners)

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
  toggleModalPartners.value = false
  toggleModalChains.value = false
  toggleModalNotification.value = false
  toggleModalPaymentForm.value = false
  selectedPartner.value = null
  document.body.style.overflow = 'auto'
}

const setPositionForPartner = (pos: IPosition) => {
  partnerPos.value = pos
}

const selectPartner = (ceil: Ceil) => {
  if (ceil.matrix) {
    // Получаем Матрицу партнёра
    store.commit('SET_MATRIX_BY_ID', {})
    store.dispatch('getMatrixById', ceil.matrix.id)
    // Получаем партнеров в ожидании "Матрицы партнёра"
    store.dispatch('partners/getPendingPartners', { isPartnerMatrix: true })
  }
  selectedPartner.value = ceil
}

onMounted(() => {
  console.log('query321', route.query)
  if (route.query.id) {
    store.dispatch('getMatrixById', route.query.id)
    // openModalPartner(3)
    openModalPartner(2)
  }
})
</script>

<style scoped lang="scss">
@import "home";
</style>