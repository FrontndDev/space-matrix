<template>
  <div class="matrix-header">

    <div class="matrix-header__buttons">
      <Preloader v-if="!listOfTypes?.types?.length"/>
      <DButton
          :class="{ active: selectedType?.type === type.type }"
          v-for="type in listOfTypes?.types"
          :key="type.title"
          :type="type"
          :opened="listOfTypes.opened"
          @click="selectDButton"
      />
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
import { useStore } from "vuex";
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
  store.dispatch('getMatrixByType', type.type)
  const queryId = route.query.id ? `?id=${route.query.id}` : ''
  router.push(`${baseUrl}/${type.type}` + queryId)
}

const selectDButton = (type: Type) => {
  if (selectedType.value.type !== type.type) {
    store.commit('SET_MATRIX_BY_TYPE', {})
  }
  selectType(type)
}

watch(() => listOfTypes.value?.types?.length, () => {
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