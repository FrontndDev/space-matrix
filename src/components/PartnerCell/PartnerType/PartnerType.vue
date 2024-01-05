<template>
  <div class="partner-type" :class="[props.cellType, props.type]">
    <template v-if="props.cellType === 'boost' || props.type === 'chains-boost'">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M9.08377 1.33583C9.10725 1.33416 9.13118 1.33333 9.15511 1.33333V1.33458C9.15711 1.33458 9.15909 1.33458 9.16105 1.33458C9.16959 1.33459 9.17793 1.33466 9.18657 1.335C9.66427 1.3496 10.0458 1.71761 10.0458 2.16906C10.0458 2.23665 10.0374 2.30216 10.0205 2.36516L9.22468 6.28806L11.7829 6.29223C12.1166 6.29432 12.4206 6.47123 12.5712 6.75036C12.7214 7.02908 12.6926 7.36329 12.4968 7.61655L7.52483 14.3224C7.35289 14.544 7.12424 14.6667 6.84551 14.6667C6.72763 14.6667 6.60799 14.6445 6.4941 14.5987C6.11212 14.4447 5.89499 14.0625 5.97121 13.6791L6.77549 9.21708L4.21729 9.19956C3.88361 9.19706 3.57962 9.02015 3.42896 8.74101C3.27829 8.46188 3.30754 8.12809 3.5034 7.87482L8.46959 1.68631C8.48377 1.66712 8.49883 1.64834 8.51523 1.6304C8.57018 1.5699 8.63266 1.51733 8.7009 1.47477C8.82365 1.39717 8.92734 1.34751 9.08377 1.33583Z" fill="#A33FBC"/>
      </svg>
      BOOST
    </template>
    <template v-else>
      <div class="partner-type__circle fill-blue " />
      <div class="partner-type__circle " />
<!--      классы => ( fill-green, fill-orange, fill-blue )  -->
    </template>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  cellType: {
    type: String,
    default: 'cumulative'
    //cumulative, profitable, boost, infinity
  },
  type: {
    type: String,
    default: ''
    //chains-boost,
  }
});
</script>

<style scoped lang="scss">
@import "partnerType";
</style>