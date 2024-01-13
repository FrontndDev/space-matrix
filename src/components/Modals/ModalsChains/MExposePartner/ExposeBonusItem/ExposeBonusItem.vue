<template>
  <div class="expose-bonus">
    <div class="expose-bonus__icon">
      <img :src="getIconPath" :alt="props.type">
    </div>
    <div class="expose-bonus__car" v-if="props.type === 'auto' && rewards?.[0]">
      {{ rewards[0] }}
    </div>
    <div class="expose-bonus__boost" v-else-if="props.type === 'boost'">
      <span v-for="reward in props.rewards">{{ reward }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  computed,
  PropType,
  Ref
} from "vue";
import BoostIcon from "../../../../../assets/svg/bonuses/boost.svg";
import AutoIcon from "../../../../../assets/svg/bonuses/auto.svg";

const props = defineProps({
  rewards: {
    type: Array as PropType<string[]>,
  },
  type: {
    type: String,
    default: 'ton'
    // boost, auto
  }
});

const getIconPath: Ref<string> = computed(() => {
  switch (props.type) {
    case 'boost':
      return BoostIcon;
    case 'auto':
      return AutoIcon;
    default:
      return AutoIcon;
  }
});

// const boost = [
//   { name: 'D1', id: 0 },
//   { name: 'D2', id: 1 },
//   { name: 'D3', id: 2 },
//   { name: 'D4', id: 3 },
//   { name: 'D5', id: 4 },
//   { name: 'D6', id: 5 },
// ]
</script>

<style scoped lang="scss">
@import "exposeBonusItem";
</style>