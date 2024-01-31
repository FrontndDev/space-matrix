<template>
  <div
      class="my-checkbox"
      :class="{ active: active }"
      @click.stop="active = !active"
  >
    <div class="my-checkbox__circle"/>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const active = ref(false);
</script>

<style scoped lang="scss">
@import "myCheckbox";
</style>