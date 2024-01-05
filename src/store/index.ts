import {
    ActionContext,
    createStore
} from "vuex";
import {
    ListOfTypes,
    Type,
    ViewLastOwn
} from "../interfaces/store.interface.ts";
import {
    getListOfTypes,
    getViewLastOwn,
} from "../api";

export default createStore({
    state: {
        selectedType: null as Type | null,
        listOfTypes: {} as ListOfTypes,
        viewLastOwn: null as ViewLastOwn | null
    },
    actions: {
        getListOfTypes({ commit }: ActionContext<any, any>, category = 'dream-ton') {
            getListOfTypes(category).then(response => commit('SET_LIST_OF_TYPES', response.data))
        },
        getViewLastOwn({ commit }: ActionContext<any, any>, matrixTypeOrId: string | number) {
            getViewLastOwn(matrixTypeOrId).then(response => commit('SET_VIEW_LAST_OWN', response.data))
        },
    },
    mutations: {
        SET_LIST_OF_TYPES(state: any, list: ListOfTypes) {
            state.listOfTypes = list
        },
        SET_VIEW_LAST_OWN(state: any, data: ViewLastOwn | null) {
            state.viewLastOwn = data
        },
        SET_SELECTED_TYPE(state: any, type: Type | undefined) {
            state.selectedType = type
        }
    },
});