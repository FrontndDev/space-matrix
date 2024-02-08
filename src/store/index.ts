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
} from "@/interfaces/store.interface";

import * as API from '@/api/index'

import partners from "./modules/partners";
import boosters from "./modules/boosters";
import chains from "./modules/chains";
import { useMyOverlay } from "@/composables/useMyOverlay";
import { useShowMessage } from "@/composables/useShowMessage";
import axios from "axios";
import store from "@/store/index.ts";

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
        littleTabID: 1 as number,
        bigTabID: 1 as number,

        secondsForGetMatrixByType: 0,
        iterationForGetMatrixByType: 0,
        intervalForGetMatrixByType: null as number | null,
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
        async getMatrixByType(ctx: ActionContext<any, any>, matrixType: string) {
            ctx.commit('CLEAR_OPTIONS_FOR_GET_MATRIX_BY_TYPE', true)

            if (requestMatrixByType) {
                requestMatrixByType.cancel();
                ctx.commit('CLEAR_OPTIONS_FOR_GET_MATRIX_BY_TYPE')
            }
            requestMatrixByType = axios.CancelToken.source()
            if (matrixType) {
                return await API.getMatrix(matrixType, { cancelTokenSource: requestMatrixByType }).then(response => {
                    if (response?.data) {
                        ctx.commit('SET_LIST_OF_TYPES', response.data.tabs)
                        delete response.data.tabs
                        ctx.commit('SET_MATRIX_BY_TYPE', response.data)
                        ctx.commit('CLEAR_OPTIONS_FOR_GET_MATRIX_BY_TYPE')
                        return response
                    } else {
                        ctx.commit('SET_INTERVAL_FOR_GET_MATRIX_TYPE', matrixType)
                    }
                })
            }
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
            state.balance = wallets
        },
        CHANGE_LITTLE_TAB(state, id: number) {
            state.littleTabID = id
        },
        CHANGE_BIG_TAB(state: any, id: number) {
            state.bigTabID = id
        },

        CLEAR_OPTIONS_FOR_GET_MATRIX_BY_TYPE(state, withoutIteration = false) {
            if (!withoutIteration) {
                state.iterationForGetMatrixByType = 0
            }
            if (state.intervalForGetMatrixByType) {
                clearInterval(state.intervalForGetMatrixByType)
            }
            state.secondsForGetMatrixByType = 0
        },
        SET_SECONDS(state) {
            // Присваиваем в переменную кол-во секунд в зависимости от итерации
            switch (state.iterationForGetMatrixByType) {
                case 0:
                    state.secondsForGetMatrixByType = 1
                    break;
                case 1:
                    state.secondsForGetMatrixByType = 5
                    break;
                case 2:
                    state.secondsForGetMatrixByType = 10
                    break;
                default:
                    state.secondsForGetMatrixByType = 30
                    break;
            }
        },
        SET_INTERVAL_FOR_GET_MATRIX_TYPE(state, matrixType: string) {
            store.commit('SET_SECONDS')
            state.intervalForGetMatrixByType = setInterval(async () => {
                state.secondsForGetMatrixByType--

                if (!state.secondsForGetMatrixByType) {
                    if (state.intervalForGetMatrixByType) {
                        state.iterationForGetMatrixByType++
                        clearInterval(state.intervalForGetMatrixByType)
                    }

                    await store.dispatch('getMatrixByType', matrixType)
                }
            }, 1000)
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