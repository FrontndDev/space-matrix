import {
  getAsync,
  postAsync,
  putAsync
} from "./config.ts";
import {
  IExposePartnerParams
} from "../interfaces/partners.interface.ts";
import { IBuyBoosterParams } from "../interfaces/store.interface.ts";


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

export async function getMatrix(matrixTypeOrId: string | number) {
  return getAsync(`/api/matrix/${matrixTypeOrId}`)
}

export async function getPaymentForm(matrixType: string) {
  return getAsync(`/api/matrix/payment-form/${matrixType}`)
}

export async function getListOfInfinity(parentId: number) {
  return getAsync(`/api/matrix/list-of-infinity/${parentId}`)
}

export async function getListOfChains(pageID: number) {
  return getAsync(`/api/matrix/chains/profit?page=${pageID}`)
}

export async function getChainDetail(id: number) {
  return getAsync(`/api/matrix/chain-details/${id}`)
}

export async function getBalance() {
  return getAsync('/api/wallet/balance')
}

// POST

export async function filterOfActivatedMatrix({ matrixType, matrixFilterUserId, matrixFilterPageId, filter }: any) {
  return postAsync(`/api/matrix/get-clones/${matrixType}/${matrixFilterUserId}/${matrixFilterPageId}`, { filter })
}

export async function buyClone(data: IBuyBoosterParams) {
  return postAsync('/api/matrix/placement/buyClone', data)
}

// PUT

export async function placementExistMatrix(data: IExposePartnerParams) {
  return putAsync('/api/matrix/placement/exist', data)
}





