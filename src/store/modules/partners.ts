import * as API from '../../api/index'
import { IGetPendingBoostersParams } from "../../interfaces/partners.interface.ts";
import { Commit } from "vuex";

export default {
  namespaced: true,
  state() {
    return {
      partnersExposed: [],
      partnersPending: [],
      pagePartnerID: 1,
    }
  },
  actions: {
    getExposedPartners(
      { commit, rootState }: { commit: Commit; rootState: any },
      { matrixFilterUserId, matrixFilterPageId }: IGetPendingBoostersParams
    ) {
      API.filterOfActivatedMatrix({
        matrixType: rootState.selectedType.type,
        matrixFilterUserId,
        matrixFilterPageId,
        filter: { level: 0 }
      }
    ).then(response => {
        console.log(response.data)
        commit('SET_EXPOSED_PARTNERS', response.data)
      })
    },

    getPendingPartners(
      { commit, rootState }: { commit: Commit; rootState: any },
      { matrixFilterUserId, matrixFilterPageId }: IGetPendingBoostersParams
    ) {
      API.filterOfActivatedMatrix({
          matrixType: rootState.selectedType.type,
          matrixFilterUserId,
          matrixFilterPageId,
          filter: { pending: 1 }
        }
      ).then(response => {
        console.log(response.data)
        commit('SET_PENDING_PARTNERS', response.data)
      })
    },

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
    SET_EXPOSED_PARTNERS(state: any, partnersExposed: Object) {
      state.partnersExposed = partnersExposed
    },
    SET_PENDING_PARTNERS(state: any, partnersPending: Object) {
      state.partnersPending = partnersPending
    },
    SET_PENDING_BOOSTERS(state: any, boostersPending: Object) {
      state.boostersPending = boostersPending
    },
    CHANGE_PAGE_PARTNER(state: any, id: number) {
      state.pagePartnerID = id
    }
  },
  getters: {}
}