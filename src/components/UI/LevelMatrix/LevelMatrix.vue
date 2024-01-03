<template>
  <div v-if="props.level" class="level-matrix">
    <div>
      D1
    </div>
    <div>
      4
      <span>lvl</span>
    </div>
  </div>
</template>

<script setup lang="ts">

const props = defineProps({
  level: {
    type: Boolean,
    default: true
  }
})

</script>

<style scoped>
@import "_LevelMatrix.scss";
</style>