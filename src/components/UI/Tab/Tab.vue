<template>
  <div
      class="tab-matrix"
      :class="[{
        active: activeClass,
        'indicator-green': props.tab.indicator?.green,
        'indicator-orange': props.tab.indicator?.orange,
      }, props.type]"
      @click="emit('tab', props.tab)"
  >
    {{ props.tab.name }} {{ props.tab.value }}
  </div>
</template>

<script setup lang="ts">

import { useStore } from "vuex";
import {
  computed,
  PropType
} from "vue";
import { ITab } from "../../../interfaces/store.interface.ts";

const props = defineProps(<any>{
  type: {
    type: String,
  },
  tab: {
    type: Object as PropType<ITab>,
    required: true,
  },
  active: {
    type: Boolean,
    default: false,
  }
});

const emit = defineEmits(['tab']);

const store = useStore()

const littleTabID = computed(() => store.state.partners.littleTabID)

const activeClass = computed(() => props.type === 'little' ? littleTabID.value === props.tab.id : props.active)

</script>

<style scoped lang="scss">
@import "tab";
</style>