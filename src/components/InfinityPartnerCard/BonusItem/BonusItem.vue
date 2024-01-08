<template>
  <div class="bonus-item" :class="[props.type, getWidth]">
    <div class="bonus-item__icon">
      <img :src="getIconPath" :alt="props.type">
    </div>
    <div class="bonus-item__values" v-if="values.length > 1">
      <div
          class="bonus-item__value"
          :class="[{ 'without-line': (idx + 1) === values.length || (idx + 1) % 3 === 0 }, getWidth]"
          v-for="(value, idx) in values"
          :key="value"
          :title="String(value)"
      >{{ value }}</div>
    </div>
    <div
        class="bonus-item__value"
        :class="getWidth"
        :title="String(values[0])"
        v-if="values.length === 1"
    >{{ values[0] }}</div>
  </div>
</template>

<script setup lang="ts">
import TonIcon from '../../../assets/svg/bonuses/ton.svg';
import BoostIcon from '../../../assets/svg/bonuses/boost.svg';
import AutoIcon from '../../../assets/svg/bonuses/auto.svg';

import {
  computed,
  PropType,
  Ref
} from "vue";

const props = defineProps({
  type: {
    type: String,
    default: 'ton'
    //ton, boost, auto
  },
  values: {
    type: Array as PropType<(string | number)[]>,
    required: true,
  }
});

const getWidth: Ref<string> = computed(() => {
  if (props.values?.length === 1) {
    return 'width-first'
  } else if (props.values?.length === 2) {
    return 'width-second'
  } else {
    return 'width-third'
  }
})

const getIconPath: Ref<string> = computed(() => {
  switch (props.type) {
    case 'cashout':
      return TonIcon;
    case 'boost':
      return BoostIcon;
    case 'custom':
      return AutoIcon;
    default:
      return TonIcon;
  }
});
</script>

<style scoped lang="scss">
@import "bonusItem";
</style>