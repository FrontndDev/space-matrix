<template>
  <div class="add-partner-cell">
    <div class="add-partner-cell__plus" :class="props.type">
      <svg xmlns="http://www.w3.org/2000/svg" width="65" height="64" viewBox="0 0 65 64" fill="none">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M32.5 6C33.6046 6 34.5 6.89543 34.5 8V56C34.5 57.1046 33.6046 58 32.5 58C31.3954 58 30.5 57.1046 30.5 56V8C30.5 6.89543 31.3954 6 32.5 6Z"/>
        <path fill-rule="evenodd" clip-rule="evenodd" d="M58.5 32C58.5 33.1046 57.6046 34 56.5 34L8.5 34C7.39543 34 6.5 33.1046 6.5 32C6.5 30.8954 7.39543 30 8.5 30L56.5 30C57.6046 30 58.5 30.8954 58.5 32Z"/>
      </svg>
    </div>

    <div class="add-partner-cell__title add-partner-cell__title_mt-8">Выставить партнера</div>
    <div class="add-partner-cell__subtitle">Доступно (1)</div>

    <CellType
        :cell-type="props.type"
        v-if="props.showCellType"
    />
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  type: {
    type: String,
    default: 'cumulative'
    //cumulative, profitable, boost, infinity
  },
  showCellType: {
    type: Boolean,
    default: true,
  },
});

import CellType from "../UI/CellType/CellType.vue";
</script>

<style scoped lang="scss">
@import "../../assets/scss/variables";
@import "../../assets/scss/mixins";

.add-partner-cell {
  @include flexbox(column, center, center);
  row-gap: 8px;
  width: 192px;
  padding: 16px;
  position: relative;

  &__plus {
    @include flex-center;
    padding: 4px;
    width: 160px;
    height: 160px;
    border-radius: 28px;
    cursor: pointer;

    &.cumulative,
    &.boost {
      background: $bg-blue-light;

      & path {
        fill: $bg-blue-dark;
      }
    }

    &.profitable {
      background: $bg-green-light;

      & path {
        fill: $bg-green;
      }
    }

    &.infinity {
      background: $bg-orange-light;

      & path {
        fill: $bg-orange;
      }
    }
  }

  &__title {
    @include get-font(14px, 500, 20px, $text-base);

    &_mt-8 {
      margin-top: 8px;
    }
  }

  &__subtitle {
    @include flex-center;
    column-gap: 4px;
    @include get-font(12px, 500, 16px, $text-base-light);
  }
}
</style>