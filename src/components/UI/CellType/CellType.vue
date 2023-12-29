<template>
  <div class="cell-type" :class="[props.cellType, props.size]">
    <img :src="getIconPath" :alt="props.cellType">
  </div>
</template>

<script setup lang="ts">
import CumulativeIcon from '../../../assets/svg/cumulative.svg';
import ProfitableIcon from '../../../assets/svg/profitable.svg';
import InfinityIcon from '../../../assets/svg/infinity.svg';
import BoosterIcon from '../../../assets/svg/booster.svg';

import {
  computed,
  Ref
} from "vue";

const props = defineProps({
  cellType: {
    type: String,
    default: 'cumulative'
  },
  size: {
    type: String,
    default: ''
  }
});

const getIconPath: Ref<string> = computed(() => {
  switch (props.cellType) {
    case 'cumulative':
    case 'boost':
      return CumulativeIcon;
    case 'profitable':
      return ProfitableIcon;
    case 'infinity':
      return InfinityIcon;
    // case 'booster':
    //   return BoosterIcon;
    default:
      return CumulativeIcon;
  }
});
</script>

<style scoped lang="scss">
@import "../../../assets/scss/variables";
@import "../../../assets/scss/mixins";

.cell-type {
  @include flex-center;
  width: 40px;
  height: 40px;
  border: 2px solid $border-base;
  border-radius: 12px;
  position: absolute;
  top: 8px;
  right: 8px;

  &.cumulative,
  &.boost {
    background: $bg-blue;
  }

  &.profitable {
    background: $bg-green;
  }

  &.infinity {
    background: $bg-orange;
  }

  &.cumulative-disable {
    background: #BFCCD9;
  }

  &.small {
    top: 12px;
    right: 12px;
  }

  //&.boost {
  //  background: $bg-violet;
  //}
}
</style>