<template>
  <div class="time-activated-matrix">
<!--    <div class="time-activated-matrix__timer">-->
<!--      <div class="time-activated-matrix__timer__number">24</div>-->
<!--      <div class="time-activated-matrix__timer__dots">-->
<!--        <div></div>-->
<!--        <div></div>-->
<!--      </div>-->
<!--      <div class="time-activated-matrix__timer__number">00</div>-->
<!--      <div class="time-activated-matrix__timer__dots">-->
<!--        <div></div>-->
<!--        <div></div>-->
<!--      </div>-->
<!--      <div class="time-activated-matrix__timer__number">00</div>-->
<!--    </div>-->
    <div class="time-activated-matrix__text">
      <h3>Не упустите прибыль!</h3>
      <div class="text__column" v-html="matrixByType?.ctaText"/>
      <!--        <div>Ваш партнер <a> Иванов Иван </a>активировал матрицу D5.</div>-->
      <!--        <div>Заполните накопительные ячейки в предыдущей матрице или активируйте её, чтобы не упустить прибыль.</div>-->
    </div>
    <ActivateButton :price="selectedType.price"/>
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
</script>

<style scoped lang="scss">
@import "timeActivatedMatrix";
</style>