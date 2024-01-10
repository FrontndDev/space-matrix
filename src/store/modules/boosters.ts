import * as API from '../../api/index'
import { IGetPendingBoostersParams } from "../../interfaces/partners.interface.ts";
import { Commit } from "vuex";

export default {
  namespaced: true,
  state() {
    return {
      boostersPending: [],
      pageIdBooster: 1
    }
  },
  actions: {
    getPendingBoosters(
      { commit, rootState, state }: { commit: Commit; rootState: any, state: any },
    ) {
      API.filterOfActivatedMatrix({
          matrixType: rootState.selectedType.type,
          matrixFilterUserId: window.UserData.id,
          matrixFilterPageId: state.pageIdBooster,
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