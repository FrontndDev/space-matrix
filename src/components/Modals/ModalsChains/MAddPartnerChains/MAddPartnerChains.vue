<template>
  <div class="modal-add-partner-chains">
    <ModalHeader @close-modal="$emit('close-modal')">
      Выставить партнера
    </ModalHeader>
    <div class="modal-add-partner-chains__container">
      <BuyBoostCell
          @click="buyBooster"
      />
      <AddPartnerCell
          type="cumulative"
          :ceil="getCeil"
          :partners-count="partnersCount"
          @click="$emit('open-partner-waiting-chains')"
          v-if="partnersCount"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import ModalHeader from "../../../ModalHeader/ModalHeader.vue";
import AddPartnerCell from "../../../AddPartnerCell/AddPartnerCell.vue";
import BuyBoostCell from "../../../BuyBoostCell/BuyBoostCell.vue";
import {
  computed,
  ComputedRef
} from "vue";
import {
  IChainDetails,
} from "../../../../interfaces/chains.interface.ts";
import { useStore } from "vuex";
import {
  Ceil,
} from "../../../../interfaces/store.interface.ts";

const emit = defineEmits([
    'buy-booster',
    'select-partner',
])

const store = useStore()

const chainsDetails: ComputedRef<IChainDetails> = computed(() => store.state.chains.chainDetails)
const partnersCount: ComputedRef<number> = computed(() => store.state.partners.partnersPending.count)

const getCeil: ComputedRef<Ceil> = computed(() => {
  return {
    depth: 0,
    pos: 0,
    queueId: null,
    matrix: chainsDetails.value.list[0],
    allowBuyClone: false,
    allowSniper: false,
    fillRevard: [],
    isInfinity: false,
  }
})

const buyBooster = async () => {
  // emit('select-partner', chainsDetails.value.list[0])
  emit('buy-booster', true)
}
</script>

<style scoped lang="scss">
@import "mAddPartnerChains";
</style>