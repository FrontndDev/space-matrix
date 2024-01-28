<template>
  <div class="matrix-header">
    <div class="matrix-header__buttons">
      <Preloader v-if="!listOfTypes?.types?.length"/>
      <DButton
          :class="[{
            disabled: !listOfTypes.opened.includes(type.type),
            time: isTime(type),
            pending: isPending(type),
            active: selectedType?.type === type.type,
          }, type.type]"
          :is-time="isTime(type)"
          :is-pending="isPending(type)"
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

const setDependencies = (type: Type) => {
  store.state.partners.pageIdPartners = 1
  store.state.partners.levelID = 1

  store.state.boosters.pageIdBooster = 1
  store.state.boosters.levelID = 0
  store.commit('SET_SELECTED_TYPE', type)
  store.dispatch('getMatrixByType', type.type)
  store.commit('SET_NEW_TYPE_MATRIX', type.type)
}

const selectType = (type: Type) => {
  setDependencies(type)
  store.dispatch('partners/getPendingPartners', { isPartnerMatrix: false })

  const queryId = () => {
    const query = route.query
    switch (true) {
      case !!query.id:
        return `?id=${route.query.id}`
      case !!query.chainId:
        return `?chainId=${route.query.chainId}`
      default:
        return ''
    }
  }
  router.push(`${baseUrl}/${type.type}` + queryId())
}

const isTime = (type: Type) => {
  const key = Object.keys(listOfTypes.value.teamOpened).find(listType => listType === type.type)
  return key ? !!listOfTypes.value.teamOpened[key] : false
}

const isPending = (type: Type) => {
  return Object.keys(listOfTypes.value.pending).includes(type.type)
}

const selectDButton = (type: Type) => {
  if (selectedType.value.type !== type.type) {
    store.commit('SET_MATRIX_BY_TYPE', {})
  }
  selectType(type)

  function reset(callback = isTime, buttonClass = 'time') {
    const buttons = listOfTypes.value.types
        .filter(type => callback(type))
        .map(type => document.querySelector('.' + type.type)) as HTMLDivElement[]

    buttons.forEach(button => {
      button.classList.remove(buttonClass)
      setTimeout(() => button.classList.add(buttonClass), 0)
    })
  }

  reset()
  reset(isPending, 'pending')
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