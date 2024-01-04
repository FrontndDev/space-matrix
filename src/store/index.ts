import {
    ActionContext,
    createStore
} from "vuex";
import * as API from '../api'
import ListOfTypes from "../interfaces/store.interface.ts";

export default createStore({
    state: {
        listOfTypes: {
            types: [],
            opened: [],
        },
    },
    actions: {
        getListOfTypes({ commit }: ActionContext<any, any>, category = 'dream-ton') {
            API.getListOfTypes(category).then(response => commit('SET_LIST_OF_TYPES', response.data))
        }
    },
    mutations: {
        SET_LIST_OF_TYPES(state: any, list: { types: ListOfTypes[], opened: string[] }) {
            state.listOfTypes = list
        }
    },
});