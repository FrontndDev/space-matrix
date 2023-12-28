<template>
  <div class="home">
    <div class="container">
      <div class="home__content">
        <div class="home__matrices">
          <MatrixHeader style="grid-area: header;"/>
          <Savings style="grid-area: savings;"/>
          <Endless style="grid-area: endless;"/>
          <CopyLink style="grid-area: copy-link;"/>
        </div>
        <div class="home__info">
          <InfoHeader/>
          <PartnerCells/>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Endless from "../../components/Views/Home/Endless/Endless.vue";
import CopyLink from "../../components/Views/Home/CopyLink/CopyLink.vue";
import MatrixHeader from "../../components/Views/Home/MatrixHeader/MatrixHeader.vue";
import Savings from "../../components/Views/Home/Savings/Savings.vue";
import InfoHeader from "../../components/Views/Home/InfoHeader/InfoHeader.vue";
import PartnerCells from "../../components/Views/Home/PartnerCells/PartnerCells.vue";
</script>

<style scoped lang="scss">
@import "home";
</style>