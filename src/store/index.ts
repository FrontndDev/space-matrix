import {
    ActionContext,
    Commit,
    createStore
} from "vuex";

import {
    ListOfTypes,
    Type,
    ViewLastOwn
} from "../interfaces/store.interface.ts";

import * as API from '../api/index.ts'

import partners from "./modules/partners.ts";
import boosters from "./modules/boosters.ts";

export default createStore({
    modules: {
        partners,
        boosters
    },
    state: {
        selectedType: {} as Type,
        listOfTypes: {} as ListOfTypes,
        viewLastOwn: {} as ViewLastOwn,
        paymentForm: {}
    },
    actions: {
        getListOfTypes({ commit }: ActionContext<any, any>, category = 'dream-ton') {
            const key = `/api/matrix/list-of-types/${category}`
            const data = API.getDataFromLS(key)
            if (data) commit('SET_LIST_OF_TYPES', data)

            API.getListOfTypes(category).then(response => {
                commit('SET_LIST_OF_TYPES', response.data)
                API.setDataToLS(key, response.data)
            })
        },
        getViewLastOwn({ commit }: ActionContext<any, any>, matrixTypeOrId: string | number) {
            API.getViewLastOwn(matrixTypeOrId).then(response => {
                console.log('response.data', response.data)
                commit('SET_VIEW_LAST_OWN', response.data)
            })
        },
        getPaymentForm({ commit }: { commit: Commit }, matrixType: string) {
            API.getPaymentForm(matrixType).then(response => {
                commit('SET_PAYMENT_FORM', response.data.html)
                // @ts-ignore
                // MY_OVERLAY.active(response.data.html, () => {
                //     console.log('callback1')
                // }, () => {
                //     console.log('callback2')
                // })
            })
        },
    },
    mutations: {
        SET_LIST_OF_TYPES(state: any, list: ListOfTypes) {
            state.listOfTypes = list
        },
        SET_VIEW_LAST_OWN(state: any, data: ViewLastOwn) {
            state.viewLastOwn = data
        },
        SET_SELECTED_TYPE(state: any, type: Type | undefined) {
            state.selectedType = type
        },
        SET_PAYMENT_FORM(state: any, form) {
            state.paymentForm = form
        },
    },
    getters: {}
});