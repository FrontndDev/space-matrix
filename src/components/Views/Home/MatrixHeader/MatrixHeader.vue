<template>
  <div class="matrix-header">
    <h1>Мои матрицы</h1>

    <div class="matrix-header__buttons matrix-header__buttons_mt-16">
      <DButton
          v-for="(button, idx) in dButton"
          :key="button.id"
          :idx="idx"
          :price="(idx + 1) * 10"
          :class="button.class"
          :isTime="button.class"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import DButton from "../../../UI/DButton/DButton.vue";
import { useStore } from "vuex";
import { onBeforeMount } from "vue";
import * as API from '../../../../api/index.ts'

const dButton = [
  { class: 'active', id: 0 },
  { class: '', id: 1 },
  { class: '', id: 2 },
  { class: '', id: 3 },
  { class: 'time', id: 4 },
  { class: 'disabled', id: 5 },
  { class: 'disabled', id: 6 },
  { class: 'disabled', id: 7 },
  { class: 'disabled', id: 8 },
]

const store = useStore();

onBeforeMount(() => {
  store.dispatch('getListOfTypes')
  console.log('setGlobalConfig', API.setGlobalConfig('token test'))
})
</script>

<style scoped lang="scss">
@import "matrixHeader";
</style>