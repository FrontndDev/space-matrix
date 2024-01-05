<template>
  <div class="matrix-header">
    <h1>Мои матрицы</h1>

    <div class="matrix-header__buttons matrix-header__buttons_mt-16">
      <DButton
          :class="{ active: selectedType?.type === type.type }"
          v-for="type in listOfTypes.types"
          :key="type.title"
          :type="type"
          :opened="listOfTypes.opened"
          @click="selectDButton"
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
  Ref,
  watch,
} from "vue";
import {
  ListOfTypes,
  Type
} from "../../../../interfaces/store.interface.ts";

const store = useStore();

const listOfTypes: Ref<ListOfTypes> = computed(() => store.state.listOfTypes)
const selectedType: Ref<Type> = computed(() => store.state.selectedType)

const selectDButton = (type: Type) => {
  store.commit('SET_VIEW_LAST_OWN', null)
  store.commit('SET_SELECTED_TYPE', type)
  store.dispatch('getViewLastOwn', type.type)
}

watch(() => listOfTypes.value.types?.length, () => {
  store.commit('SET_SELECTED_TYPE', listOfTypes.value.types[0])
  store.dispatch('getViewLastOwn', selectedType.value.type)
})

onBeforeMount(() => {
  store.dispatch('getListOfTypes')
})
</script>

<style scoped lang="scss">
@import "matrixHeader";
</style>