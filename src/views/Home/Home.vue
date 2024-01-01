<template>
  <div class="home">
    <div class="container">
      <div class="home__content">
        <div class="home__matrices">
          <MatrixHeader style="grid-area: header;"/>

          <div class="home__matrices__inner">
            <Savings
                class="border-right"
                @open-m-matrix-partner="openMMatrixPartner"
                @open-m-add-partner="openMAddPartner"
            />
            <Endless
                @open-m-infinity-cell="openMInfinityCell"
            />
          </div>

          <NotActivatedMatrix v-if="false" />
          <TimeActivatedMatrix v-if="false"  />

          <CopyLink style="grid-area: copy-link;"/>
        </div>
        <div class="home__info">
          <InfoHeader/>
          <PartnerCells/>
          <Pagination />
        </div>
      </div>
    </div>
    <Modal
        @open-m-infinity-cell="openMInfinityCell"
        @open-m-matrix-partner="openMMatrixPartner"
        @open-m-add-partner="openMAddPartner"
        @close-modal="toggleModal = false"
        :toggleModal="toggleModal"
        :openModal="openModal"
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
import Pagination from "../../components/Pagination/Pagination.vue";
import Modal from "../../components/Modals/Modal/Modal.vue";
import AddPartnerCell from "../../components/AddPartnerCell/AddPartnerCell.vue";
import NotActivatedMatrix from "../../components/NotActivatedMatrix/NotActivatedMatrix.vue";

import { ref } from "vue";
import TimeActivatedMatrix from "../../components/TimeActivatedMatrix/TimeActivatedMatrix.vue";


const toggleModal = ref(false);
const openModal = ref(0)

const openMInfinityCell = () => {
  toggleModal.value = true
  openModal.value = 1
}

const openMMatrixPartner = () => {
  toggleModal.value = true
  openModal.value = 2
}

const openMAddPartner = () => {
  toggleModal.value = true
  openModal.value = 3
}


</script>

<style scoped lang="scss">
@import "home";
</style>