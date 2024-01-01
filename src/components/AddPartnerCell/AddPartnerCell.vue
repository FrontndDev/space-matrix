<template>
  <div class="add-partner-cell" :class="[props.type, props.size]">
    <div @click="$emit('open-m-add-partner')" class="add-partner-cell__plus" :class="props.type">
      <svg xmlns="http://www.w3.org/2000/svg" width="65" height="64" viewBox="0 0 65 64" fill="none">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M32.5 6C33.6046 6 34.5 6.89543 34.5 8V56C34.5 57.1046 33.6046 58 32.5 58C31.3954 58 30.5 57.1046 30.5 56V8C30.5 6.89543 31.3954 6 32.5 6Z"/>
        <path fill-rule="evenodd" clip-rule="evenodd" d="M58.5 32C58.5 33.1046 57.6046 34 56.5 34L8.5 34C7.39543 34 6.5 33.1046 6.5 32C6.5 30.8954 7.39543 30 8.5 30L56.5 30C57.6046 30 58.5 30.8954 58.5 32Z"/>
      </svg>
      <Reward includeCar="include-car" />
    </div>


    <div v-if="props.type !== 'cumulative-disable'" class="add-partner-cell__title add-partner-cell__title_mt-8">Выставить партнера</div>
    <div v-else class="add-partner-cell__title add-partner-cell__title_mt-8">Недоступно</div>
    <div v-if="props.type !== 'cumulative-disable'" class="add-partner-cell__subtitle">Доступно (1)</div>
    <div v-else class="add-partner-cell__subtitle">Заполните левую ячейку</div>

    <CellType
        :size="props.size"
        :cell-type="props.type"
        v-if="props.showCellType"
    />
  </div>
</template>

<script setup lang="ts">
import Reward from "../UI/Reward/Reward.vue";
import CellType from "../UI/CellType/CellType.vue";

const props = defineProps({
  type: {
    type: String,
    default: 'cumulative'
    //cumulative, profitable, boost, infinity ,cumulative-disable
  },
  showCellType: {
    type: Boolean,
    default: true,
  },
  size: {
    type: String,
    default: ''
  }
});
</script>

<style scoped lang="scss">
@import "addPartnerCell";
</style>