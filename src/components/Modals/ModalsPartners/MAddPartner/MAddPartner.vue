<template>
  <div class="modal-add-partner">
    <template v-if="!showConfirmPayment">
      <ModalHeader @close-modal="getEmitForModalHeader">
        {{ getTitle }}
      </ModalHeader>
      <div class="modal-add-partner__container" v-if="getTitle">
        <BuyBoostCell
            :price="getPrice"
            v-if="getCeil?.allowBuyClone"
            @click="showConfirmPayment = true"
        />
        <AddPartnerCell
            :type="getCeilCumulative ? 'cumulative' : 'profitable'"
            :ceil="getCeil"
            :partners-count="partnersCount"
            @click="$emit('open-partner-waiting')"
            v-if="getCeil.allowSniper && partnersCount"
        />
      </div>
      <EmptyCells
          class="modal-add-partner__empty"
          cellsType="partners"
          v-else
      />
    </template>
    <MConfirmPayment
        :currency="getMatrix.matrixConfig.currency"
        :price="getPrice"
        v-if="showConfirmPayment"
        @cancel="closeConfirmPayment"
        @confirm="confirm"
        @close-modal="showConfirmPayment = false"
        @back="showConfirmPayment = false"

        @set-payment-type="setPaymentType"
    />
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
  ref,
  Ref,
} from "vue";
import {
  Ceil,
  Ceils,
  IBuyBoosterParams,
  IMatrix,
} from "../../../../interfaces/store.interface.ts";
import { IPosition } from "../../../../interfaces/partners.interface.ts";
import MConfirmPayment from "../../ModalConfirmPayment/MConfirmPayment/MConfirmPayment.vue";
import EmptyCells from "../../../EmptyCells/EmptyCells.vue";

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

const showConfirmPayment: Ref<boolean> = ref(false)
const confirmPaymentType = ref('')
// failure, success, loading

const getMatrix: ComputedRef<IMatrix> = computed(() => props.selectedType === 'id' ? matrixById.value : matrixByType.value)

const getTitle = computed(() => {
  switch (true) {
    case !getCeil.value?.allowBuyClone && getCeil.value?.allowSniper && !!partnersCount.value:
      return 'Выставить партнера'
    case getCeil.value?.allowBuyClone:
      return 'Купить BOOST'
    default:
      return ''
  }
})

const getEmitForModalHeader = () => {
  props.selectedType === 'id' ? emit('open-m-matrix-partner') : emit('close-modal')
}

const setPaymentType = (result: string) => confirmPaymentType.value = result

const closeConfirmPayment = () => {
  showConfirmPayment.value = false
  confirmPaymentType.value = ''
}

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
    return store.state.partners.partnersPendingSecond.totalCount
  } else {
    return store.state.partners.partnersPending.totalCount
  }
})

const buyBooster = async () => {
  const matrix: IMatrix = props.selectedType === 'id' ? matrixById.value : matrixByType.value

  if (matrix?.matrix?.id) {
    const data: IBuyBoosterParams = {
      matrix_id: +matrix.matrix.id,
      pos: partnerPos.value.pos,
      depth: partnerPos.value.depth
    }
    if (matrix?.ceilsCollection) {
      matrix.ceilsCollection['1'][String(partnerPos.value.pos)].queueId = 1
    }

    closeConfirmPayment()
    getEmitForModalHeader()

    await store.dispatch('buyBooster', data)

    if (props.selectedType === 'id') {
      await store.dispatch('getMatrixById', matrixById.value.matrix?.id)
    } else {
      await store.dispatch('getMatrixByType', store.state.selectedType.type)
    }
  }
}

const confirm = () => {
  switch (confirmPaymentType.value) {
    case 'success':
      buyBooster()
      break;
    case 'failure':
      window.location.href = window.location.origin + '/app/wallet'
      emit('close-modal')
      break;
    default:
      break;
  }

  closeConfirmPayment()
}

onMounted(() => {
  if (!getCeil.value?.allowBuyClone && getCeil.value?.allowSniper && partnersCount.value) {
    emit('open-partner-waiting')
  }
})
</script>

<style scoped lang="scss">
@import "mAddPartner";
</style>