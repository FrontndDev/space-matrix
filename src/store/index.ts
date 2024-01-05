import {
    ActionContext,
    createStore
} from "vuex";
import {
    ListOfTypes,
    ViewLastOwn
} from "../interfaces/store.interface.ts";
import {
    getListOfTypes,
    getViewLastOwn,
} from "../api";

export default createStore({
    state: {
        listOfTypes: {
            "types": [
                {
                    "currency": "TON",
                    "price": 10,
                    "category": "dream-ton",
                    "type": "dream-ton_1",
                    "title": "D1",
                    "required": false,
                    "depth": 1,
                    "pow": 3,
                    "allowBoosters": true,
                    "showLegend": true,
                    "infinityPos": 3
                },
                {
                    "currency": "TON",
                    "price": 20,
                    "category": "dream-ton",
                    "type": "dream-ton_2",
                    "title": "D2",
                    "required": false,
                    "depth": 1,
                    "pow": 3,
                    "allowBoosters": true,
                    "showLegend": true,
                    "infinityPos": 3
                },
                {
                    "currency": "TON",
                    "price": 40,
                    "category": "dream-ton",
                    "type": "dream-ton_3",
                    "title": "D3",
                    "required": false,
                    "depth": 1,
                    "pow": 3,
                    "allowBoosters": true,
                    "showLegend": true,
                    "infinityPos": 3
                },
                {
                    "currency": "TON",
                    "price": 80,
                    "category": "dream-ton",
                    "type": "dream-ton_4",
                    "title": "D4",
                    "required": false,
                    "depth": 1,
                    "pow": 3,
                    "allowBoosters": true,
                    "showLegend": true,
                    "infinityPos": 3
                },
                {
                    "currency": "TON",
                    "price": 160,
                    "category": "dream-ton",
                    "type": "dream-ton_5",
                    "title": "D5",
                    "required": false,
                    "depth": 1,
                    "pow": 3,
                    "allowBoosters": true,
                    "showLegend": true,
                    "infinityPos": 3
                },
                {
                    "currency": "TON",
                    "price": 320,
                    "category": "dream-ton",
                    "type": "dream-ton_6",
                    "title": "D6",
                    "required": false,
                    "depth": 1,
                    "pow": 3,
                    "allowBoosters": true,
                    "showLegend": true,
                    "infinityPos": 3
                },
                {
                    "currency": "TON",
                    "price": 490,
                    "category": "dream-ton",
                    "type": "dream-ton_7",
                    "title": "D7",
                    "required": false,
                    "depth": 1,
                    "pow": 3,
                    "allowBoosters": true,
                    "showLegend": true,
                    "infinityPos": 3
                },
                {
                    "currency": "TON",
                    "price": 880,
                    "category": "dream-ton",
                    "type": "dream-ton_8",
                    "title": "D8",
                    "required": false,
                    "depth": 1,
                    "pow": 3,
                    "allowBoosters": true,
                    "showLegend": true,
                    "infinityPos": 3
                },
                {
                    "currency": "TON",
                    "price": 1760,
                    "category": "dream-ton",
                    "type": "dream-ton_9",
                    "title": "D9",
                    "required": false,
                    "depth": 1,
                    "pow": 1,
                    "allowBoosters": true,
                    "showLegend": true,
                    "infinityPos": 1
                }
            ],
            "opened": [
                "dream-ton_1",
                "dream-ton_9"
            ]
        } as ListOfTypes,
        viewLastOwn: {
            "matrix": {
                "id": 13,
                "owner": {
                    "id": 4,
                    "fio": "Петя Иванов",
                    "photo": "https://dev.halk.ai/images/users/4/4.jpg._ct.jpg?1647433884",
                    "photoHash": "https://dev.halk.ai/images/users/h/1/21/421/3f0fe0cbc2dc6916799688a1fa77f64d.jpg"
                },
                "parent_matrix_id": null,
                "filled": false,
                "prev_type_matrix_id": null,
                "is_bonus": true,
                "is_booster": false,
                "number": 0,
                "binstatus": [
                    {
                        "1": 1
                    },
                    {
                        "1": 0,
                        "2": 0,
                        "3": 0
                    }
                ]
            },
            "matrixConfig": {
                "currency": "USD",
                "price": 10,
                "category": "x8",
                "type": "x8_10",
                "title": "M-1",
                "required": true,
                "depth": 1,
                "pow": 3,
                "allowBoosters": false,
                "showLegend": false,
                "infinityPos": null
            },
            "ceilsCollection": {
                "1": {
                    "1": {
                        "depth": 1,
                        "pos": 1,
                        "allowBuyClone": false,
                        "allowBuyBoost": false,
                        "fillRevard": [
                            {
                                "event": "clone",
                                "value": {
                                    "type": "x8_10",
                                    "count": 1
                                }
                            }
                        ],
                        "isInfinity": false
                    },
                    "2": {
                        "depth": 1,
                        "pos": 2,
                        "allowBuyClone": false,
                        "allowBuyBoost": false,
                        "fillRevard": [
                            {
                                "event": "cashout",
                                "value": "$10"
                            }
                        ],
                        "isInfinity": false
                    },
                    "3": {
                        "depth": 1,
                        "pos": 3,
                        "allowBuyClone": false,
                        "allowBuyBoost": false,
                        "fillRevard": [
                            {
                                "event": "freeze",
                                "value": "$10"
                            }
                        ],
                        "isInfinity": false
                    }
                }
            }
        } as ViewLastOwn
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
        SET_VIEW_LAST_OWN(state: any, data: ViewLastOwn) {
            state.viewLastOwn = data
        },
    },
});