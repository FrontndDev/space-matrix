<template>
  <div class="infinity-partner-card" :class="props.modal">
    <div class="infinity-partner-card__partners">
      <div class="infinity-partner-card__partners-count">{{ partnersCount }}</div>
      <div class="infinity-partner-card__partners-title">Партнеров</div>
      <div
          class="infinity-partner-card__partners-link"
          v-if="partnersCount"
          @click="$emit('open-m-infinity-cell')"
      >
        Просмотр
      </div>
    </div>
    <div v-if="props.modal !== 'm-matrix-partner'" class="infinity-partner-card__awards">
      <div class="infinity-partner-card__awards-title">Награды</div>
      <div class="infinity-partner-card__awards-bonuses infinity-partner-card__awards-bonuses_mt-8">
        <BonusItem type="ton" :values="[1000]"/>
        <BonusItem type="auto" :values="['LBb']"/>
        <BonusItem type="boost" :values="['D1', 'D2', 'D3', 'D4', 'D5']"/>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import BonusItem from "./BonusItem/BonusItem.vue";
import { ref } from "vue";

const partnersCount = ref(15);

const props = defineProps({
  modal: {
    type: String,
    default: ''
  }
})
</script>

<style scoped lang="scss">
@import "infinityPartnerCard";
</style>