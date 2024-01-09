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
              <!--       FIRST CEIL        -->
              <PartnerCell
                  type="cumulative"
                  size="small"
                  :ceil="firstCeil"
                  @open-m-matrix-partner="$emit('open-m-matrix-partner')"
                  v-if="firstCeil?.matrix"
              />
<!--              cellType="boost"-->
              <AddPartnerCell
                  type="cumulative"
                  size="small"
                  :ceil="firstCeil"
                  :partners-count="partnersCount"
                  @open-m-add-partner="openMAddPartner(getPosition(1, 1))"
                  v-if="!firstCeil?.matrix"
              />

              <!--       SECOND CEIL        -->
              <PartnerCell
                  size="small"
                  :ceil="secondCeil"
                  @open-m-matrix-partner="$emit('open-m-matrix-partner')"
                  v-if="secondCeil?.matrix"
              />
<!--              cellType="boost"-->
              <AddPartnerCell
                  type="cumulative"
                  size="small"
                  :ceil="secondCeil"
                  :partners-count="partnersCount"
                  @open-m-add-partner="openMAddPartner(getPosition(1, 2))"
                  v-if="!secondCeil?.matrix"
              />
            </div>
          </div>

          <div class="modal-matrix-partner__endless">
            <div class="modal-matrix-partner__block-title">Бесконечные</div>
            <InfinityPartnerCard
                modal="m-matrix-partner"
                :partners-count="122"
                @open-m-infinity-cell="$emit('open-m-infinity-cell')"
            />
<!--            :ceil="selectedPartnerCeil"-->
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
  ComputedRef,
  inject,
  onMounted,
  Ref
} from "vue";
import {
  Ceil,
  Ceils,
} from "../../../../interfaces/store.interface.ts";
import { IPosition } from "../../../../interfaces/partners.interface.ts";

const emit = defineEmits(['open-m-add-partner'])

const store = useStore()

const partnersCount: ComputedRef<number> = computed(() => store.state.partners.partnersPendingSecond.count)

const ceils: Ref<Ceils> = computed(() => store.state.matrixById?.ceilsCollection?.['1'])

const selectedPartner = inject('selectedPartner') as Ref<Ceil>

const firstCeil: ComputedRef<Ceil> = computed(() => ceils.value?.['1'])
const secondCeil: ComputedRef<Ceil> = computed(() => ceils.value?.['2'])

const infinityPartners: ComputedRef = computed(() => store.state.partners.infinityPartners.list)

const getPosition = (depth: number, pos: number): IPosition => {
  return { depth, pos }
}

const openMAddPartner = (pos: IPosition) => {
  emit('open-m-add-partner', pos)
}

onMounted(() => {
  if (selectedPartner.value.matrix) {
    store.dispatch('getMatrixById', selectedPartner.value.matrix.id)
    store.dispatch('partners/getPendingPartners',
        {
          matrixFilterUserId: +selectedPartner.value?.matrix.owner.id,
          matrixFilterPageId: 1,
          isPartnerMatrix: true
        }
    )
  }
})
</script>

<style scoped lang="scss">
@import "mMatrixPartner";
</style>