<template>
  <div class="modal-add-partner">
    <ModalHeader @close-modal="$emit('close-modal')">
      Выставить партнера
    </ModalHeader>
    <div class="modal-add-partner__container">
      <BuyBoostCell />
      <AddPartnerCell
          type="profitable"
          :ceil="firstCeil"
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
  Ref
} from "vue";
import { Ceils } from "../../../../interfaces/store.interface.ts";

const store = useStore()

const ceils: Ref<Ceils> = computed(() => store.state.matrixByType?.ceilsCollection?.['1'])

const firstCeil: Ref = computed(() => ceils.value?.['1'])
const partnersCount: ComputedRef<number> = computed(() => store.state.partners.partnersPending.count)
</script>

<style scoped>
@import "_mAddPartnerInfinity.scss";
</style>