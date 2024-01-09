<template>
  <div
      class="tab-matrix"
      :class="[{ active: active, indicator: props.tab.indicator }, props.type]"
      @click="emit('tab', props.tab)"
  >
    {{ props.tab.name }} {{ props.tab.value }}
  </div>
</template>

<script setup lang="ts">

const props = defineProps(<any>{
  type: {
    type: String,
  },
  tab: {
    type: Object as any,
    required: true,
  },
  active: {
    type: Boolean,
    default: false,
  }
});

const emit = defineEmits(['tab']);

</script>

<style scoped lang="scss">
@import "tab";
</style>