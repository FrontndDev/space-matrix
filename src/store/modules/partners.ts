import * as API from '../../api/index'
import {
  IExposePartnerParams,
  IGetPendingBoostersParams,
  IInfinityPartnersParams,
  IPartners,
} from "../../interfaces/partners.interface.ts";
import {
  ActionContext,
  Commit
} from "vuex";
import { Matrix } from "../../interfaces/store.interface.ts";

export default {
  namespaced: true,
  state() {
    return {
      partnersExposed: {} as IPartners,
      partnersPending: {} as IPartners,
      littleTabID: 1 as number,
      bigTabID: 1 as number,
      infinityPartners: null as Matrix[] | null,
      countPendingBoosters: null,

      matrixFilterPageId: 1,

      // Матрица партнёра
      partnersPendingSecond: {} as IPartners,
      infinityPartnersSecond: [] as Matrix[],
    }
  },
  actions: {
    getExposedPartners(
      { commit, rootState, state }: { commit: Commit; rootState: any; state: any },
      { filter }: IGetPendingBoostersParams,
    ) {
      API.filterOfActivatedMatrix({
        matrixType: rootState.selectedType.type,
        matrixFilterPageId: state.matrixFilterPageId,
        matrixFilterUserId: window.UserData.id,
        filter: { level: filter }
      }
    ).then(response => {
        console.log(response.data)
        // commit('CHANGE_BIG_TAB', 1)
        commit('SET_EXPOSED_PARTNERS', response.data)
      })
    },

    getPendingPartners(
      { commit, rootState, state }: { commit: Commit; rootState: any; state: any },
      { isPartnerMatrix = false }: IGetPendingBoostersParams
    ) {
      API.filterOfActivatedMatrix({
          matrixType: rootState.selectedType.type,
          matrixFilterPageId: state.matrixFilterPageId,
          matrixFilterUserId: window.UserData.id,
          filter: { pending: 1 }
        }
      ).then(response => {
        if (response.data?.count === 0) commit('CHANGE_LITTLE_TAB', 2)

        if (!isPartnerMatrix) {
          commit('SET_PENDING_PARTNERS', response.data)
        } else {
          commit('SET_PENDING_PARTNERS_SECOND', response.data)
        }
      })
    },

    getInfinityPartners({ commit }: { commit: Commit }, { parentId, isPartnerMatrix = false }: IInfinityPartnersParams) {
      API.getListOfInfinity(parentId).then(response => {
        if (!isPartnerMatrix) {
          commit('SET_INFINITY_PARTNERS', response.data.list)
        } else {
          commit('SET_INFINITY_PARTNERS_SECOND', response.data.list)
        }
      })
    },
    exposePartner(_: ActionContext<any, any>, data: IExposePartnerParams) {
      API.placementExistMatrix(data)
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
    SET_INFINITY_PARTNERS_SECOND(state: any, infinityPartners: any) {
      state.infinityPartnersSecond = infinityPartners
    },
    SET_COUNT_PENDING_BOOSTERS(state: any, count: number) {
      state.countPendingBoosters = count
    },
  },
  getters: {}
}