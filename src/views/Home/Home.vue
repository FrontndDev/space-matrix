<template>
  <div class="home">
    <div class="container">
      <div class="home__content">
        <div class="home__matrices">
          <MatrixHeader style="grid-area: header;"/>

          <div class="home__matrices__inner">
            <Savings
                class="border-right"
                @open-m-matrix-partner="openModalPartner(2)"
                @open-m-add-partner="openModalPartner(3)"
            />
            <Endless
                @open-m-infinity-cell="openModalPartner(1)"
            />
          </div>

          <NotActivatedMatrix v-if="false" />
          <TimeActivatedMatrix v-if="false"  />

          <CopyLink style="grid-area: copy-link;"/>
        </div>
        <div class="home__info">
          <InfoHeader
              @open-cells="openCells"
              :infoHeader="isCells"
          />
          <PartnerCells v-if="isCells === 1" />
          <BoostersCells v-else-if="isCells === 2" />
          <ChainsCells
              v-else-if="isCells === 3"
              @open-general-chains="openModalChain(1)"
              @open-m-teleport="openModalTeleport"
          />
        </div>
      </div>
    </div>
    <ModalsPartners
        @open-m-infinity-cell="openModalPartner(1)"
        @open-m-matrix-partner="openModalPartner(2)"
        @open-m-add-partner="openModalPartner(3)"
        @close-modal="toggleModalPartners = false"
        :toggleModalPartners="toggleModalPartners"
        :openModalPartners="openModalPartners"
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

import { ref } from "vue";
import TimeActivatedMatrix from "../../components/TimeActivatedMatrix/TimeActivatedMatrix.vue";
import ChainsCells from "../../components/Views/Home/ChainsCells/ChainsCells.vue";
import BoostersCells from "../../components/Views/Home/BoostersCells/BoostersCells.vue";
import ModalChains from "../../components/Modals/ModalsChains/ModalChains.vue";
import ModalNotification from "../../components/Modals/ModalNotification/ModalNotification.vue";

const isCells = ref(1)

const toggleModalPartners = ref(false);
const openModalPartners = ref(0)

const toggleModalChains = ref(false)
const openModalChains = ref(0)

const toggleModalNotification = ref(false)

const openModalPartner = num => {
  toggleModalPartners.value = true
  openModalPartners.value = num
}

const openModalChain = num => {
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

</script>

<style scoped lang="scss">
@import "home";
</style>