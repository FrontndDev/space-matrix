<template>
  <div class="add-partner-cell" :class="[props.type, props.size]">
    <div @click="openMAddPartner" class="add-partner-cell__plus" :class="props.type">
      <svg v-if="props.type == 'loading'" class="add-partner-cell__plus__loader" width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M20.0002 5.83325C17.1983 5.83325 14.4593 6.66411 12.1296 8.22077C9.79989 9.77742 7.98412 11.9899 6.91188 14.5786C5.83964 17.1672 5.55909 20.0156 6.10571 22.7637C6.65234 25.5118 8.00158 28.036 9.98282 30.0173C11.9641 31.9985 14.4883 33.3478 17.2364 33.8944C19.9845 34.441 22.8329 34.1604 25.4215 33.0882C28.0101 32.016 30.2227 30.2002 31.7793 27.8705C33.336 25.5408 34.1668 22.8018 34.1668 19.9999C34.1668 19.3096 34.7265 18.7499 35.4168 18.7499C36.1072 18.7499 36.6668 19.3096 36.6668 19.9999C36.6668 23.2963 35.6893 26.5186 33.858 29.2594C32.0266 32.0002 29.4237 34.1364 26.3782 35.3979C23.3328 36.6594 19.9817 36.9894 16.7487 36.3463C13.5156 35.7033 10.5459 34.1159 8.21506 31.785C5.88418 29.4542 4.29684 26.4844 3.65375 23.2514C3.01066 20.0184 3.34072 16.6673 4.60218 13.6219C5.86364 10.5764 7.99985 7.97345 10.7407 6.14209C13.4815 4.31073 16.7038 3.33325 20.0002 3.33325C20.6905 3.33325 21.2502 3.8929 21.2502 4.58325C21.2502 5.27361 20.6905 5.83325 20.0002 5.83325Z" fill="#7B879D"/>
        <path fill-rule="evenodd" clip-rule="evenodd" d="M20.0002 5.83325C17.1983 5.83325 14.4593 6.66411 12.1296 8.22077C9.79989 9.77742 7.98412 11.9899 6.91188 14.5786C5.83964 17.1672 5.55909 20.0156 6.10571 22.7637C6.65234 25.5118 8.00158 28.036 9.98282 30.0173C11.9641 31.9985 14.4883 33.3478 17.2364 33.8944C19.9845 34.441 22.8329 34.1604 25.4215 33.0882C28.0101 32.016 30.2227 30.2002 31.7793 27.8705C33.336 25.5408 34.1668 22.8018 34.1668 19.9999C34.1668 19.3096 34.7265 18.7499 35.4168 18.7499C36.1072 18.7499 36.6668 19.3096 36.6668 19.9999C36.6668 23.2963 35.6893 26.5186 33.858 29.2594C32.0266 32.0002 29.4237 34.1364 26.3782 35.3979C23.3328 36.6594 19.9817 36.9894 16.7487 36.3463C13.5156 35.7033 10.5459 34.1159 8.21506 31.785C5.88418 29.4542 4.29684 26.4844 3.65375 23.2514C3.01066 20.0184 3.34072 16.6673 4.60218 13.6219C5.86364 10.5764 7.99985 7.97345 10.7407 6.14209C13.4815 4.31073 16.7038 3.33325 20.0002 3.33325C20.6905 3.33325 21.2502 3.8929 21.2502 4.58325C21.2502 5.27361 20.6905 5.83325 20.0002 5.83325Z" fill="#7B879D"/>
      </svg>
      <svg v-else xmlns="http://www.w3.org/2000/svg" width="65" height="64" viewBox="0 0 65 64" fill="none">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M32.5 6C33.6046 6 34.5 6.89543 34.5 8V56C34.5 57.1046 33.6046 58 32.5 58C31.3954 58 30.5 57.1046 30.5 56V8C30.5 6.89543 31.3954 6 32.5 6Z"/>
        <path fill-rule="evenodd" clip-rule="evenodd" d="M58.5 32C58.5 33.1046 57.6046 34 56.5 34L8.5 34C7.39543 34 6.5 33.1046 6.5 32C6.5 30.8954 7.39543 30 8.5 30L56.5 30C57.6046 30 58.5 30.8954 58.5 32Z"/>
      </svg>
<!--      <Reward includeCar="include-car" />-->
      <Reward
          :freeze="fillReward.freeze"
          :custom="fillReward.custom"
          v-if="!['disable', 'infinity', 'loading'].includes(props.type)"
      />
    </div>

    <div v-if="props.type == 'disable'" class="add-partner-cell__title add-partner-cell__title_mt-8">Недоступно</div>
    <div v-else-if="props.type == 'loading'" class="add-partner-cell__title add-partner-cell__title_mt-8">Ожидайте</div>
    <div v-else class="add-partner-cell__title add-partner-cell__title_mt-8">Выставить партнера</div>

    <div v-if="props.type == 'disable'" class="add-partner-cell__subtitle">На этой матрице нет накопительных ячеек</div>
    <div v-else-if="props.type == 'loading'" class="add-partner-cell__subtitle">Идет загрузка...</div>
    <div v-else class="add-partner-cell__subtitle">Доступно ({{ props.partnersCount }})</div>

    <CellType
        :size="props.size"
        :cell-type="props.type"
        v-if="props.type !== 'disable'"
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
    default: 'cumulative'
    //cumulative, profitable, boost, infinity ,disable, loading
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

const emit = defineEmits(['open-m-add-partner'])

const openMAddPartner = () => {
  if (props.type === 'disable') return
  emit('open-m-add-partner')
}

const fillReward = computed(() => {
  const getFilteredRewards = (event: string) => props.ceil?.fillRevard.find(reward => reward.event === event)

  return {
    'custom': getFilteredRewards('custom')?.value.title,
    'freeze': getFilteredRewards('freeze')?.value.amount
  }
})
</script>

<style scoped lang="scss">
@import "addPartnerCell";
</style>