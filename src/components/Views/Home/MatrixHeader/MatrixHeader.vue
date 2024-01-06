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
import {
  mapActions,
  mapMutations,
} from "vuex";
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

const actions = mapActions(['getListOfTypes', 'getViewLastOwn', 'getExpectationList'])
const mutations = mapMutations(['SET_SELECTED_TYPE', 'SET_VIEW_LAST_OWN'])

const listOfTypes: Ref<ListOfTypes> = computed(() => store.state.listOfTypes)
const selectedType: Ref<Type> = computed(() => store.state.selectedType)

// const getData = (listOfType, type: any) => {
//   store.commit('SET_SELECTED_TYPE', listOfType)
//   store.dispatch('getViewLastOwn', type)
//   store.dispatch('getExpectationList', type)
// }

const selectDButton = (type: Type) => {
  if (selectedType.value.type !== type.type) {
    mutations.SET_VIEW_LAST_OWN({})
  }
  mutations.SET_SELECTED_TYPE('SET_SELECTED_TYPE', type)

  actions.getViewLastOwn('getViewLastOwn', type.type)
  actions.getViewLastOwn(type.type)

  actions.getExpectationList(type.type)
  // getData(type, type.type)
}

watch(() => listOfTypes.value.types?.length, () => {
  // getData()
  mutations.SET_SELECTED_TYPE('SET_SELECTED_TYPE', listOfTypes.value.types[0])
  actions.getViewLastOwn(selectedType.value.type)
  actions.getExpectationList(selectedType.value.type)
})

onBeforeMount(() => {
  actions.getListOfTypes()
})
</script>

<style scoped lang="scss">
@import "matrixHeader";
</style>