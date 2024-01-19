import * as API from '../../api/index'
import { Commit } from "vuex";
import {
  IChainDetails,
  IChainsList
} from "../../interfaces/chains.interface.ts";

export default {
  namespaced: true,
  state() {
    return {
      chainsList: {} as IChainsList,
      teleportList: {} as IChainsList,
      chainDetails: {} as IChainDetails,
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
    getTeleportList(
        { commit, state }: { commit: Commit; state: any }
    ) {
      API.getListOfPartnersForTeleport(state.pageIdChains).then(response => {
        commit('SET_TELEPORT_LIST', response.data)
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
    SET_TELEPORT_LIST(state: any, teleportList: any) {
      state.teleportList = teleportList
    },
    SET_CHAIN_DETAIL(state: any, chainDetails: any) {
      state.chainDetails = chainDetails
    },
    SET_PAGE_ID_CHAINS(state: any, pageIdChains: number) {
      state.pageIdChains = pageIdChains
    }
  },
}