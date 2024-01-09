import * as API from '../../api/index'
import { IGetPendingBoostersParams } from "../../interfaces/partners.interface.ts";
import { Commit } from "vuex";

export default {
  namespaced: true,
  state() {
    return {
      boostersPending: []
    }
  },
  actions: {
    getPendingBoosters(
      { commit, rootState }: { commit: Commit; rootState: any },
      { matrixFilterUserId, matrixFilterPageId }: IGetPendingBoostersParams
    ) {
      API.filterOfActivatedMatrix({
          matrixType: rootState.selectedType.type,
          matrixFilterUserId,
          matrixFilterPageId,
          filter: { pending: 1, is_booster: true }
        }
      ).then(response => {
        console.log(response.data)
        commit('SET_PENDING_BOOSTERS', response.data)
        commit('partners/SET_COUNT_PENDING_BOOSTERS', response.data?.count, { root: true })
      })
    },
  },
  mutations: {
    SET_PENDING_BOOSTERS(state: any, boostersPending: any) {
      state.boostersPending = boostersPending
    }
  },
}