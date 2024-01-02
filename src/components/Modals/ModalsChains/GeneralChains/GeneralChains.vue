<template>
  <div class="general-chains">
    <div class="general-chains__content">
      <ModalHeader @close-modal="$emit('close-modal')">
        Цепочка
      </ModalHeader>
      <div class="general-chains__container">
        <div
            class="general-chains__overflow"
            :class="{'less-four': cells.length < 4}"
        >
          <div v-for="cell in cells" class="general-chains__block">
            <SmallCell />
          </div>
        </div>
        <ChainsButton>
          Активировать цепочку
        </ChainsButton>
      </div>
    </div>
    <CopyLink />
  </div>
</template>

<script setup lang="ts">
import ModalHeader from "../../../ModalHeader/ModalHeader.vue";
import CopyLink from "../../../Views/Home/CopyLink/CopyLink.vue";
import SmallCell from "../../../SmallCell/SmallCell.vue";
import ChainsButton from "../../../UI/ChainsButton/ChainsButton.vue";
import {ref} from "vue";

const cells = ref([
  {id: 0},
  {id: 1},
  {id: 2},
  {id: 3},
  {id: 4},
  {id: 5},
  {id: 6},
])
</script>

<style scoped>
@import "GeneralChains.scss";
</style>