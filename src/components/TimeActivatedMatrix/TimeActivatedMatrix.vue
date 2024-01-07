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
    <div class="time-activated-matrix__text">
      <h3>Не упустите прибыль!</h3>
      <div class="text__column">
        <div>Ваш партнер <a> Иванов Иван </a>активировал матрицу D5.</div>
        <div>Заполните накопительные ячейки в предыдущей матрице или активируйте её, чтобы не упустить прибыль.</div>
      </div>
    </div>
    <ActivateButton :price="0"/>
  </div>
</template>

<script setup lang="ts">

import ActivateButton from "../UI/ActivateButton/ActivateButton.vue";
</script>

<style scoped>
@import "_timeActivatedMatrix.scss";
</style>