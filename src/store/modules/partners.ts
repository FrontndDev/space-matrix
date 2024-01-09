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
            ////////Моя матрица
            partnersExposed: {} as IPartners,
            partnersPending: {} as IPartners,
            pagePartnerID: 1 as number,
            pageTabID: 1 as number,
            infinityPartners: [] as IPartnersList[],

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
                    commit('SET_PARTNER_PARTNERS_UNDER_PENDING', response.data)
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
        }
    },
    mutations: {
        SET_EXPOSED_PARTNERS(state: any, partnersExposed: Object) {
            state.partnersExposed = partnersExposed
        },
        SET_PENDING_PARTNERS(state: any, partnersPending: Object) {
            state.partnersPending = partnersPending
        },
        SET_PARTNER_PARTNERS_UNDER_PENDING(state: any, partnersPending: Object) {
            state.partnersPendingSecond = partnersPending
        },
        CHANGE_PAGE_PARTNER(state: any, id: number) {
            state.pagePartnerID = id
        },
        CHANGE_PAGE_TAB(state: any, id: number) {
            state.pageTabID = id
        },
        SET_INFINITY_PARTNERS(state: any, infinityPartners: any) {
            state.infinityPartners = infinityPartners
        }
    },
    getters: {}
}