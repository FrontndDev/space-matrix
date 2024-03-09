<template>
  <div class="partner-reward" :class="[props.state, props.type]">
    +150
    <component :is="getIcon"/>
  </div>
</template>

<script setup lang="ts">
import {
  computed,
  ComputedRef,
  PropType
} from "vue";

import FreezeIcon from '@/assets/svg/freeze.svg?component';
import ProfitIcon from '@/assets/svg/profit.svg?component';

const props = defineProps({
  state: {
    type: String as PropType<'freeze' | 'profit'>,
    default: ''
  },
  type: {
    type: String as PropType<'' | 'block'>,
    default: ''
  }
})

const getIcon: ComputedRef<SVGAElement> = computed(() => {
  switch (props.state) {
    case 'freeze':
      return FreezeIcon;
    case 'profit':
      return ProfitIcon;
  }
})
</script>

<style scoped lang="scss">
@import "@/assets/scss/variables";
@import "@/assets/scss/mixins";

.partner-reward {
  @include flex-center;
  column-gap: 4px;
  padding: 4px;
  width: 100%;
  border-radius: 8px;
  @include get-font(14px, 500, 20px);

  &.freeze {
    background: $bg-blue-light;
    color: $text-link;
  }

  &.profit {
    background: $bg-green-light;
    color: $text-green;
  }

  &.without-owner {
    background: transparent;
    color: $text-base-light;

    & ::v-deep(path) {
      fill: $text-base-light;
    }
  }

  &.block {
    background: transparent;
    color: $text-base-disable;

    & ::v-deep(path) {
      fill: $text-base-disable;
    }
  }
}
</style>