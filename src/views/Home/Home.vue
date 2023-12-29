<template>
  <div class="home">
    <div class="container">
      <div class="home__content">
        <div class="home__matrices">
          <MatrixHeader style="grid-area: header;"/>
          <Savings style="grid-area: savings;"/>
          <Endless @open-modal="toggleModal = true" style="grid-area: endless;"/>
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
        :toggleModal="toggleModal"
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

let toggleModal:boolean = false
</script>

<style scoped lang="scss">
@import "home";
</style>