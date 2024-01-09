import * as API from '../../api/index'
import {
  IExposePartnerParams,
  IGetPendingBoostersParams,
  IPartners,
  IPartnersList
} from "../../interfaces/partners.interface.ts";
import {
  ActionContext,
  Commit
} from "vuex";

export default {
  namespaced: true,
  state() {
    return {
      partnersExposed: {} as IPartners,
      partnersPending: {} as IPartners,
      littleTabID: 1 as number,
      bigTabID: 1 as number,
      infinityPartners: [] as IPartnersList[],
      countPendingBoosters: null,

      ////////Матрица партнёра
      partnersPendingSecond: {} as IPartners,
      infinityPartnersSecond: [] as IPartnersList[],
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
        commit('CHANGE_BIG_TAB', 1)
        commit('SET_EXPOSED_PARTNERS', response.data)
      })
    },

    getPendingPartners(
      { commit, rootState }: { commit: Commit; rootState: any },
      { matrixFilterUserId, matrixFilterPageId, isPartnerMatrix = false }: IGetPendingBoostersParams
    ) {
      API.filterOfActivatedMatrix({
          matrixType: rootState.selectedType.type,
          matrixFilterUserId,
          matrixFilterPageId,
          filter: { pending: 1 }
        }
      ).then(response => {
        console.log(response.data)
        if (!isPartnerMatrix) {
          commit('SET_PENDING_PARTNERS', response.data)
        } else {
          commit('SET_PENDING_PARTNERS_SECOND', response.data)
        }
      })
    },

    getInfinityPartners({ commit }: { commit: Commit }, parentId: number) {
      API.getListOfInfinity(parentId).then(response => {
        console.log('getInfinityPartners', response.data)
        commit('SET_INFINITY_PARTNERS', response.data.list)
      })
    },
    exposePartner(_: ActionContext<any, any>, data: IExposePartnerParams) {
      API.placementExistMatrix(data).then(response => {
        console.log('exposePartner', response)
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
    SET_PENDING_PARTNERS_SECOND(state: any, partnersPending: Object) {
      state.partnersPendingSecond = partnersPending
    },
    CHANGE_LITTLE_TAB(state: any, id: number) {
      state.littleTabID = id
    },
    CHANGE_BIG_TAB(state: any, id: number) {
      console.log(state)
      switch (id) {
        case 1:
          state.partnersPending.count === 0 ? state.littleTabID = 2 : state.littleTabID = 1
          break;
        case 2:
          state.countPendingBoosters === 0 ? state.littleTabID = 4 : state.littleTabID = 3
          break;
      }
    },
    SET_INFINITY_PARTNERS(state: any, infinityPartners: any) {
      state.infinityPartners = infinityPartners
    },
    SET_COUNT_PENDING_BOOSTERS(state: any, count: number) {
      state.countPendingBoosters = count
    },
  },
  getters: {}
}