<template>
  <div class="modal-add-partner">
    <ModalHeader @close-modal="$emit('close-modal')">
      Выставить партнера
    </ModalHeader>
    <div class="modal-add-partner__container">
      <BuyBoostCell />
      <AddPartnerCell
          :type="getCeilCumulative ? 'cumulative' : 'profitable'"
          :ceil="getCeil"
          :partners-count="partnersCount"
          @click="$emit('open-partner-waiting')"
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
  inject,
  Ref
} from "vue";
import {
  Ceil,
  Ceils
} from "../../../../interfaces/store.interface.ts";
import { IPosition } from "../../../../interfaces/partners.interface.ts";

const store = useStore()


const ceils: Ref<Ceils> = computed(() => store.state.matrixByType?.ceilsCollection?.['1'])

const selectedPartner = inject('selectedPartner') as Ref<Ceil>
const partnerPos = inject('partnerPos') as Ref<IPosition>

const getCeil: ComputedRef<Ceil> = computed(() => selectedPartner.value ?? ceils.value[String(partnerPos.value.pos)])

const getCeilCumulative: ComputedRef<boolean> = computed(() =>
    !!getCeil.value.fillRevard.find(reward => reward.event === 'freeze')
)

const partnersCount: ComputedRef<number> = computed(() => {
  if (selectedPartner.value) {
    return store.state.partners.partnersPendingSecond.count
  } else {
    return store.state.partners.partnersPending.count
  }
})
</script>

<style scoped>
@import "_mAddPartner.scss";
</style>