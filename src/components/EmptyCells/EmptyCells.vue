<template>
  <div class="cells__empty">
    <div class="cells__empty__img">
      <img :src="getIconPath" :alt="props.cellsType">
    </div>
    <span>
      Список
      <span v-if="props.cellsType == 'partners'"> партнеров </span>
      <span v-if="props.cellsType == 'boosters'"> Boost </span>
      <span v-if="props.cellsType == 'chains'"> цепочек </span>
      пуст
    </span>
  </div>
</template>

<script setup lang="ts">
import ProfileEmptyIcon from "../../assets/svg/profile-circle.svg";
import BoostEmptyIcon from "../../assets/svg/boost-empty.svg";
import ChainsEmptyIcon from "../../assets/svg/chains-empty.svg";

import { computed, Ref } from "vue";

const props = defineProps({
  cellsType: {
    type: String,
    default: ''
  }
})

const getIconPath: Ref<string> = computed(() => {
  switch (props.cellsType) {
    case 'partners':
      return ProfileEmptyIcon;
    case 'boosters':
      return BoostEmptyIcon;
    case 'chains':
      return ChainsEmptyIcon;

    default:
      return ProfileEmptyIcon;
  }
});


</script>

<style scoped>
@import "EmptyCells.scss";
</style>