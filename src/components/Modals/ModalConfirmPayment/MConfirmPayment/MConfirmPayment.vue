<template>
  <div class="modal-confirm-payment">
    <ModalHeader
        modalHeader="back"
        @close-modal="$emit('close-modal')"
        @back="$emit('back')"
    >
      Подтвердите оплату
    </ModalHeader>
    <div class="modal-confirm-payment__container">
      <div class="modal-confirm-payment__block">
        <img src="../../../../assets/images/ConfirmPaymentImage.png" alt="confirm payment">
        <div class="modal-confirm-payment__text">
          <svg v-if="props.result === 'failure'" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M0.833679 8.00016C0.833679 4.05735 4.05754 0.833496 8.00035 0.833496C11.9432 0.833496 15.167 4.05735 15.167 8.00016C15.167 11.943 11.9432 15.1668 8.00035 15.1668C4.05754 15.1668 0.833679 11.943 0.833679 8.00016ZM8.00035 1.8335C4.60982 1.8335 1.83368 4.60964 1.83368 8.00016C1.83368 11.3907 4.60982 14.1668 8.00035 14.1668C11.3909 14.1668 14.167 11.3907 14.167 8.00016C14.167 4.60964 11.3909 1.8335 8.00035 1.8335Z" fill="#FF3A30"/>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M8.00035 4.8335C8.27649 4.8335 8.50035 5.05735 8.50035 5.3335V8.66683C8.50035 8.94297 8.27649 9.16683 8.00035 9.16683C7.7242 9.16683 7.50035 8.94297 7.50035 8.66683V5.3335C7.50035 5.05735 7.7242 4.8335 8.00035 4.8335Z" fill="#FF3A30"/>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M7.32977 10.6668C7.32977 10.2986 7.62825 10.0002 7.99644 10.0002H8.00243C8.37062 10.0002 8.66909 10.2986 8.66909 10.6668C8.66909 11.035 8.37062 11.3335 8.00243 11.3335H7.99644C7.62825 11.3335 7.32977 11.035 7.32977 10.6668Z" fill="#FF3A30"/>
          </svg>
          <p v-if="props.result === 'failure'">На вашем счету не хватает средств, пожалуйста пополните счет!</p>
          <p v-else>С вашего баланса будут списанны средства, продолжить?</p>
        </div>
        <div
            class="modal-confirm-payment__money"
            :class="{ 'failure': props.result === 'failure' }"
        >
          <span>1000</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M13.1771 24.8558C14.396 27.0904 17.6046 27.0904 18.8235 24.8558L26.2697 11.2044C27.4386 9.06138 25.8876 6.44856 23.4465 6.44856H8.55407C6.11303 6.44856 4.56197 9.06139 5.73087 11.2044L13.1771 24.8558ZM17.4119 24.0858L24.8581 10.4344C25.4426 9.36291 24.6671 8.0565 23.4465 8.0565H16.8043V24.7115C17.0479 24.5719 17.2606 24.3633 17.4119 24.0858ZM14.5887 24.0858C14.74 24.3633 14.9527 24.5719 15.1963 24.7115V8.0565H8.55407C7.33355 8.0565 6.55802 9.36291 7.14247 10.4344L14.5887 24.0858Z" fill="#1A86E5"/>
          </svg>
        </div>
      </div>
      <div class="modal-confirm-payment__buttons">
        <CancelButton @click="cancel"/>
        <ChainsButton @click="confirm">
          {{ props.result === 'failure' ? 'Пополнить' : 'Подтвердить' }}
        </ChainsButton>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import CancelButton from "../../../UI/CancelButton/CancelButton.vue";
import ModalHeader from "../../../ModalHeader/ModalHeader.vue";
import ChainsButton from "../../../UI/ChainsButton/ChainsButton.vue";

const props = defineProps({
  result: {
    type: String,
    default: 'success'
    // failure, success
  }
})

const emit = defineEmits([
  'confirm',
  'cancel',
  'close-modal',
  'back',
])

const cancel = () => {
  emit('cancel')
}

const confirm = () => {
  emit('confirm')
}
</script>

<style scoped lang="scss">
@import "mConfirmPayment";
</style>