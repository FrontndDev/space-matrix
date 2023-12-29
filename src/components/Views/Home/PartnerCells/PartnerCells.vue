<template>
  <div class="partners-cells">
    <div class="partners-cells__header">
      <Tabs type="little"
            :tabs="tabs"
      />
      <Search/>
    </div>
    <div class="partners-cells__container">
      <SmallCell />
      <SmallCell />
      <SmallCell />
      <SmallCell />
      <SmallCell />
      <SmallCell />
    </div>
  </div>
</template>

<script setup lang="ts">
import Tabs from "../../../UI/Tabs/Tabs.vue";
import { reactive } from "vue";
import Search from "../../../UI/Search/Search.vue";
import SmallCell from "../../../SmallCell/SmallCell.vue"
import Pagination from "../../../Pagination/Pagination.vue";

const tabs = reactive([
  {
    id: 1,
    name: 'Все',
    value: 152
  },
  {
    id: 2,
    name: 'Выставленные',
    value: 100
  },
  {
    id: 3,
    name: 'В ожидании',
    value: 52
  }
]);
</script>

<style scoped lang="scss">
@import "partnerCells";
</style>