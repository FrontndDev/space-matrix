<template>
  <div class="header">
    <Tabs
        :tabs="tabs"
        @open-cells="id => $emit('open-cells', id)"
    />
    <div v-if="props.infoHeader === 1" class="header__selects">
      <Select :items="selectItemsPartners"/>
      <Select :items="selectItemsPartners"/>
    </div>
    <div v-if="props.infoHeader === 2" class="header__selects">
      <Select :items="selectItemsBoost"/>
      <Select :items="selectItemsBoost"/>
    </div>
    <ChainsButton v-if="props.infoHeader === 3">
      Примеры цепочек
    </ChainsButton>
  </div>
</template>

<script setup lang="ts">
import Tabs from "../../../UI/Tabs/Tabs.vue";
import { reactive } from "vue";
import Select from "../../../UI/Select/Select.vue";
import ChainsButton from "../../../UI/ChainsButton/ChainsButton.vue";

const props = defineProps({
  infoHeader: {
    type: Number,
    default: 1
  }
})

const tabs = reactive([
  {
    id: 1,
    name: 'Партнеры',
    indicator: false,
  },
  {
    id: 2,
    name: 'Бустеры',
    indicator: true,
  },
  {
    id: 3,
    name: 'Цепочки',
    indicator: false,
  },
]);

const selectItemsPartners = reactive([
  {
    id: 1,
    name: 'Мои партнеры',
  },
  {
    id: 2,
    name: 'Значение 1'
  },
  {
    id: 3,
    name: 'Значение 2'
  },
  {
    id: 4,
    name: 'Значение 3'
  },
]);

const selectItemsBoost = reactive([
  {
    id: 1,
    name: 'Мои бустеры',
  },
  {
    id: 2,
    name: 'Значение 1'
  },
  {
    id: 3,
    name: 'Значение 2'
  },
  {
    id: 4,
    name: 'Значение 3'
  },
]);
</script>

<style scoped lang="scss">
@import "infoHeader";
</style>