<template>
  <div class="tabs" :class="props.type">
    <Tab
        v-for="item in props.tabs"
        :key="item.id"
        :tab="item"
        :active="item.id === tab.id"
        :type="props.type"
        @tab="selectedTab => tab = selectedTab"
        @click="clickTab(item.id)"
    />
  </div>
</template>

<script setup lang="ts">
import Tab from "../Tab/Tab.vue";
import {
  onBeforeMount,
  Ref,
  ref,
} from "vue";

const props = defineProps({
  type: {
    type: String,
    default: 'big',
  },
  tabs: {
    type: Array as any,
    required: true,
  },
});

let tab: Ref<any> = ref(null);

onBeforeMount(() => tab.value = props.tabs[0])

const emit = defineEmits(['open-cells', 'toggle-expose-tabs'])
const clickTab = (id: number) => {
  emit('open-cells', id)
  emit('toggle-expose-tabs', id)
}
</script>

<style scoped lang="scss">
@import "tabs";
</style>