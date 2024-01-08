<template>
  <div class="expose-partner">
    <div class="expose-partner__content">
      <ModalHeader
          :modalHeader="'back'"
          @close-modal="$emit('close-modal')"
          @open-change-partner="$emit('open-change-partner')"
      >
        Выберите действие
      </ModalHeader>
      <div class="expose-partner__container">
        <div class="expose-partner__cell">
          <div class="expose-partner__block">
            <SmallCell type="chains-partner" :cell="firstCeil"/>
          </div>
        </div>
        <div class="expose-partner__info">
          <h4 class="expose-partner__info__title">Партнер переходит к вам в матрицу D5</h4>
          <div class="expose-partner__choice">
            <div class="expose-partner__tabs">
              <Tabs
                  type="expose-modal"
                  :tabs="tabs"
                  @toggle-expose-tabs="toggleExposeTabs"
              />
            </div>

            <div class="expose-partner__reward" v-if="isExposeTabs === 1">
              <div class="expose-partner__ton">
                +1000
                <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clip-rule="evenodd"
                        d="M7.08838 12.4279C7.69782 13.5452 9.30215 13.5452 9.91159 12.4279L13.6347 5.60218C14.2192 4.53069 13.4436 3.22428 12.2231 3.22428H4.77687C3.55635 3.22428 2.78082 4.53069 3.36526 5.60218L7.08838 12.4279ZM9.20578 12.0429L12.9289 5.2172C13.2211 4.68146 12.8334 4.02825 12.2231 4.02825H8.90197V12.3558C9.02376 12.2859 9.13011 12.1816 9.20578 12.0429ZM7.79418 12.0429C7.86985 12.1816 7.9762 12.2859 8.098 12.3558V4.02825H4.77687C4.16661 4.02825 3.77884 4.68146 4.07107 5.2172L7.79418 12.0429Z"
                        fill="#29A352"/>
                </svg>
              </div>
              <div class="expose-partner__bonus">
                <ExposeBonusItem :type="'auto'"/>
                <ExposeBonusItem :type="'boost'"/>
              </div>
            </div>

            <div class="expose-partner__wait-list" v-if="isExposeTabs === 2">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M8.00518 10.3424L9.00002 6.88466H8.71461L7.08237 7.23011L7.02054 7.41989C7.08713 7.41672 7.14421 7.41514 7.19178 7.41514C7.29643 7.41514 7.37888 7.44203 7.43913 7.4958C7.49938 7.54957 7.52951 7.61124 7.52951 7.68083C7.52951 7.79153 7.49779 7.956 7.43437 8.17424L6.77319 10.442C6.71928 10.6223 6.69232 10.771 6.69232 10.888C6.69232 11.0651 6.75257 11.2122 6.87308 11.3292C6.99675 11.4431 7.16165 11.5 7.36778 11.5C7.90687 11.5 8.41584 11.0841 8.89469 10.2523L8.73296 10.1574C8.53318 10.4642 8.36193 10.6761 8.21923 10.7931C8.16532 10.8406 8.11141 10.8643 8.0575 10.8643C8.02579 10.8643 7.99567 10.8501 7.96712 10.8216C7.93858 10.79 7.92431 10.7568 7.92431 10.722C7.92431 10.6619 7.95127 10.5354 8.00518 10.3424Z"
                    fill="#576175"/>
                <path
                    d="M8.88462 5.49998C8.88462 5.88233 8.57466 6.19229 8.19231 6.19229C7.80996 6.19229 7.5 5.88233 7.5 5.49998C7.5 5.11763 7.80996 4.80767 8.19231 4.80767C8.57466 4.80767 8.88462 5.11763 8.88462 5.49998Z"
                    fill="#576175"/>
                <path fill-rule="evenodd" clip-rule="evenodd"
                      d="M2.27273 12.0257C3.18541 13.3218 4.5269 14.2941 6.09091 14.7365C6.50109 14.8525 6.92657 14.9321 7.36364 14.9715C7.57323 14.9904 7.78549 15 8 15C10.3226 15 12.3809 13.8689 13.6543 12.1275C14.5005 10.9702 15 9.54344 15 8C15 4.13401 11.866 1 8 1C4.13401 1 1 4.13401 1 8C1 9.49852 1.47087 10.8871 2.27273 12.0257ZM2 8C2 4.68629 4.68629 2 8 2C11.3137 2 14 4.68629 14 8C14 9.32417 13.5722 10.5455 12.8471 11.5372C11.7539 13.0322 9.99004 14 8 14C7.81549 14 7.63318 13.9917 7.45339 13.9755C7.07854 13.9417 6.7141 13.8735 6.36307 13.7743C5.02457 13.3957 3.87379 12.5625 3.09034 11.45C2.40329 10.4743 2 9.28575 2 8Z"
                      fill="#576175"/>
              </svg>
              <p>Партнер попадет в ваш лист ожидания, из которого вы сможете позже выставить в бесконечную ячейку, либо
                использовать в других цепочках</p>
            </div>

          </div>
          <ChainsButton>
            <span>Купить за 40</span>
            <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd"
                    d="M7.08838 12.4279C7.69782 13.5452 9.30215 13.5452 9.91159 12.4279L13.6347 5.60218C14.2192 4.53069 13.4436 3.22428 12.2231 3.22428H4.77687C3.55635 3.22428 2.78082 4.53069 3.36526 5.60218L7.08838 12.4279ZM9.20578 12.0429L12.9289 5.2172C13.2211 4.68146 12.8334 4.02825 12.2231 4.02825H8.90197V12.3558C9.02376 12.2859 9.13011 12.1816 9.20578 12.0429ZM7.79418 12.0429C7.86985 12.1816 7.9762 12.2859 8.098 12.3558V4.02825H4.77687C4.16661 4.02825 3.77884 4.68146 4.07107 5.2172L7.79418 12.0429Z"
                    fill="#FFFFFF"/>
            </svg>
          </ChainsButton>
        </div>
      </div>
    </div>
    <CopyLink/>
  </div>
</template>

<script setup lang="ts">
import ModalHeader from "../../../ModalHeader/ModalHeader.vue";
import CopyLink from "../../../Views/Home/CopyLink/CopyLink.vue";
import SmallCell from "../../../SmallCell/SmallCell.vue";
import ChainsButton from "../../../UI/ChainsButton/ChainsButton.vue";
import Tabs from "../../../UI/Tabs/Tabs.vue";
import ExposeBonusItem from "./ExposeBonusItem/ExposeBonusItem.vue";
import { useStore } from "vuex";
import {
  reactive,
  ref,
  computed,
  Ref
} from "vue";
import { Ceils } from "../../../../interfaces/store.interface.ts";

const tabs = reactive([
  {
    id: 1,
    name: 'В ∞ ячейку',
  },
  {
    id: 2,
    name: 'В лист ожидания',
  },
]);

const isExposeTabs = ref(1)

const toggleExposeTabs = (id: number) => {
  isExposeTabs.value = id
}

const store = useStore()

const ceils: Ref<Ceils> = computed(() => store.state.viewLastOwn?.ceilsCollection?.['1'])

const firstCeil: Ref = computed(() => ceils.value?.['1'])
</script>

<style scoped>
@import "_mExposePartner.scss";
</style>