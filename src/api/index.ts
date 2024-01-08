import { getAsync, postAsync } from "./config.ts";


export function setDataToLS(key: string, data: any) {
  localStorage.setItem(key, JSON.stringify(data))
}

export function getDataFromLS(key: string) {
  const data: string | null = localStorage.getItem(key)

  return data && data !== 'undefined' ? JSON.parse(data) : null
}

// GET

export async function getListOfTypes(category: string) {
  return getAsync(`/api/matrix/list-of-types/${category}`)
}

export async function getViewLastOwn(matrixTypeOrId: string | number) {
  return getAsync(`/api/matrix/${matrixTypeOrId}`)
}

export async function getPaymentForm(matrixType: string) {
  return getAsync(`/api/matrix/payment-form/${matrixType}`)
}

// POST

export async function filterOfActivatedMatrix({ matrixType, matrixFilterUserId, matrixFilterPageId, filter }: any) {
  return postAsync(`/api/matrix/get-clones/${matrixType}/${matrixFilterUserId}/${matrixFilterPageId}`, { filter })
}






