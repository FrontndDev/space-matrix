<template>
  <div class="modal-add-partner">
    <ModalHeader @close-modal="$emit('open-m-matrix-partner')">
      {{ !getCeil?.allowSniper && !partnersCount && getCeil?.allowBuyClone ? 'Купить BOOST' : 'Выставить партнера' }}
    </ModalHeader>
    <div class="modal-add-partner__container">
      <BuyBoostCell
          :price="getPrice"
          @click="buyBooster"
          v-if="getCeil.allowBuyClone"
      />
      <AddPartnerCell
          :type="getCeilCumulative ? 'cumulative' : 'profitable'"
          :ceil="getCeil"
          :partners-count="partnersCount"
          @click="$emit('open-partner-waiting')"
          v-if="getCeil.allowSniper && partnersCount"
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
  onMounted,
  Ref
} from "vue";
import {
  Ceil,
  Ceils,
  IBuyBoosterParams,
  IMatrix
} from "../../../../interfaces/store.interface.ts";
import { IPosition } from "../../../../interfaces/partners.interface.ts";

const props = defineProps({
  selectedType: {
    type: String,
    default: 'type'
  }
})

const emit = defineEmits([
  'close-modal',
  'open-partner-waiting',
  'open-m-matrix-partner',
])

const store = useStore()

const matrixByType: ComputedRef<IMatrix> = computed(() => store.state.matrixByType)
const matrixById: ComputedRef<IMatrix> = computed(() => store.state.matrixById)

const getPrice: ComputedRef<number> = computed(() => {
  if (props.selectedType === 'id') {
    return matrixById.value.matrixConfig.price
  } else {
    return matrixByType.value.matrixConfig.price
  }
})
// @ts-ignore
const ceils: ComputedRef<Ceils> = computed(() => {
  if (props.selectedType === 'id') {
    return matrixById.value?.ceilsCollection?.['1']
  } else {
    return matrixByType.value?.ceilsCollection?.['1']
  }
})

const selectedPartner = inject('selectedPartner') as Ref<Ceil>
const partnerPos = inject('partnerPos') as Ref<IPosition>

const getCeil: ComputedRef<Ceil> = computed(() => {
  if (props.selectedType === 'id') {
    return ceils.value[String(partnerPos.value.pos)]
  } else {
    return selectedPartner.value ?? ceils.value[String(partnerPos.value.pos)]
  }
})

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

const buyBooster = async () => {
  const matrix: IMatrix = props.selectedType === 'id' ? matrixById.value : matrixByType.value

  if (matrix?.matrix?.id) {
    // @ts-ignore
    const data: IBuyBoosterParams = {
      matrix_id: +matrix.matrix.id,
      pos: partnerPos.value.pos,
      depth: partnerPos.value.depth
    }
    await store.dispatch('buyBooster', data)

    if (props.selectedType === 'id') {
      await store.dispatch('getMatrixById', matrixById.value.matrix?.id)
    } else {
      await store.dispatch('getMatrixByType', store.state.selectedType.type)
    }
    emit('close-modal')
  }
}

onMounted(() => {
  if (!getCeil.value.allowBuyClone && getCeil.value.allowSniper && partnersCount.value) {
    emit('open-partner-waiting')
  }
})
</script>

<style scoped lang="scss">
@import "mAddPartner";
</style>