import { getAsync, postAsync } from "./config.ts";


export function setDataToLS(key: string, data: any) {
    localStorage.setItem(key, JSON.stringify(data))
}

export function getDataFromLS(key: string) {
    const data: string | null = localStorage.getItem(key)

    return data && data !== 'undefined' ? JSON.parse(data) : null
}

/////////////////////

export async function getListOfTypes(category: string) {
    return getAsync(`/api/matrix/list-of-types/${category}`)
}

export async function getViewLastOwn(matrixTypeOrId: string | number) {
    return getAsync(`/api/matrix/${matrixTypeOrId}`)
}

export async function getExpectationList(matrixType: string) {
    return getAsync(`/api/matrix/get-raw-partners/${matrixType}`)
}

export async function filterOfActivatedMatrix(matrixType: string, matrixFilterUserId: number, matrixFilterPageId: number){
    return postAsync(`/api/matrix/get-clones/${matrixType}/${matrixFilterUserId}/${matrixFilterPageId}`,  {filter: {level: 1}})
}

export async function getPaymentForm(matrixType: string) {
    return getAsync(`/api/matrix/payment-form/${matrixType}`)
}

///////////////////////////////

