import * as API from '@/api/index'
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
      { changeTab = false, filter }: any = {}
    ) {
      state.levelID = filter

      API.filterOfActivatedMatrix({
          matrixType: rootState.newTypeMatrix ? rootState.newTypeMatrix : rootState.selectedType.type,
          //@ts-ignore
          matrixFilterUserId: window.UserData.id,
          matrixFilterPageId: state.pageIdBooster,
          filter: { pending: 1, is_booster: true, level: filter }
        }
      ).then(response => {
        if (response.data?.totalCount === 0 && rootState.partners.bigTabID === 2 && changeTab) {
          commit('partners/CHANGE_LITTLE_TAB', 4, { root: true })
        }

        commit('SET_PENDING_BOOSTERS', response.data)
        commit('partners/SET_COUNT_PENDING_BOOSTERS', response.data?.totalCount, { root: true })
      })
    },
    getExposedBoosters(
      { commit, rootState, state }: { commit: Commit; rootState: any, state: any },
      { changeTab = false, filter }: any = {}
    ) {
      state.levelID = filter

      API.filterOfActivatedMatrix({
          matrixType: rootState.newTypeMatrix ? rootState.newTypeMatrix : rootState.selectedType.type,
          //@ts-ignore
          matrixFilterUserId: window.UserData.id,
          matrixFilterPageId: state.pageIdBooster,
          filter: { is_booster: true, level: filter }
        }
      ).then(response => {
        if (response.data?.totalCount === 0 && rootState.partners.bigTabID === 2 && changeTab) {
          commit('partners/CHANGE_LITTLE_TAB', 3, { root: true })
        }

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
    },
    SET_PAGE_ID_BOOSTERS(state: any, pageIdBooster: any) {
      state.pageIdBooster = pageIdBooster
    }
  },
}