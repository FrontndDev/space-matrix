<template>
  <div class="add-partner-cell" :class="[props.type, props.size]">
    <div @click="openMAddPartner" class="add-partner-cell__plus" :class="props.type">
      <svg xmlns="http://www.w3.org/2000/svg" width="65" height="64" viewBox="0 0 65 64" fill="none">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M32.5 6C33.6046 6 34.5 6.89543 34.5 8V56C34.5 57.1046 33.6046 58 32.5 58C31.3954 58 30.5 57.1046 30.5 56V8C30.5 6.89543 31.3954 6 32.5 6Z"/>
        <path fill-rule="evenodd" clip-rule="evenodd" d="M58.5 32C58.5 33.1046 57.6046 34 56.5 34L8.5 34C7.39543 34 6.5 33.1046 6.5 32C6.5 30.8954 7.39543 30 8.5 30L56.5 30C57.6046 30 58.5 30.8954 58.5 32Z"/>
      </svg>
<!--      <Reward includeCar="include-car" />-->
      <Reward
          :freeze="fillReward.freeze"
          :custom="fillReward.custom"
          v-if="!['disable2', 'disable3', 'infinity', 'loading'].includes(props.type) && props.cellType !== 'infinity'"
      />
    </div>

    <div v-if="props.type === 'disable3'" class="add-partner-cell__title add-partner-cell__title_mt-8">Недоступно</div>
    <div v-else-if="props.type === 'loading'" class="add-partner-cell__title add-partner-cell__title_mt-8">Недоступно</div>
    <div v-else-if="props.type === 'disable'" class="add-partner-cell__title add-partner-cell__title_mt-8">Недоступно</div>
    <div
        class="add-partner-cell__title add-partner-cell__title_mt-8"
        v-html="props.title"
        v-else
    />

    <div v-if="props.type === 'disable3'" class="add-partner-cell__subtitle">На этой матрице нет накопительных ячеек</div>
    <div v-else-if="props.type === 'loading'" class="add-partner-cell__subtitle">Идет обновление</div>
    <div v-else-if="props.type === 'disable'" class="add-partner-cell__subtitle">{{ props.subtitle }}</div>
    <div v-else class="add-partner-cell__subtitle">Доступно ({{ props.partnersCount }})</div>

    <CellType
        :size="props.size"
        :cell-type="props.cellType"
        :type="props.type"
        v-if="!['disable2', 'disable3'].includes(props.type) && props.cellType"
    />
  </div>
</template>

<script setup lang="ts">
import Reward from "../UI/Reward/Reward.vue";
import CellType from "../UI/CellType/CellType.vue";
import {
  computed,
  PropType
} from "vue";
import { Ceil } from "../../interfaces/store.interface.ts";

const props = defineProps({
  ceil: {
    type: Object as PropType<Ceil>,
    required: true,
  },
  partnersCount: {
    type: Number,
    required: true,
  },
  type: {
    type: String,
    default: 'cumulative',
    //cumulative, profitable, boost, infinity ,disable, disable2, loading
  },
  cellType: {
    type: String,
    default: ''
  },
  size: {
    type: String,
    default: '',
  },
  title: {
    type: String,
    default: 'Выставить партнера',
  },
  subtitle: {
    type: String,
    default: 'Заполните левую ячейку'
  }
});

const emit = defineEmits(['open-m-add-partner'])

const openMAddPartner = () => {
  if (props.type === 'disable') return
  emit('open-m-add-partner')
}

const fillReward = computed(() => {
  const getFilteredRewards = (event: string) => props.ceil?.fillRevard.find(reward => reward.event === event)

  return {
    'custom': getFilteredRewards('custom')?.value.title,
    'freeze': getFilteredRewards('freeze')?.value.amount ?? getFilteredRewards('cashout')?.value.amount
  }
})
</script>

<style scoped lang="scss">
@import "addPartnerCell";
</style>