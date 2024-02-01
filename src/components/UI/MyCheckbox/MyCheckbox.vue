<template>
  <div
      class="my-checkbox"
      :class="{ active: active }"
      @click.stop="setValue"
  >
    <div class="my-checkbox__circle"/>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const emit = defineEmits(['set-value'])

const active = ref(false);

const setValue = () => {
  active.value = !active.value
  emit('set-value', active.value)
}
</script>

<style scoped lang="scss">
@import "myCheckbox";
</style>