<template>
  <div class="tabs-matrix" :class="[{ 'cells': props.cells }, props.type]">
    <Tab
        v-for="item in props.tabs"
        :key="item.id"
        :tab="item"
        :active="item.id === tab.id"
        :type="props.type"
        @tab="selectedTab => tab = selectedTab"
        @click="clickTab(item.id)"
        @set-checkbox-value="(value, id) => emit('set-checkbox-value', value, id)"
    />
<!--    <Search-->
<!--        v-if="cells"-->
<!--    />-->
  </div>
</template>

<script setup lang="ts">
import Tab from "../Tab/Tab.vue";
import {
  onBeforeMount,
  Ref,
  ref,
} from "vue";
import { useStore } from "vuex";

const props = defineProps({
  type: {
    type: String,
    default: 'big',
  },
  tabs: {
    type: Array as any,
    required: true,
  },
  cells: {
    type: Boolean,
    default: false,
  }
});

const emit = defineEmits(['open-cells', 'toggle-expose-tabs', 'set-checkbox-value'])

let tab: Ref<any> = ref(null);

const store = useStore()

const clickTab = (id: number) => {
  if (props.type === 'little') {
    store.commit('partners/CHANGE_LITTLE_TAB', id)
  } else if (props.type === 'big') {
    store.commit('partners/CHANGE_BIG_TAB', id)
  }

  emit('open-cells', id)
  emit('toggle-expose-tabs', id)
}

onBeforeMount(() => tab.value = props.tabs[0])
</script>

<style scoped lang="scss">
@import "tabs";
</style>