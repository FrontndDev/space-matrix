<template>
  <div class="infinity-partner-card" :class="props.modal">
    <div
        v-if="!loading"
        class="infinity-partner-card__partners"
    >
      <div class="infinity-partner-card__partners-block">
        <div class="infinity-partner-card__partners-count">{{ partnersCount }}</div>
        <div class="infinity-partner-card__partners-title">Партнеров</div>
        <svg class="infinity-partner-card__partners-svg" width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M15.9995 9.30737C14.1271 9.30737 12.6261 10.8177 12.6261 12.6807C12.6261 14.4791 14.031 15.9454 15.811 16.0386C15.9336 16.0286 16.0644 16.0277 16.1914 16.0384C17.9638 15.9437 19.3612 14.4831 19.3728 12.6779C19.3713 10.8181 17.8596 9.30737 15.9995 9.30737ZM10.6261 12.6807C10.6261 9.71708 13.0185 7.30737 15.9995 7.30737C18.9651 7.30737 21.3728 9.71509 21.3728 12.6807V12.6864C21.3565 15.5775 19.0824 17.9416 16.1935 18.0401C16.1349 18.0421 16.0762 18.039 16.0181 18.0307C16.0238 18.0315 16.0249 18.0314 16.0212 18.0312C16.0178 18.0309 16.012 18.0307 16.0045 18.0307C15.9881 18.0307 15.973 18.0318 15.9635 18.033C15.9111 18.0395 15.8582 18.0419 15.8054 18.0401C12.9216 17.9418 10.6261 15.5813 10.6261 12.6807Z" fill="#7B879D"/>
          <path fill-rule="evenodd" clip-rule="evenodd" d="M9.92865 23.2308C8.90173 23.9225 8.32771 24.714 8.10404 25.4662C10.2456 27.2595 12.9912 28.3328 15.9995 28.3328C19.0079 28.3328 21.7534 27.2595 23.895 25.4662C23.6712 24.7136 23.0968 23.9218 22.069 23.2299C20.4554 22.1506 18.2612 21.5795 16.0095 21.5795C13.7588 21.5795 11.557 22.1502 9.92865 23.2308ZM16.0095 19.5795C18.564 19.5795 21.1694 20.2215 23.1823 21.5684L23.1845 21.5698C24.788 22.6489 25.8082 24.1134 25.9806 25.7337C26.0142 26.0495 25.8958 26.3625 25.6615 26.577C23.1112 28.9124 19.7261 30.3328 15.9995 30.3328C12.273 30.3328 8.88785 28.9124 6.33752 26.577C6.10329 26.3625 5.98488 26.0495 6.01848 25.7337C6.19085 24.1134 7.21104 22.6489 8.81459 21.5699L8.81956 21.5665C10.8443 20.2216 13.4547 19.5795 16.0095 19.5795Z" fill="#7B879D"/>
          <path fill-rule="evenodd" clip-rule="evenodd" d="M15.9998 3.66675C9.18833 3.66675 3.6665 9.18857 3.6665 16.0001C3.6665 22.8116 9.18802 28.3328 15.9995 28.3328C22.811 28.3328 28.3332 22.8116 28.3332 16.0001C28.3332 9.18857 22.8113 3.66675 15.9998 3.66675ZM1.6665 16.0001C1.6665 8.084 8.08376 1.66675 15.9998 1.66675C23.9159 1.66675 30.3332 8.084 30.3332 16.0001C30.3332 23.9162 23.9156 30.3328 15.9995 30.3328C8.08345 30.3328 1.6665 23.9162 1.6665 16.0001Z" fill="#7B879D"/>
        </svg>
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
        v-if="loading"
        :class="props.modal"
        class="infinity-partner-card__loading"
    >
      <div class="infinity-partner-card__loading-icon">
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M15.9998 4.66699C13.7583 4.66699 11.5671 5.33168 9.70338 6.577C7.83962 7.82232 6.387 9.59235 5.52921 11.6632C4.67141 13.7341 4.44698 16.0129 4.88428 18.2113C5.32158 20.4098 6.40097 22.4292 7.98597 24.0142C9.57096 25.5992 11.5904 26.6786 13.7888 27.1159C15.9873 27.5532 18.266 27.3287 20.3369 26.471C22.4078 25.6132 24.1778 24.1605 25.4232 22.2968C26.6685 20.433 27.3332 18.2418 27.3332 16.0003C27.3332 15.448 27.7809 15.0003 28.3332 15.0003C28.8855 15.0003 29.3332 15.448 29.3332 16.0003C29.3332 18.6374 28.5512 21.2153 27.0861 23.4079C25.621 25.6006 23.5386 27.3095 21.1023 28.3187C18.6659 29.3279 15.985 29.5919 13.3986 29.0775C10.8122 28.563 8.43645 27.2931 6.57175 25.4284C4.70705 23.5637 3.43718 21.1879 2.92271 18.6015C2.40824 16.0151 2.67228 13.3342 3.68145 10.8979C4.69062 8.46153 6.39958 6.37915 8.59224 4.91406C10.7849 3.44898 13.3628 2.66699 15.9998 2.66699C16.5521 2.66699 16.9998 3.11471 16.9998 3.66699C16.9998 4.21928 16.5521 4.66699 15.9998 4.66699Z" fill="#7B879D"/>
          <path fill-rule="evenodd" clip-rule="evenodd" d="M15.9998 4.66699C13.7583 4.66699 11.5671 5.33168 9.70338 6.577C7.83962 7.82232 6.387 9.59235 5.52921 11.6632C4.67141 13.7341 4.44698 16.0129 4.88428 18.2113C5.32158 20.4098 6.40097 22.4292 7.98597 24.0142C9.57096 25.5992 11.5904 26.6786 13.7888 27.1159C15.9873 27.5532 18.266 27.3287 20.3369 26.471C22.4078 25.6132 24.1778 24.1605 25.4232 22.2968C26.6685 20.433 27.3332 18.2418 27.3332 16.0003C27.3332 15.448 27.7809 15.0003 28.3332 15.0003C28.8855 15.0003 29.3332 15.448 29.3332 16.0003C29.3332 18.6374 28.5512 21.2153 27.0861 23.4079C25.621 25.6006 23.5386 27.3095 21.1023 28.3187C18.6659 29.3279 15.985 29.5919 13.3986 29.0775C10.8122 28.563 8.43645 27.2931 6.57175 25.4284C4.70705 23.5637 3.43718 21.1879 2.92271 18.6015C2.40824 16.0151 2.67228 13.3342 3.68145 10.8979C4.69062 8.46153 6.39958 6.37915 8.59224 4.91406C10.7849 3.44898 13.3628 2.66699 15.9998 2.66699C16.5521 2.66699 16.9998 3.11471 16.9998 3.66699C16.9998 4.21928 16.5521 4.66699 15.9998 4.66699Z" fill="#7B879D"/>
        </svg>
      </div>
      <span class="infinity-partner-card__loading-title">Ожидайте</span>
      <span>Идет загрузка...</span>
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