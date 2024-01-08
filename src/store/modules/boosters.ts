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
      })
    },
  },
  mutations: {
    SET_PENDING_BOOSTERS(state: any, boostersPending: any) {
      state.boostersPending = boostersPending
    },
    CHANGE_PAGE_BOOSTER(state: any, id: number) {
      state.pagePartnerID = id
    }
  },
  getters: {}
}