import * as API from '../../api/index'

export default {
  namespaced: true,
  state() {
    return {
      exposedPartners: [],
      pendingPartners: [],
      pagePartnerID: 1,
      pendingBoosters: []
    }
  },
  actions: {
    getExposedPartners({ commit, rootState }: any, data) {
      const { matrixFilterUserId, matrixFilterPageId } = { ...data }
      API.filterOfActivatedMatrix({
        matrixType: rootState.selectedType.type,
        matrixFilterUserId: data.matrixFilterUserId,
        matrixFilterPageId: data.matrixFilterPageId,
        filter: { level: 0 }
      }
    ).then(response => {
        console.log(response.data)
        commit('SET_EXPOSED_PARTNERS', response.data)
      })
    },
    getPendingPartners({ commit, rootState }: any, data) {
      const { matrixFilterUserId, matrixFilterPageId } = { ...data }
      API.filterOfActivatedMatrix({
          matrixType: rootState.selectedType.type,
          matrixFilterUserId: data.matrixFilterUserId,
          matrixFilterPageId: data.matrixFilterPageId,
          filter: { pending: 1 }
        }
      ).then(response => {
        console.log(response.data)
        commit('SET_PENDING_PARTNERS', response.data)
      })
    },
    getPendingBoosters({ commit, rootState }: any, data) {
      const { matrixFilterUserId, matrixFilterPageId } = { ...data }
      API.filterOfActivatedMatrix({
          matrixType: rootState.selectedType.type,
          matrixFilterUserId: data.matrixFilterUserId,
          matrixFilterPageId: data.matrixFilterPageId,
          filter: { pending: 1, is_booster: true }
        }
      ).then(response => {
        console.log(response.data)
        commit('SET_PENDING_BOOSTERS', response.data)
      })
    },
  },
  mutations: {
    SET_EXPOSED_PARTNERS(state: any, exposedPartners) {
      state.exposedPartners = exposedPartners
    },
    SET_PENDING_PARTNERS(state: any, pendingPartners) {
      state.pendingPartners = pendingPartners
    },
    SET_PENDING_BOOSTERS(state: any, pendingBoosters) {
      state.pendingBoosters = pendingBoosters
    },
    CHANGE_PAGE_PARTNER(state: any, id: number) {
      state.pagePartnerID = id
    }
  },
  getters: {

  }
}