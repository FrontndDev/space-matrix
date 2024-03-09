<template>
  <div class="partners-cells">
    <div class="partners-cells__header">
      <Tabs class="little" :tabs="tabs"/>
    </div>
    <div class="partners-cells__container">
<!--      <PartnerCell/>-->
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import Tabs from "@/components/Tabs/Tabs.vue";
import PartnerCell from "@/components/PartnerCell/PartnerCell.vue";

const tabs = reactive([
  {
    id: 1,
    name: 'Все',
    value: 152,
  },
  {
    id: 2,
    name: 'В ожидании',
    value: 52,
  },
  {
    id: 3,
    name: 'Выставленные',
    value: 100,
  }
])
</script>

<style scoped lang="scss">
@import '@/assets/scss/variables';
@import '@/assets/scss/mixins';

.partners-cells {
  padding: 16px;
  width: 100%;
  background: $bg-base;

  &__header {
    @include flexbox(row, flex-start, center);
    column-gap: 16px;
  }

  &__container {
    margin-top: 32px;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(130px, 1fr));
    gap: 8px 56px;
  }
}


@media (max-width: 576px) {
  .partners-cells__container {
    gap: 8px 24px;
  }
}
</style>