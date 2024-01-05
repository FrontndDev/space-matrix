<template>
  <div class="matrix-header">
    <h1>Мои матрицы</h1>

    <div class="matrix-header__buttons matrix-header__buttons_mt-16">
      <DButton
          v-for="type in listOfTypes.types"
          :key="type.title"
          :type="type"
          :opened="listOfTypes.opened"
      />
<!--      :price="(idx + 1) * 10"-->
<!--      :class="button.class"-->
<!--      :isTime="button.class"-->
    </div>
  </div>
</template>

<script setup lang="ts">
import DButton from "../../../UI/DButton/DButton.vue";
import { useStore } from "vuex";
import {
  computed,
  onBeforeMount,
} from "vue";

const store = useStore();

const listOfTypes = computed(() => store.state.listOfTypes)

onBeforeMount(() => {
  store.dispatch('getListOfTypes')
})
</script>

<style scoped lang="scss">
@import "matrixHeader";
</style>