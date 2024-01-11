<template>
  <div class="level-matrix">
    <div>{{ selectedType.title }}</div>
    <div v-if="props.level > 0">
      {{ props.level }}
      <span>lvl</span>
    </div>
  </div>
</template>

<script setup lang="ts">

import { useStore } from "vuex";
import {
  computed,
  ComputedRef
} from "vue";
import { Type } from "../../../interfaces/store.interface.ts";

const props = defineProps({
  level: {
    type: Number,
    default: 0
  },
})

const store = useStore()

const selectedType: ComputedRef<Type> = computed(() => store.state.selectedType)
</script>

<style scoped lang="scss">
@import "levelMatrix";
</style>