<template>
  <div class="home">
    <div class="container">
      <div class="home__content">
        <Matrices/>
        <Info/>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Matrices from "../../components/Views/Home/Matrices/Matrices.vue";
import Info from "../../components/Views/Home/Info/Info.vue";
</script>

<style scoped lang="scss">
.home {
  padding: 24px 0;
}
</style>