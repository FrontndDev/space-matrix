import * as API from '../../api/index'
import { Commit } from "vuex";

export default {
  namespaced: true,
  state() {
    return {
      chainsList: [],
      pageIdChains: 1
    }
  },
  actions: {
    getChainsList(
      { commit, state }: { commit: Commit; state: any },
    ) {
      // API.filterOfActivatedMatrix({
      //     matrixType: rootState.newTypeMatrix ? rootState.newTypeMatrix : rootState.selectedType.type,
      //     //@ts-ignore
      //     matrixFilterUserId: window.UserData.id,
      //     matrixFilterPageId: state.pageIdBooster,
      //     filter: { pending: 1, is_booster: true }
      //   }
      // ).then(response => {
      //   console.log(response.data)
      //   commit('SET_PENDING_BOOSTERS', response.data)
      //   commit('partners/SET_COUNT_PENDING_BOOSTERS', response.data?.count, { root: true })
      // })

      API.getListOfChains(state.pageIdChains).then(response => {
        commit('SET_CHAINS_LIST', response.data)
      })

    },

  },
  mutations: {
    SET_CHAINS_LIST(state: any, chainsList: any) {
      state.chainsList = chainsList
    },
  },
}