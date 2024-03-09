<template>
  <div class="home">
    <div class="container">
      <div class="home__body">
        <div class="home__content" :class="selectedTab?.type">
          <MyHeader :buttons="buttons"/>

          <template v-if="selectedTab?.type === TabsOfTypesEnum.default">
            <div
                class="home__cell"
                :class="selectedTab?.type"
                v-for="cell in 3"
                :key="cell"
            >
              <AddPartnerCell state="disable"/>
              <!--            <PartnerCell/>-->
              <SmallPartnerCells type="block"/>
            </div>
            <CopyLink/>
          </template>
          <template v-else-if="selectedTab?.type === TabsOfTypesEnum.bonus">
            <div></div>
          </template>
          <template v-if="selectedTab?.type === TabsOfTypesEnum.auto">
            <div
                class="home__cell"
                :class="selectedTab?.type"
                v-for="cell in 3"
                :key="cell"
            >
              <!--          <AddPartnerCell type="disable"/>-->
              <PartnerCell/>
            </div>
            <Indicator/>
          </template>
        </div>
        <div class="home__partners">
          <InfoHeader
              :infoHeader="isCells"
          />
          <PartnerCells/>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import DefaultIcon from '@/assets/svg/HeaderButton/default.svg?component';
import BonusIcon from '@/assets/svg/HeaderButton/bonus.svg?component';
import AutoIcon from '@/assets/svg/HeaderButton/auto.svg?component';

import MyHeader from "@/components/Views/Home/MyHeader/MyHeader.vue";
import Indicator from "@/components/Views/Home/Indicator/Indicator.vue";
import PartnerCell from "@/components/PartnerCell/PartnerCell.vue";
import AddPartnerCell from "@/components/AddPartnerCell/AddPartnerCell.vue";
import { IMyButton } from "@/components/UI/MyButton/MyButton.interface.ts";
import {
  computed,
  ComputedRef,
  reactive,
  ref
} from "vue";
import { useRoute } from "vue-router";
import { TabsOfTypesEnum } from "@/enums/tabs-of-types.enum.ts";
import SmallPartnerCells from "@/components/SmallPartnerCells/SmallPartnerCells.vue";
import CopyLink from "@/components/CopyLink/CopyLink.vue";
import InfoHeader from "@/components/InfoHeader/InfoHeader.vue";
import PartnerCells from "@/components/PartnerCells/PartnerCells.vue";

const route = useRoute();

const isCells = ref(1)

const buttons: IMyButton[] = reactive([
  {
    id: 1,
    name: 'A1',
    type: TabsOfTypesEnum.default,
    icon: DefaultIcon,
  },
  {
    id: 2,
    name: 'A2',
    type: TabsOfTypesEnum.default,
    icon: DefaultIcon,
    price: 500,
  },
  {
    id: 3,
    name: 'Line Bonus',
    type: TabsOfTypesEnum.bonus,
    icon: BonusIcon,
  },
  {
    id: 4,
    name: 'Time Bonus',
    type: TabsOfTypesEnum.bonus,
    icon: BonusIcon,
    disabled: true,
  },
  {
    id: 5,
    name: 'Автобонус',
    type: TabsOfTypesEnum.auto,
    icon: AutoIcon,
  }
]);

const selectedTab = computed(() => buttons.find(button => button.id === +route.params.id)) as ComputedRef<IMyButton>
</script>

<style scoped lang="scss">
@import "home";
</style>