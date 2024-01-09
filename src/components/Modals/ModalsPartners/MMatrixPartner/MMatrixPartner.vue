<template>
  <div class="modal-matrix-partner">
    <ModalHeader
        @close-modal="$emit('close-modal')"
        :modalHeader="'MMatrixPartner'"
    >
      Матрица партнера
    </ModalHeader>
    <div class="modal-matrix-partner__container">
      <div class="modal-matrix-partner__overflow">
        <div class="modal-matrix-partner__cell">
          <PartnerCell
              type="cumulative"
              size="small"
              cellType="circle-avatar"
              :ceil="selectedPartner"
          />
        </div>
        <div class="modal-matrix-partner__block">

          <div class="modal-matrix-partner__savings">
            <div class="modal-matrix-partner__block-title">Накопительные</div>
            <div class="savings__partners savings__partners_mt-16">
              <PartnerCell
                  size="small"
                  cellType="boost"
                  @open-m-matrix-partner="$emit('open-m-matrix-partner')"
              />
              <AddPartnerCell
                  type="infinity"
                  size="small"
                  :ceil="firstCeil"
                  @open-m-add-partner="$emit('open-m-add-partner')"
              />
            </div>
          </div>

          <div class="modal-matrix-partner__endless">
            <div class="modal-matrix-partner__block-title">Бесконечные</div>
            <InfinityPartnerCard
                modal="m-matrix-partner"
                :ceil="firstCeil"
                @open-m-infinity-cell="$emit('open-m-infinity-cell')"
            />
          </div>
        </div>
      </div>
      <CopyLink />
    </div>
  </div>
</template>

<script setup lang="ts">

import ModalHeader from "../../../ModalHeader/ModalHeader.vue";
import PartnerCell from "../../../PartnerCell/PartnerCell.vue";
import CopyLink from "../../../Views/Home/CopyLink/CopyLink.vue";
import AddPartnerCell from "../../../AddPartnerCell/AddPartnerCell.vue";
import InfinityPartnerCard from "../../../InfinityPartnerCard/InfinityPartnerCard.vue";
import { useStore } from "vuex";
import {
  computed,
  inject,
  Ref
} from "vue";
import {
  Ceil,
  Ceils
} from "../../../../interfaces/store.interface.ts";

const store = useStore()
const ceils: Ref<Ceils> = computed(() => store.state.viewLastOwn?.ceilsCollection?.['1'])

const selectedPartner = inject('selectedPartner') as Ref<Ceil>

const firstCeil: Ref = computed(() => ceils.value?.['1'])
</script>

<style scoped>
@import "_mMatrixPartner.scss";
</style>