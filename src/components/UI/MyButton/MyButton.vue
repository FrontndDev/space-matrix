<template>
  <button class="my-button" :disabled="props.disabled">
    {{ props.name }}

    <span class="my-button__subtitle" v-if="props.icon || props.subtitle">
      {{ props.subtitle }}
      <component :is="props.icon"/>
    </span>
  </button>
</template>

<script setup lang="ts">
import {
  PropType
} from "vue";

const props = defineProps({
  name: {
    type: String,
    default: ''
  },
  subtitle: {
    type: Object as PropType<string | number>,
    default: '',
  },
  icon: {
    type: Object,
  },
  disabled: {
    type: Boolean,
    default: false,
  }
})
</script>

<style scoped lang="scss">
@import "myButton";
</style>