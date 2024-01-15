<template>
  <div class="time-activated-matrix">
    <div class="time-activated-matrix__timer">
      <div class="time-activated-matrix__timer__number">24</div>
      <div class="time-activated-matrix__timer__dots">
        <div></div>
        <div></div>
      </div>
      <div class="time-activated-matrix__timer__number">00</div>
      <div class="time-activated-matrix__timer__dots">
        <div></div>
        <div></div>
      </div>
      <div class="time-activated-matrix__timer__number">00</div>
    </div>
    <div class="not-activated-matrix__icon">
      <svg width="32" height="32" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M7.08838 12.4279C7.69782 13.5452 9.30215 13.5452 9.91159 12.4279L13.6347 5.60218C14.2192 4.53069 13.4436 3.22428 12.2231 3.22428H4.77687C3.55635 3.22428 2.78082 4.53069 3.36526 5.60218L7.08838 12.4279ZM9.20578 12.0429L12.9289 5.2172C13.2211 4.68146 12.8334 4.02825 12.2231 4.02825H8.90197V12.3558C9.02376 12.2859 9.13011 12.1816 9.20578 12.0429ZM7.79418 12.0429C7.86985 12.1816 7.9762 12.2859 8.098 12.3558V4.02825H4.77687C4.16661 4.02825 3.77884 4.68146 4.07107 5.2172L7.79418 12.0429Z" fill="#7B879D"/>
      </svg>
    </div>
    <div class="time-activated-matrix__text">
      <h3>Не упустите прибыль!</h3>
      <div class="text__column" v-html="matrixByType?.ctaText"/>
      <!--        <div>Ваш партнер <a> Иванов Иван </a>активировал матрицу D5.</div>-->
      <!--        <div>Заполните накопительные ячейки в предыдущей матрице или активируйте её, чтобы не упустить прибыль.</div>-->
    </div>
    <ActivateButton
        :price="selectedType.price"
        @click="openPaymentForm"
    />
  </div>
</template>

<script setup lang="ts">
import ActivateButton from "../UI/ActivateButton/ActivateButton.vue";
import {
  computed,
  ComputedRef
} from "vue";
import { useStore } from "vuex";
import {
  IMatrix,
  Type
} from "../../interfaces/store.interface.ts";

const store = useStore()

const selectedType: ComputedRef<Type> = computed(() => store.state.selectedType)
const matrixByType: ComputedRef<IMatrix> = computed(() => store.state.matrixByType)

const openPaymentForm = () => {
  store.dispatch('getPaymentForm', selectedType.value.type)
}
</script>

<style scoped lang="scss">
@import "timeActivatedMatrix";
</style>