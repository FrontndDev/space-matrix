<template>
  <div class="header">
    <Tabs :tabs="tabs"/>
    <div class="header__selects">
      <Select :items="selectItems"/>
      <Select :items="selectItems"/>
    </div>
  </div>
</template>

<script setup lang="ts">
import Tabs from "../../../UI/Tabs/Tabs.vue";
import { reactive } from "vue";
import Select from "../../../UI/Select/Select.vue";

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

const selectItems = reactive([
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
</script>

<style scoped lang="scss">
@import "infoHeader";
</style>