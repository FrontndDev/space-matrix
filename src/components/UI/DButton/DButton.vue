<template>
  <div class="d-button">
    <div class="d-button__name">{{ props.type.title }}</div>
    <div
        v-if="props.isTime == 'time'"
        class="d-button__time"
    >
      24:00
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M8.00016 1.83325C4.59631 1.83325 1.8335 4.59606 1.8335 7.99992C1.8335 11.4038 4.59631 14.1666 8.00016 14.1666C11.404 14.1666 14.1668 11.4038 14.1668 7.99992C14.1668 4.59606 11.404 1.83325 8.00016 1.83325ZM0.833496 7.99992C0.833496 4.04378 4.04402 0.833252 8.00016 0.833252C11.9563 0.833252 15.1668 4.04378 15.1668 7.99992C15.1668 11.9561 11.9563 15.1666 8.00016 15.1666C4.04402 15.1666 0.833496 11.9561 0.833496 7.99992Z" fill="#7B879D"/>
        <path fill-rule="evenodd" clip-rule="evenodd" d="M7.75342 4.50643C8.02956 4.50643 8.25342 4.73029 8.25342 5.00643V7.73976C8.25342 7.84213 8.29251 7.9905 8.37942 8.1429C8.46635 8.29534 8.57409 8.40439 8.66165 8.45628L8.66298 8.45707L10.7296 9.69041C10.9668 9.83192 11.0443 10.1389 10.9028 10.376C10.7613 10.6131 10.4543 10.6906 10.2172 10.5491L8.15185 9.31658C8.15162 9.31644 8.15139 9.3163 8.15116 9.31616C7.87905 9.1547 7.66036 8.90063 7.51075 8.63829C7.361 8.37569 7.25342 8.0574 7.25342 7.73976V5.00643C7.25342 4.73029 7.47728 4.50643 7.75342 4.50643Z" fill="#7B879D"/>
      </svg>
    </div>
    <div
        v-else
        class="d-button__price"
    >
      {{ props.type.price }}
      <svg xmlns="http://www.w3.org/2000/svg" width="17" height="16" viewBox="0 0 17 16" fill="none">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M7.08841 12.4278C7.69785 13.5451 9.30218 13.5451 9.91162 12.4278L13.6347 5.60212C14.2192 4.53063 13.4436 3.22422 12.2231 3.22422H4.7769C3.55638 3.22422 2.78085 4.53063 3.3653 5.60212L7.08841 12.4278ZM9.20581 12.0429L12.9289 5.21714C13.2212 4.6814 12.8334 4.02819 12.2231 4.02819H8.902V12.3557C9.02379 12.2859 9.13014 12.1816 9.20581 12.0429ZM7.79421 12.0429C7.86988 12.1816 7.97623 12.2859 8.09803 12.3557V4.02819H4.7769C4.16664 4.02819 3.77887 4.6814 4.0711 5.21714L7.79421 12.0429Z"/>
      </svg>
    </div>
  </div>
</template>

<script setup lang="ts">
import ListOfTypes from "../../../interfaces/store.interface.ts";
import { PropType } from "vue";

const props = defineProps({
  type: {
    type: Object as PropType<ListOfTypes>,
    required: true,
  },
  opened: {
    type: Array as PropType<string[]>,
    required: true,
  },
  isTime: {
    type: String,
    default: ''
  }
})
</script>

<style scoped lang="scss">
@import "dButton";
</style>