<template>
  <div class="modal-add-partner">
    <template v-if="!confirmPaymentType">
      <ModalHeader @close-modal="getEmitForModalHeader">
        {{ getTitle }}
      </ModalHeader>
      <div class="modal-add-partner__container">
        <BuyBoostCell
            :price="getPrice"
            v-if="getCeil?.allowBuyClone"
            @click="buyBooster"
        />
        <AddPartnerCell
            :type="getCeilCumulative ? 'cumulative' : 'profitable'"
            :ceil="getCeil"
            :partners-count="partnersCount"
            @click="$emit('open-partner-waiting')"
            v-if="getCeil.allowSniper && partnersCount"
        />
      </div>
    </template>
    <MConfirmPayment
        :result="confirmPaymentType"
        :price="getPaymentPrice"
        v-if="confirmPaymentType"
        @cancel="cancel"
        @confirm="confirm"
        @close-modal="confirmPaymentType = ''"
        @back="confirmPaymentType = ''"
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
  Ref
} from "vue";
import {
  Ceil,
  Ceils,
  IBalance,
  IBuyBoosterParams,
  IMatrix,
  IWallet,
} from "../../../../interfaces/store.interface.ts";
import { IPosition } from "../../../../interfaces/partners.interface.ts";
import MConfirmPayment from "../../ModalConfirmPayment/MConfirmPayment/MConfirmPayment.vue";
import router from "../../../../router";

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

const confirmPaymentType: Ref<string> = ref('')
// failure, success

const getPaymentPrice: ComputedRef<number> = computed(() => {
  const matrix: IMatrix = props.selectedType === 'id' ? matrixById.value : matrixByType.value
  const wallet = balance.value.wallets
      .filter(wallet => wallet.type === 0)
      .find(wallet => wallet.currency === matrix.matrixConfig.currency) as IWallet

  switch (confirmPaymentType.value) {
    case 'failure':
      return (wallet.amount - getPrice.value) * -1
    case 'success':
      return getPrice.value
    default:
      return 0
  }
})

const getTitle = computed(() => {
  switch (true) {
    case !getCeil.value?.allowBuyClone && getCeil.value?.allowSniper && !!partnersCount.value:
      return 'Выставить партнера'
    case getCeil.value?.allowBuyClone:
      return 'Купить BOOST'
    case !partnersCount.value:
      return 'Список партнеров пуст'
    default:
      return ''
  }
})

const getEmitForModalHeader = () => {
  props.selectedType === 'id' ? emit('open-m-matrix-partner') : emit('close-modal')
}

// const mConfirmPayment = () => {
//
// }

const store = useStore()

const balance: ComputedRef<IBalance> = computed(() => store.state.balance)

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
  await store.dispatch('getWallets')
  const matrix: IMatrix = props.selectedType === 'id' ? matrixById.value : matrixByType.value

  const wallet = balance.value.wallets
      .filter(wallet => wallet.type === 0)
      .find(wallet => wallet.currency === matrix.matrixConfig.currency) as IWallet

  if (wallet.amount >= getPrice.value) {
    confirmPaymentType.value = 'success'
  } else {
    confirmPaymentType.value = 'failure'
  }
}

const confirm = async () => {
  switch (confirmPaymentType.value) {
    case 'success':
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
      break;
    case 'failure':
      window.location.href = window.location.origin + '/app/wallet'
      emit('close-modal')
      break;
    default:
      break;
  }

  confirmPaymentType.value = ''
}

const cancel = () => {
  confirmPaymentType.value = ''
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