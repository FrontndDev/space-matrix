<template>
  <div class="expose-partner">
    <div class="expose-partner__content">
      <ModalHeader
          @close-modal="$emit('close-modal')"
          @open-change-partner="$emit('open-change-partner')"
          :modalHeader="'back'"
      >
        Выберите действие
      </ModalHeader>
      <div class="expose-partner__container">
        <div class="expose-partner__cell">
          <div class="expose-partner__block">
            <SmallCell type="chains-partner" />
          </div>
        </div>
        <div class="expose-partner__info">
          <h4 class="expose-partner__info__title">Партнер переходит к вам в матрицу D5</h4>
          <div class="expose-partner__choice">
            <div class="expose-partner__tabs">
              <Tabs
                   :tabs="tabs"
                   type="expose-modal"
              />
            </div>
            <div class="expose-partner__r">
              <div class="expose-partner__ton">

              </div>
              <div class="expose-partner__reward">

              </div>
            </div>
          </div>
        </div>
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
import Tabs from "../../../UI/Tabs/Tabs.vue";
import {reactive} from "vue";

const tabs = reactive([
  {
    id: 1,
    name: 'В ∞ ячейку',
  },
  {
    id: 2,
    name: 'В лист ожидания',
  },
]);

</script>

<style scoped>
@import "MExposePartner.scss";
</style>