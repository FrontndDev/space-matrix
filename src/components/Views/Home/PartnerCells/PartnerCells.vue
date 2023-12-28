<template>
  <div class="partners-cells">
    <div class="partners-cells__header">
      <Tabs type="little" :tabs="tabs"/>
      <Search/>
    </div>
  </div>
</template>

<script setup lang="ts">
import Tabs from "../../../UI/Tabs/Tabs.vue";
import { reactive } from "vue";
import Search from "../../../UI/Search/Search.vue";

const tabs = reactive([
  {
    id: 1,
    name: 'Все 152'
  },
  {
    id: 2,
    name: 'Выставленные 100'
  },
  {
    id: 3,
    name: 'В ожидании 52'
  }
]);
</script>

<style scoped lang="scss">
@import "partnerCells";
</style>