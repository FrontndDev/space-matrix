<template>
  <div class="matrix-header">
    <h1>Мои матрицы</h1>

    <div class="matrix-header__buttons">
      <Preloader v-if="!listOfTypes.types?.length"/>
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
  computed,
  onMounted,
  Ref,
  watch,
} from "vue";
import {
  ListOfTypes,
  Type
} from "../../../../interfaces/store.interface.ts";
import {useStore} from "vuex";
import Preloader from "../../../UI/Preloader/Preloader.vue";
import {
  useRoute,
  useRouter
} from "vue-router";
import { baseUrl } from "../../../../router";

const listOfTypes: Ref<ListOfTypes> = computed(() => store.state.listOfTypes)
const selectedType: Ref<Type> = computed(() => store.state.selectedType)

const store = useStore()
const router = useRouter()
const route = useRoute()

const selectType = (type: Type) => {
  store.commit('SET_SELECTED_TYPE', type)
  store.dispatch('getViewLastOwn', type.type)
  router.push(`${baseUrl}/${type.type}`)
}

const selectDButton = (type: Type) => {
  if (selectedType.value.type !== type.type) {
    store.commit('SET_VIEW_LAST_OWN', {})
  }
  selectType(type)
}

watch(() => listOfTypes.value.types?.length, () => {
  const type = listOfTypes.value.types.find(type => type.type === route.params.type) ?? listOfTypes.value.types[0]
  selectType(type)
})

onMounted(() => {
  store.dispatch('getListOfTypes')
})
</script>

<style scoped lang="scss">
@import "matrixHeader";
</style>