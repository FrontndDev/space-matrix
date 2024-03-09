<template>
  <div class="partners-tabs" :class="props.class">
    <Tab
        :class="[props.class, { active: selectedTab?.id === tab.id }]"
        v-for="tab in props.tabs"
        :key="tab.id"
        :tab="tab"
        @tab="selectTab"
    />
    <Search/>
  </div>
</template>

<script setup lang="ts">
import Tab from "@/components/Tabs/Tab/Tab.vue";
import Search from "@/components/UI/Search/Search.vue";
import {
  PropType,
  Ref,
  ref
} from "vue";

const emit = defineEmits(['open-cells', 'toggle-expose-tabs', 'set-checkbox-value'])

const props = defineProps({
  class: {
    type: String,
    default: '',
  },
  tabs: {
    type: Array as PropType<any>,
    required: true,
  }
})

let selectedTab: Ref<any> = ref({});

const selectTab = (tab: any) => {
  selectedTab.value = tab
}
</script>

<style scoped lang="scss">
@import "tabs";
</style>