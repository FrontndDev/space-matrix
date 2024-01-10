<template>
  <div class="modal-add-partner">
    <ModalHeader @close-modal="emit('close-modal')">
      Выставить партнера
    </ModalHeader>
    <div class="modal-add-partner__container">
      <BuyBoostCell v-if="thirdCeil.allowBuyClone"/>
      <AddPartnerCell
          type="profitable"
          :ceil="thirdCeil"
          :partners-count="partnersCount"
          @click="emit('open-partner-waiting')"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import ModalHeader from "../../../ModalHeader/ModalHeader.vue";
import BuyBoostCell from "../../../BuyBoostCell/BuyBoostCell.vue";
import AddPartnerCell from "../../../AddPartnerCell/AddPartnerCell.vue";
import { useStore } from "vuex";
import {
  computed,
  ComputedRef,
  onMounted,
} from "vue";
import {
  Ceil,
  Ceils
} from "../../../../interfaces/store.interface.ts";

const emit = defineEmits(['close-modal', 'open-partner-waiting'])

const store = useStore()

const ceils: ComputedRef<Ceils> = computed(() => store.state.matrixByType?.ceilsCollection?.['1'])

const thirdCeil: ComputedRef<Ceil> = computed(() => ceils.value?.['3'])
const partnersCount: ComputedRef<number> = computed(() => store.state.partners.partnersPending.count)

onMounted(() => {
  if (!thirdCeil.value.allowBuyClone && thirdCeil.value.allowSniper && partnersCount.value) {
    emit('open-partner-waiting')
  }
})
</script>

<style scoped>
@import "_mAddPartnerInfinity.scss";
</style>