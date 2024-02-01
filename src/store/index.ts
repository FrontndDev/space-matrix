import {
    ActionContext,
    Commit,
    createStore
} from "vuex";

import {
    IBalance,
    IBuyBoosterParams,
    IMatrix,
    ListOfTypes,
    Type
} from "../interfaces/store.interface.ts";

import * as API from '../api/index.ts'

import partners from "./modules/partners.ts";
import boosters from "./modules/boosters.ts";
import chains from "./modules/chains.ts";
import { useMyOverlay } from "../composables/useMyOverlay.ts";
import { useShowMessage } from "../composables/useShowMessage.ts";
import axios from "axios";

let requestMatrixByType: any = null;

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
        paymentForm: null as string | null,
        balance: {} as IBalance,
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
        getMatrixByType(ctx: ActionContext<any, any>, matrixType: string) {
            console.log('requestMatrixByType', requestMatrixByType)
            if (requestMatrixByType) {
                requestMatrixByType.cancel();
            }
            requestMatrixByType = axios.CancelToken.source()
            API.getMatrix(matrixType, { cancelTokenSource: requestMatrixByType }).then(response => {
                if (response?.data) {
                    ctx.commit('SET_LIST_OF_TYPES', response.data.tabs)
                    delete response.data.tabs
                    ctx.commit('SET_MATRIX_BY_TYPE', response.data)
                }
            })
        },
        async getMatrixById(ctx: ActionContext<any, any>, matrixId: number) {
            const response = await API.getMatrix(matrixId)
            delete response.data.tabs
            ctx.commit('SET_MATRIX_BY_ID', response.data)

            return response
        },
        getPaymentForm({ commit }: { commit: Commit }, matrixType: string) {
            commit('SET_PAYMENT_FORM', null)
            API.getPaymentForm(matrixType).then(response => {
                commit('SET_PAYMENT_FORM', response.data.html)
                useMyOverlay(response.data.html)
            })
        },
        async buyBooster(_: ActionContext<any, any>, data: IBuyBoosterParams) {
            const notificationText = data?.notificationText
            delete data.notificationText
            const response = await API.buyClone(data)
            if (response?.error_code === undefined) {
                useShowMessage('green', notificationText ?? 'Буст успешно отправлен на активацию')
            }

            return response
        },
        async getWallets({ commit }: { commit: Commit }) {
            const response = await API.getBalance()
            commit('SET_WALLETS', response.data)

            return response
        },
        switchTeleport(_: ActionContext<any, any>, enable: boolean) {
            API.switchTeleport(enable).then(response => {
                console.log('switchTeleport', response)
            })
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
        },
        SET_WALLETS(state: any, wallets: IBalance) {
            console.log('wallets', wallets)
            state.balance = wallets
        }
    },
    getters: {
        onlyInfinityCell(state) {
            const objCells = state.matrixByType?.ceilsCollection?.['1']
            const cells = objCells ? Object.values(objCells) : []
            return cells.length === 1 && cells[0]?.isInfinity
        }
    }
});