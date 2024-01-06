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
import {
    getExpectationList,
    getListOfTypes, getPaymentForm,
    getViewLastOwn,
} from "../api";


export default createStore({
    state: {
        selectedType: {} as Type,
        listOfTypes: {} as ListOfTypes,
        viewLastOwn: {} as ViewLastOwn,
        expectationList: [],
        paymentForm: {},
    },
    actions: {
        getListOfTypes({ commit }: ActionContext<any, any>, category = 'dream-ton') {
            getListOfTypes(category).then(response => commit('SET_LIST_OF_TYPES', response.data))
        },
        getViewLastOwn({ commit }: ActionContext<any, any>, matrixTypeOrId: string | number) {
            getViewLastOwn(matrixTypeOrId).then(response => commit('SET_VIEW_LAST_OWN', response.data))
        },
        getExpectationList({ commit }: { commit: Commit }, matrixType: string) {
            getExpectationList(matrixType).then(response => {
                console.log('expectation list', response)
                commit('SET_EXPECTATION_LIST', response.data)
            })
        },
        getPaymentForm({ commit }: { commit: Commit }, matrixType: string) {
            getPaymentForm(matrixType).then(response => {
                console.log(response)
                commit('SET_PAYMENT_FORM', response.data.html)
            })
        }
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
        SET_EXPECTATION_LIST(state: any, list) {
            state.expectationList = list
        },
        SET_PAYMENT_FORM(state: any, form) {
            state.paymentForm = form
        }
    },
    getters: {

    }
});