<template>
  <div class="bonus-item" :class="props.type">
    <div class="bonus-item__icon">
      <img :src="getIconPath" :alt="props.type">
    </div>
    <div class="bonus-item__values" v-if="values.length > 1">
      <div
          class="bonus-item__value"
          :class="{ 'without-line': (idx + 1) % 3 === 0 || (idx + 1) === values.length }"
          v-for="(value, idx) in values"
          :key="value"
          :title="String(value)"
      >{{ value }}</div>
    </div>
    <div
        class="bonus-item__value"
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
  Ref
} from "vue";

const props = defineProps({
  type: {
    type: String,
    default: 'ton'
    //ton, boost, auto
  },
  values: {
    type: Array<string | number>,
    required: true,
  }
});

const getIconPath: Ref<string> = computed(() => {
  switch (props.type) {
    case 'ton':
      return TonIcon;
    case 'boost':
      return BoostIcon;
    case 'auto':
      return AutoIcon;
    default:
      return TonIcon;
  }
});
</script>

<style scoped lang="scss">
@import "../../../assets/scss/variables";
@import "../../../assets/scss/mixins";

.bonus-item {
  @include flexbox(row, flex-start, center);
  column-gap: 4px;
  padding: 4px 8px 4px 4px;
  border-radius: 8px;
  background: $bg-base-secondary;
  @include get-font(10px, 500, 12px, $text-base-secondary);

  &__icon {
    flex-shrink: 0;
    padding: 4px;
  }

  &.ton,
  &.auto {
    width: 48.4%;

    & .bonus-item__value {
      width: 100%;
    }
  }

  &.ton {
    padding-right: 5px;
  }

  &.boost {
    width: 100%;

    & .bonus-item__value {
      padding: 2px 4px;
      width: 31.7%;
      position: relative;

      &:not(.without-line) {
        &:after {
          content: '';
          margin: auto;
          width: 1px;
          height: 8px;
          background: $bg-base-bright;
          position: absolute;
          top: 0;
          bottom: 0;
          right: 0;
        }
      }
    }
  }

  &__values {
    @include flexbox(row, flex-start, center, wrap);
    gap: 2px;
  }

  &__value {
    @include get-font(10px, 500, 12px, $text-base-secondary);
    width: 31.8%;
    overflow: hidden;
    text-overflow: ellipsis;
    text-align: start;
  }
}
</style>