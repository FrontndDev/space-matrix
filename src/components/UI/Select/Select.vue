<template>
  <div class="select" :tabindex="1" @blur="showDropdown = false">
    <div class="select__up" :class="{ opened: showDropdown }" @click="showDropdown = !showDropdown">
      <div class="select__text">{{ selectedItem.name }}</div>

      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M2.36648 5.61324C2.56174 5.41798 2.87832 5.41798 3.07359 5.61324L7.42025 9.95991C7.73832 10.278 8.26174 10.278 8.57981 9.95991L12.9265 5.61324C13.1217 5.41798 13.4383 5.41798 13.6336 5.61324C13.8288 5.80851 13.8288 6.12509 13.6336 6.32035L9.28692 10.667C8.57832 11.3756 7.42174 11.3756 6.71315 10.667L2.36648 6.32035C2.17122 6.12509 2.17122 5.80851 2.36648 5.61324Z" fill="#576175"/>
        <path fill-rule="evenodd" clip-rule="evenodd" d="M2.36648 5.61324C2.56174 5.41798 2.87832 5.41798 3.07359 5.61324L7.42025 9.95991C7.73832 10.278 8.26174 10.278 8.57981 9.95991L12.9265 5.61324C13.1217 5.41798 13.4383 5.41798 13.6336 5.61324C13.8288 5.80851 13.8288 6.12509 13.6336 6.32035L9.28692 10.667C8.57832 11.3756 7.42174 11.3756 6.71315 10.667L2.36648 6.32035C2.17122 6.12509 2.17122 5.80851 2.36648 5.61324Z" fill="#576175"/>
      </svg>
    </div>

    <div class="select__down" v-if="showDropdown">
      <div
          class="select__item"
          :class="{ active: item.id === selectedItem.id }"
          v-for="item in props.items"
          :key="item.id"
          @click="selectItem(item)"
      >
        {{ item.name }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  onBeforeMount,
  Ref,
  ref
} from "vue";

const props = defineProps({
  items: {
    type: Array as any,
    required: true
  },
  defaultValue: {
    type: Object as any,
  }
});

const emit = defineEmits(['select']);

const selectedItem: Ref<any> = ref(null);

const showDropdown = ref(false);

const selectItem = (item: any) => {
  selectedItem.value = item;
  emit('select');
  showDropdown.value = false
}

onBeforeMount(() => {
  selectedItem.value = props.defaultValue ?? props.items[0];
});
</script>

<style scoped lang="scss">
@import "select";
</style>