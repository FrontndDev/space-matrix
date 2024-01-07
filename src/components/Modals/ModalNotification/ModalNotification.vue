<template>
  <transition name="modal" class="modal">
    <div v-if="toggleModalNotification" class="modal__container">
      <div class="modal__content">
        <div class="modal-notification">
          <img :src="getIconPath" :alt="props.statusNotification">
          <div v-if="statusNotification === 'success'" class="modal-notification__text">
            <div>Поздравляем!</div>
            <span>Вы успешно активировали цепочку!</span>
          </div>
          <div v-if="statusNotification === 'failure'" class="modal-notification__text">
            <div>Что-то пошло не так!</div>
            <span>Цепочка не активирована, пожалуйста попробуйте снова</span>
          </div>
          <button class="modal-notification__btn">Вернуться на главную</button>
        </div>
        <div @click="$emit('close-modal')" class="modal__overlay"></div>
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { computed, Ref } from "vue"

import SuccessIcon from "../../../assets/svg/notification-green.svg";
import FailureIcon from "../../../assets/svg/notification-red.svg";


const props = defineProps({
  toggleModalNotification: {
    type: Boolean,
    default: false
  },
  statusNotification: {
    type: String,
    default: 'success'
    // success, failure
  }
})

const getIconPath: Ref<string> = computed(() => {
  switch (props.statusNotification) {
    case 'success':
      return SuccessIcon;
    case 'failure':
      return FailureIcon;
    default:
      return SuccessIcon;
  }
});

</script>

<style scoped>
@import "_modalNotification.scss";
</style>