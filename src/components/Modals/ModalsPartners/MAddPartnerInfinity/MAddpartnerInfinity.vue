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
  Ref
} from "vue";
import { Ceils } from "../../../../interfaces/store.interface.ts";

const store = useStore()

const ceils: Ref<Ceils> = computed(() => store.state.viewLastOwn?.ceilsCollection?.['1'])

const firstCeil: Ref = computed(() => ceils.value?.['1'])
</script>

<style scoped>
@import "_mAddPartnerInfinity.scss";
</style>