<template>
  <div class="infinity-partner-card" :class="props.modal">
    <div
        v-if="!props.loading"
        class="infinity-partner-card__partners"
    >
      <div class="infinity-partner-card__partners-block">
        <div>
          <div class="infinity-partner-card__partners-count">{{ partnersCount }}</div>
          <svg class="infinity-partner-card__partners-svg" width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M15.9995 9.30737C14.1271 9.30737 12.6261 10.8177 12.6261 12.6807C12.6261 14.4791 14.031 15.9454 15.811 16.0386C15.9336 16.0286 16.0644 16.0277 16.1914 16.0384C17.9638 15.9437 19.3612 14.4831 19.3728 12.6779C19.3713 10.8181 17.8596 9.30737 15.9995 9.30737ZM10.6261 12.6807C10.6261 9.71708 13.0185 7.30737 15.9995 7.30737C18.9651 7.30737 21.3728 9.71509 21.3728 12.6807V12.6864C21.3565 15.5775 19.0824 17.9416 16.1935 18.0401C16.1349 18.0421 16.0762 18.039 16.0181 18.0307C16.0238 18.0315 16.0249 18.0314 16.0212 18.0312C16.0178 18.0309 16.012 18.0307 16.0045 18.0307C15.9881 18.0307 15.973 18.0318 15.9635 18.033C15.9111 18.0395 15.8582 18.0419 15.8054 18.0401C12.9216 17.9418 10.6261 15.5813 10.6261 12.6807Z" fill="#7B879D"/>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M9.92865 23.2308C8.90173 23.9225 8.32771 24.714 8.10404 25.4662C10.2456 27.2595 12.9912 28.3328 15.9995 28.3328C19.0079 28.3328 21.7534 27.2595 23.895 25.4662C23.6712 24.7136 23.0968 23.9218 22.069 23.2299C20.4554 22.1506 18.2612 21.5795 16.0095 21.5795C13.7588 21.5795 11.557 22.1502 9.92865 23.2308ZM16.0095 19.5795C18.564 19.5795 21.1694 20.2215 23.1823 21.5684L23.1845 21.5698C24.788 22.6489 25.8082 24.1134 25.9806 25.7337C26.0142 26.0495 25.8958 26.3625 25.6615 26.577C23.1112 28.9124 19.7261 30.3328 15.9995 30.3328C12.273 30.3328 8.88785 28.9124 6.33752 26.577C6.10329 26.3625 5.98488 26.0495 6.01848 25.7337C6.19085 24.1134 7.21104 22.6489 8.81459 21.5699L8.81956 21.5665C10.8443 20.2216 13.4547 19.5795 16.0095 19.5795Z" fill="#7B879D"/>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M15.9998 3.66675C9.18833 3.66675 3.6665 9.18857 3.6665 16.0001C3.6665 22.8116 9.18802 28.3328 15.9995 28.3328C22.811 28.3328 28.3332 22.8116 28.3332 16.0001C28.3332 9.18857 22.8113 3.66675 15.9998 3.66675ZM1.6665 16.0001C1.6665 8.084 8.08376 1.66675 15.9998 1.66675C23.9159 1.66675 30.3332 8.084 30.3332 16.0001C30.3332 23.9162 23.9156 30.3328 15.9995 30.3328C8.08345 30.3328 1.6665 23.9162 1.6665 16.0001Z" fill="#7B879D"/>
          </svg>
        </div>
        <div class="infinity-partner-card__partners-title">Партнеров</div>
      </div>

      <div
          class="infinity-partner-card__partners-link"
          v-if="partnersCount"
          @click="$emit('open-m-infinity-cell')"
      >
        Просмотр
      </div>
    </div>
    <div
        v-if="props.loading"
        :class="props.modal"
        class="infinity-partner-card__loading"
    >
      <div class="infinity-partner-card__loading-icon">
        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M19.9999 5.83325C17.198 5.83325 14.459 6.66411 12.1293 8.22077C9.79965 9.77742 7.98387 11.9899 6.91163 14.5786C5.83939 17.1672 5.55884 20.0156 6.10547 22.7637C6.65209 25.5118 8.00134 28.036 9.98258 30.0173C11.9638 31.9985 14.4881 33.3478 17.2361 33.8944C19.9842 34.441 22.8327 34.1604 25.4213 33.0882C28.0099 32.016 30.2224 30.2002 31.7791 27.8705C33.3357 25.5408 34.1666 22.8018 34.1666 19.9999C34.1666 19.3096 34.7262 18.7499 35.4166 18.7499C36.1069 18.7499 36.6666 19.3096 36.6666 19.9999C36.6666 23.2963 35.6891 26.5186 33.8577 29.2594C32.0264 32.0002 29.4234 34.1364 26.378 35.3979C23.3325 36.6594 19.9814 36.9894 16.7484 36.3463C13.5154 35.7033 10.5457 34.1159 8.21481 31.785C5.88394 29.4542 4.29659 26.4844 3.6535 23.2514C3.01042 20.0184 3.34047 16.6673 4.60193 13.6219C5.86339 10.5764 7.9996 7.97345 10.7404 6.14209C13.4812 4.31073 16.7036 3.33325 19.9999 3.33325C20.6903 3.33325 21.2499 3.8929 21.2499 4.58325C21.2499 5.27361 20.6903 5.83325 19.9999 5.83325Z" fill="#7B879D"/>
          <path fill-rule="evenodd" clip-rule="evenodd" d="M19.9999 5.83325C17.198 5.83325 14.459 6.66411 12.1293 8.22077C9.79965 9.77742 7.98387 11.9899 6.91163 14.5786C5.83939 17.1672 5.55884 20.0156 6.10547 22.7637C6.65209 25.5118 8.00134 28.036 9.98258 30.0173C11.9638 31.9985 14.4881 33.3478 17.2361 33.8944C19.9842 34.441 22.8327 34.1604 25.4213 33.0882C28.0099 32.016 30.2224 30.2002 31.7791 27.8705C33.3357 25.5408 34.1666 22.8018 34.1666 19.9999C34.1666 19.3096 34.7262 18.7499 35.4166 18.7499C36.1069 18.7499 36.6666 19.3096 36.6666 19.9999C36.6666 23.2963 35.6891 26.5186 33.8577 29.2594C32.0264 32.0002 29.4234 34.1364 26.378 35.3979C23.3325 36.6594 19.9814 36.9894 16.7484 36.3463C13.5154 35.7033 10.5457 34.1159 8.21481 31.785C5.88394 29.4542 4.29659 26.4844 3.6535 23.2514C3.01042 20.0184 3.34047 16.6673 4.60193 13.6219C5.86339 10.5764 7.9996 7.97345 10.7404 6.14209C13.4812 4.31073 16.7036 3.33325 19.9999 3.33325C20.6903 3.33325 21.2499 3.8929 21.2499 4.58325C21.2499 5.27361 20.6903 5.83325 19.9999 5.83325Z" fill="#7B879D"/>
        </svg>
      </div>
      <span class="infinity-partner-card__loading-title">Обновление</span>
    </div>
    <div v-if="props.modal !== 'm-matrix-partner'" class="infinity-partner-card__awards">
      <div class="infinity-partner-card__awards-title">Награды</div>
      <div class="infinity-partner-card__awards-bonuses infinity-partner-card__awards-bonuses_mt-8">
        <BonusItem type="cashout" :values="fillReward.cashout" v-if="fillReward.cashout.length"/>
        <BonusItem type="custom" :values="fillReward.custom" v-if="fillReward.custom.length"/>
        <BonusItem type="boost" :values="fillReward.boost" v-if="fillReward.boost.length"/>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import BonusItem from "./BonusItem/BonusItem.vue";
import {
  computed,
  ComputedRef,
  PropType,
} from "vue";
import {
  Ceil,
  Type
} from "../../interfaces/store.interface.ts";
import { useStore } from "vuex";

const props = defineProps({
  ceil: {
    type: Object as PropType<Ceil>,
    required: true,
  },
  partnersCount: {
    type: Number,
    required: true,
  },
  modal: {
    type: String,
    default: '',
  },
  loading: {
    type: Boolean,
    default: false,
  }
})

const store = useStore()

const types: ComputedRef<Type[]> = computed(() => store.state.listOfTypes.types)

const fillReward = computed(() => {
  const getFilteredRewards = (event: string) => props.ceil?.fillRevard.filter(reward => reward.event === event)

  return {
    'boost': getFilteredRewards('boost')
        .map(reward => types.value.find(type => type.type === reward.value?.type)?.title) as string[],
    'cashout': getFilteredRewards('cashout').map(reward => reward.value.amount) as number[],
    'custom': getFilteredRewards('custom').map(reward => reward.value.title) as string[],
  }
})
</script>

<style scoped lang="scss">
@import "infinityPartnerCard";
</style>