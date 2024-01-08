<template>
  <div class="home">
    <div class="container">
      <div class="home__content">
        <div class="home__matrices">
          <MatrixHeader style="grid-area: header;"/>

          <template v-if="Object.keys(store.state.viewLastOwn).length">
            <div class="home__matrices-inner" v-if="!store.state.viewLastOwn?.ctaText">
              <Savings
                  @open-m-matrix-partner="openModalPartner(2)"
                  @open-m-add-partner="openModalPartner(3)"
              />
              <Endless
                  @open-m-infinity-cell="openModalPartner(1)"
              />
            </div>

            <NotActivatedMatrix
                :view-last-own="store.state.viewLastOwn"
                v-if="store.state.viewLastOwn?.ctaText"
                @open-payment-form="toggleModalPaymentForm = true"
            />
            <TimeActivatedMatrix v-if="false"/>
          </template>
          <div class="home__preloader" v-if="!Object.keys(store.state.viewLastOwn).length">
            <Preloader :with-text="true"/>
          </div>

          <CopyLink style="grid-area: copy-link;" @click="copyLink"/>
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
        @close-modal="toggleModalPartners = false"
    />
    <ModalChains
        :toggleModalChains="toggleModalChains"
        :openModalChains="openModalChains"
        @close-modal="toggleModalChains = false"
        @open-general-chains="openModalChain(1)"
        @open-m-replace-partner="openModalChain(2)"
        @open-change-partner="openModalChain(3)"
        @open-expose-partner="openModalChain(4)"
    />
    <ModalNotification
        :toggleModalNotification="toggleModalNotification"
        :statusNotification="'failure'"
        @close-modal="toggleModalNotification = false"
    />
    <ModalPaymentForm
        :toggleModalPaymentForm="toggleModalPaymentForm"
        @close-modal="toggleModalPaymentForm = false"
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
import { useRoute } from "vue-router";

const isCells = ref(1)

const toggleModalPartners = ref(false);
const openModalPartners = ref(0)

const toggleModalChains = ref(false)
const openModalChains = ref(0)

const toggleModalNotification = ref(false)

const toggleModalPaymentForm = ref(false)

const store = useStore()
const route = useRoute();

const openModalPartner = (num: number) => {
  toggleModalPartners.value = true
  openModalPartners.value = num
}

const openModalChain = (num: number) => {
  toggleModalChains.value = true
  openModalChains.value = num
}

const openCells = (id: number) => {
  isCells.value = id
}

const openModalTeleport = () => {
  toggleModalChains.value = true
  openModalChains.value = 5
}

const copyLink = () => {
  const link = window.location.origin + route.path + (store.state.selectedType?.title ?? '')
  navigator.clipboard.writeText(link)
}
</script>

<style scoped lang="scss">
@import "home";
</style>