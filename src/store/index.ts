import {
    ActionContext,
    Commit,
    createStore
} from "vuex";

import {
    ListOfTypes,
    Type,
    IMatrix,
    IBuyBoosterParams
} from "../interfaces/store.interface.ts";

import * as API from '../api/index.ts'

import partners from "./modules/partners.ts";
import boosters from "./modules/boosters.ts";
import chains from "./modules/chains.ts";
import { useMyOverlay } from "../use/useMyOverlay.ts";

export default createStore({
    modules: {
        partners,
        boosters,
        chains
    },
    state: {
        selectedType: {} as Type,
        newTypeMatrix: null as string | null,
        listOfTypes: {} as ListOfTypes,
        matrixByType: {} as IMatrix,
        matrixById: {} as IMatrix,
        paymentForm: null as string | null
    },
    actions: {
        getListOfTypes({ commit }: { commit: Commit }, category = 'dream-ton') {
            const key = `/api/matrix/list-of-types/${category}`
            const data = API.getDataFromLS(key)
            if (data) commit('SET_LIST_OF_TYPES', data)

            API.getListOfTypes(category).then(response => {
                commit('SET_LIST_OF_TYPES', response.data)
                API.setDataToLS(key, response.data)
            })
        },
        getMatrixByType(ctx: ActionContext<any, any>, { matrixType, dropInfinityPartners = true }) {
            API.getMatrix(matrixType).then(response => {
                ctx.commit('SET_MATRIX_BY_TYPE', response.data)

                if (dropInfinityPartners) {
                    ctx.commit('partners/SET_INFINITY_PARTNERS', null)

                    if (response.data?.matrix?.id) {
                        ctx.dispatch('partners/getInfinityPartners', {
                            parentId: response.data.matrix.id
                        })
                    } else {
                        if (dropInfinityPartners) {
                            ctx.commit('partners/SET_INFINITY_PARTNERS', [])
                        }
                    }
                }
            })
        },
        async getMatrixById(ctx: ActionContext<any, any>, matrixId: number) {
            const response = await API.getMatrix(matrixId)

            ctx.commit('SET_MATRIX_BY_ID', response.data)
            if (response.data?.matrix?.id) {
                await ctx.dispatch('partners/getInfinityPartners', {
                    parentId: response.data.matrix.id,
                    isPartnerMatrix: true
                })
            }

            return response
        },
        getPaymentForm({ commit }: { commit: Commit }, matrixType: string) {
            commit('SET_PAYMENT_FORM', null)
            API.getPaymentForm(matrixType).then(response => {
                commit('SET_PAYMENT_FORM', response.data.html)
                useMyOverlay(response.data.html)
            })
        },
        buyBooster(_: ActionContext<any, any>, data: IBuyBoosterParams) {
            API.buyClone(data)
        }
    },
    mutations: {
        SET_LIST_OF_TYPES(state: any, list: ListOfTypes) {
            state.listOfTypes = list
        },
        SET_MATRIX_BY_TYPE(state: any, data: IMatrix) {
            state.matrixByType = data
        },
        SET_MATRIX_BY_ID(state: any, data: IMatrix) {
            state.matrixById = data
        },
        SET_SELECTED_TYPE(state: any, type: Type | undefined) {
            state.selectedType = type
        },
        SET_PAYMENT_FORM(state: any, form) {
            state.paymentForm = form
        },
        SET_NEW_TYPE_MATRIX(state: any, type: string) {
            state.newTypeMatrix = type
        }
    },
    getters: {}
});