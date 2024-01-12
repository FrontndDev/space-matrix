import * as API from '../../api/index'
import { Commit } from "vuex";

export default {
  namespaced: true,
  state() {
    return {
      chainsList: [],
      chainDetails: [],
      pageIdChains: 1
    }
  },
  actions: {
    getChainsList(
      { commit, state }: { commit: Commit; state: any },
    ) {
      API.getListOfChains(state.pageIdChains).then(response => {
        commit('SET_CHAINS_LIST', response.data)
      })
    },
    getChainDetail(
      { commit }: { commit: Commit; state: any },
      id: number
    ) {
      API.getChainDetail(id).then(response => {
        commit('SET_CHAIN_DETAIL', response.data)
      })
    }

  },
  mutations: {
    SET_CHAINS_LIST(state: any, chainsList: any) {
      state.chainsList = chainsList
    },
    SET_CHAIN_DETAIL(state: any, chainDetails: any) {
      state.chainDetails = chainDetails
    },
  },
}