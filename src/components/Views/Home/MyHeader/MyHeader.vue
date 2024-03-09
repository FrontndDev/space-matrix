<template>
  <header class="header">
    <div class="header__buttons">
      <MyButton
          class="header-button"
          :class="{ 'no-active': button?.price, 'active': !button?.price }"
          v-for="button in props.buttons"
          :key="button.id"
          :name="button.name"
          :subtitle="button?.price"
          :icon="button?.disabled ? LockIcon : button.icon"
          :disabled="button?.disabled"
          @click="navigate(button)"
      />
    </div>
  </header>
</template>

<script setup lang="ts">
import {
  onMounted,
  PropType,
} from "vue";
import MyButton from "@/components/UI/MyButton/MyButton.vue";
import LockIcon from '@/assets/svg/HeaderButton/lock.svg?component';
import { IMyButton } from "@/components/UI/MyButton/MyButton.interface.ts";
import {
  useRoute,
  useRouter
} from "vue-router";
import { baseUrl } from "@/router";

const props = defineProps({
  buttons: {
    type: Array as PropType<IMyButton[]>,
    required: true,
  }
})

const router = useRouter();
const route = useRoute();

const navigate = (button: IMyButton) => {
  router.push(baseUrl + '/' + button.id)
}

onMounted(() => {
  const type = route.params?.type
  if (!type) router.push(baseUrl + '/' + props.buttons[0].id)
})
</script>

<style scoped lang="scss">
@import "myHeader";
</style>