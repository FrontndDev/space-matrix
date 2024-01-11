import * as API from '../../api/index'
import { Commit } from "vuex";

export default {
  namespaced: true,
  state() {
    return {
      boostersPending: [],
      boostersExposed: [],
      pageIdBooster: 1,
      levelID: 0 as number
    }
  },
  actions: {
    getPendingBoosters(
      { commit, rootState, state }: { commit: Commit; rootState: any, state: any },
    ) {
      API.filterOfActivatedMatrix({
          matrixType: rootState.newTypeMatrix ? rootState.newTypeMatrix : rootState.selectedType.type,
          //@ts-ignore
          matrixFilterUserId: window.UserData.id,
          matrixFilterPageId: state.pageIdBooster,
          filter: { pending: 1, is_booster: true }
        }
      ).then(response => {
        if (response.data?.count === 0 && rootState.partners.bigTabID === 2) commit('partners/CHANGE_LITTLE_TAB', 4, { root: true })
        console.log(response.data)
        commit('SET_PENDING_BOOSTERS', response.data)
        commit('partners/SET_COUNT_PENDING_BOOSTERS', response.data?.count, { root: true })
      })
    },
    getExposedBoosters(
      { commit, rootState, state }: { commit: Commit; rootState: any, state: any }
    ) {
      API.filterOfActivatedMatrix({
          matrixType: rootState.newTypeMatrix ? rootState.newTypeMatrix : rootState.selectedType.type,
          //@ts-ignore
          matrixFilterUserId: window.UserData.id,
          matrixFilterPageId: state.pageIdBooster,
          filter: { is_booster: true }
        }
      ).then(response => {
        commit('SET_EXPOSED_BOOSTERS', response.data)
      })
    },
  },
  mutations: {
    SET_PENDING_BOOSTERS(state: any, boostersPending: any) {
      state.boostersPending = boostersPending
    },
    SET_EXPOSED_BOOSTERS(state: any, boostersExposed: any) {
      state.boostersExposed = boostersExposed
    }
  },
}