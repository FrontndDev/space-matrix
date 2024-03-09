<template>
  <div class="small-partner-cells">
    <div
        class="small-partner-cells__item"
        v-for="item in items"
        :key="item.id"
    >
      <PartnerCell
          size="small"
          type="block"
          :state="item.type"
          v-if="item.owner"
      />
      <AddPartnerCell
          size="small"
          type="block"
          :state="item.type"
          v-else
      />
      <PartnerReward
          type="block"
          :state="item.type"
          :class="[{ 'without-owner': !item.owner }, props.type]"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import PartnerCell from "@/components/PartnerCell/PartnerCell.vue";
import {
  PropType,
  reactive
} from "vue";
import AddPartnerCell from "@/components/AddPartnerCell/AddPartnerCell.vue";
import PartnerReward from "@/components/PartnerReward/PartnerReward.vue";

const props = defineProps({
  type: {
    type: String as PropType<'' | 'block'>,
    default: ''
  }
})

const items: any = reactive([
  {
    id: 1,
    type: 'freeze',
    owner: null,
  },
  {
    id: 2,
    type: 'freeze',
    owner: {
      id: 1001,
      name: 'Ivan'
    },
  },
  {
    id: 3,
    type: 'profit',
    owner: null,
  }
])
</script>

<style scoped lang="scss">
@import "@/assets/scss/variables";
@import "@/assets/scss/mixins";

.small-partner-cells {
  @include flex-center;
  column-gap: 16px;

  &__item {
    @include flexbox(column);
    row-gap: 8px;
  }
}
</style>