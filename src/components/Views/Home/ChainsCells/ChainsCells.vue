<template>
  <div class="chains-cells">
    <div class="chains-cells__header">
      <Tabs type="little"
            :tabs="tabs"
      />
    </div>
    <div class="chains-cells__container">

    </div>
  </div>
</template>

<script setup lang="ts">
import Search from "../../../UI/Search/Search.vue";
import SmallCell from "../../../SmallCell/SmallCell.vue";
import Tabs from "../../../UI/Tabs/Tabs.vue";
import {reactive} from "vue";

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

<style scoped>
@import "ChainsCells.scss";
</style>