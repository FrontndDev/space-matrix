import * as API from '../../api/index'

export default {
  namespaced: true,
  state() {
    return {
      partners: [],
      pagePartnerID: 1
    }
  },
  actions: {
    getPartners({ commit, rootState }: any, { ...data }) {
      API.filterOfActivatedMatrix(rootState.selectedType.type, data.matrixFilterUserId, data.matrixFilterPageId).then(response => {
        commit('SET_PARTNERS', response.data)
      })
    }
  },
  mutations: {
    SET_PARTNERS(state: any, partners) {
      state.partners = partners
    },
    CHANGE_PAGE_PARTNER(state: any, id: number) {
      state.pagePartnerID = id
    }
  },
  getters: {

  }
}