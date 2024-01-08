import * as API from '../../api/index'
import {
  IGetPendingBoostersParams,
  IPartners
} from "../../interfaces/partners.interface.ts";
import { Commit } from "vuex";

export default {
  namespaced: true,
  state() {
    return {
      partnersExposed: {} as IPartners,
      partnersPending: {} as IPartners,
      pagePartnerID: 1 as number,
      infinityPartners: [],
    }
  },
  actions: {
    getExposedPartners(
      { commit, rootState }: { commit: Commit; rootState: any },
      { matrixFilterUserId, matrixFilterPageId, filter }: IGetPendingBoostersParams,
    ) {
      API.filterOfActivatedMatrix({
        matrixType: rootState.selectedType.type,
        matrixFilterUserId,
        matrixFilterPageId,
        filter: { level: filter }
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

    getInfinityPartners({ commit }: any, parentId: number) {
      API.getListOfInfinity(parentId).then(response => {
        console.log('getInfinityPartners', response.data)
        commit('SET_INFINITY_PARTNERS', response.data)
      })
    }
  },
  mutations: {
    SET_EXPOSED_PARTNERS(state: any, partnersExposed: Object) {
      state.partnersExposed = partnersExposed
    },
    SET_PENDING_PARTNERS(state: any, partnersPending: Object) {
      state.partnersPending = partnersPending
    },
    CHANGE_PAGE_PARTNER(state: any, id: number) {
      state.pagePartnerID = id
    },
    SET_INFINITY_PARTNERS(state: any, infinityPartners) {
      state.infinityPartners = infinityPartners
    }
  },
  getters: {}
}