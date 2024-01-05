<template>
  <div class="endless">
    <h3>Бесконечные</h3>

    <div class="endless__menu endless__menu_mt-16">
      <AddPartnerCell
          type="infinity"
      />
<!--      v-if="!ceils['3']?.matrix"-->
      <InfinityPartnerCard
          @open-m-infinity-cell="emit('open-m-infinity-cell')"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import AddPartnerCell from "../../../AddPartnerCell/AddPartnerCell.vue";
import InfinityPartnerCard from "../../../InfinityPartnerCard/InfinityPartnerCard.vue";
import { useStore } from "vuex";
import {
  computed,
  Ref
} from "vue";
import { Ceils } from "../../../../interfaces/store.interface.ts";

const emit = defineEmits(['open-m-infinity-cell'])

const store = useStore()

const ceils: Ref<Ceils> = computed(() => store.state.viewLastOwn?.ceilsCollection['1'])
</script>

<style scoped lang="scss">
@import "endless";
</style>