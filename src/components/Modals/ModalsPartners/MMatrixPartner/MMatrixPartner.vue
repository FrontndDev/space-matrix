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
          />
        </div>
        <div class="modal-matrix-partner__block">

          <div class="modal-matrix-partner__savings">
            <h3>Накопительные</h3>
            <div class="savings__partners savings__partners_mt-16">
              <PartnerCell
                  @open-m-matrix-partner="$emit('open-m-matrix-partner')"
                  size="small"
                  cellType="boost"
              />
              <AddPartnerCell
                  @open-m-add-partner="$emit('open-m-add-partner')"
                  type="infinity"
                  size="small"
              />
            </div>
          </div>

          <div class="modal-matrix-partner__endless">
            <h3>Бесконечные</h3>
            <InfinityPartnerCard
                @open-m-infinity-cell="$emit('open-m-infinity-cell')"
                modal="m-matrix-partner"
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

</script>

<style scoped>
@import "MMatrixPartner.scss";
</style>