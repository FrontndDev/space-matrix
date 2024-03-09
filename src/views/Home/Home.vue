<template>
  <div class="home">
    <div class="container">
      <div class="home__content" :class="selectedTab.type">
        <MyHeader :buttons="buttons"/>

        <template v-if="selectedTab.type === TabsOfTypesEnum.default">
          <div
              class="home__cell"
              v-for="cell in 3"
              :key="cell"
          >
            <!--          <AddPartnerCell type="disable"/>-->
            <PartnerCell/>
          </div>
        </template>
        <template v-else-if="selectedTab.type === TabsOfTypesEnum.bonus">

        </template>
        <template v-else-if="selectedTab.type === TabsOfTypesEnum.auto">

        </template>

        <Indicator/>
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
import { IMyButton } from "@/components/UI/MyButton/MyButton.interface.ts";
import {
  computed,
  ComputedRef,
  reactive
} from "vue";
import { useRoute } from "vue-router";
import { TabsOfTypesEnum } from "@/enums/tabs-of-types.enum.ts";

const route = useRoute();

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
    disabled: true,
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
    disabled: true,
  }
]);

const selectedTab = computed(() => buttons.find(button => button.id === +route.params.id)) as ComputedRef<IMyButton>
</script>

<style scoped lang="scss">
@import "home";
</style>