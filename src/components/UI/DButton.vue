<template>
  <div class="d-button">
    <div class="d-button__name">D{{ props.idx + 1 }}</div>
    <div class="d-button__price">
      {{ props.price }}
      <svg xmlns="http://www.w3.org/2000/svg" width="17" height="16" viewBox="0 0 17 16" fill="none">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M7.08841 12.4278C7.69785 13.5451 9.30218 13.5451 9.91162 12.4278L13.6347 5.60212C14.2192 4.53063 13.4436 3.22422 12.2231 3.22422H4.7769C3.55638 3.22422 2.78085 4.53063 3.3653 5.60212L7.08841 12.4278ZM9.20581 12.0429L12.9289 5.21714C13.2212 4.6814 12.8334 4.02819 12.2231 4.02819H8.902V12.3557C9.02379 12.2859 9.13014 12.1816 9.20581 12.0429ZM7.79421 12.0429C7.86988 12.1816 7.97623 12.2859 8.09803 12.3557V4.02819H4.7769C4.16664 4.02819 3.77887 4.6814 4.0711 5.21714L7.79421 12.0429Z"/>
      </svg>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  idx: {
    type: Number,
    default: 0,
  },
  price: {
    type: Number,
    default: 0,
  },
})
</script>

<style scoped lang="scss">
@import "../../assets/scss/variables";
@import "../../assets/scss/mixins";

.d-button {
  display: block;
  padding: 8px 16px;
  width: 122px;
  border-radius: 16px;
  border: 1px solid $border-base-dark;
  cursor: pointer;

  &__name {
    @include get-font(22px, 700, 36px, $text-base-secondary);
    text-align: center;
  }

  &__price {
    @include flex-center;
    column-gap: 4px;
    @include get-font(12px, 500, 16px, $text-base-light);

    & path {
      fill: $text-base-light;
    }
  }

  &.active {
    border: none;
    background: $bg-base-dark-secondary;

    & .d-button__name {
      color: $text-base-on-color;
    }
  }

  &.disabled {
    border: 1px solid $border-base-contrast;
    cursor: not-allowed;

    & .d-button {
      &__name,
      &__price {
        color: $text-base-disable;
      }

      &__price path {
        fill: $text-base-disable;
      }
    }
  }
}
</style>