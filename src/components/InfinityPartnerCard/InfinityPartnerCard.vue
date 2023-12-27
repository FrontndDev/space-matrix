<template>
  <div class="infinity-partner-card">
    <div class="infinity-partner-card__partners">
      <div class="infinity-partner-card__partners-count">15</div>
      <div class="infinity-partner-card__partners-title">Партнеров</div>
      <div class="infinity-partner-card__partners-link">Просмотр</div>
    </div>
    <div class="infinity-partner-card__awards">
      <div class="infinity-partner-card__awards-title">Награды</div>
      <div class="infinity-partner-card__awards-bonuses infinity-partner-card__awards-bonuses_mt-8">
        <BonusItem type="ton" :values="[1000]"/>
        <BonusItem type="auto" :values="['LB']"/>
        <BonusItem type="boost" :values="['D1', 'D2', 'D3', 'D4', 'D5', 'D6']"/>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

import BonusItem from "./BonusItem/BonusItem.vue";
</script>

<style scoped lang="scss">
@import "../../assets/scss/variables";
@import "../../assets/scss/mixins";

.infinity-partner-card {
  @include flexbox(column);
  row-gap: 4px;
  padding: 16px;

  &__partners,
  &__awards {
    width: 160px;
    height: 50%;
    border: 1px solid $border-base-bright;
    border-radius: 16px;
  }

  &__partners {
    padding: 18px 12px;

    &-count {
      @include get-font(28px, 700, 44px, $text-base-secondary);
    }

    &-title {
      @include get-font(14px, 500, 24px, $text-base-secondary);
    }

    &-link {
      @include get-font(12px, 500, 16px, $text-link);
      cursor: pointer;
    }
  }

  &__awards {
    padding: 8px 16px 16px;

    &-title {
      @include get-font(10px, 500, 12px, $text-base-secondary);
    }

    &-bonuses {
      @include flexbox(row, center, center, wrap);
      gap: 4px;

      &_mt-8 {
        margin-top: 8px;
      }
    }
  }
}
</style>