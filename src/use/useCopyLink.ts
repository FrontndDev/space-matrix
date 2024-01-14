import { useShowMessage } from "./useShowMessage.ts";
import { baseUrl } from "../router";

export function useCopyLink(matrixId: number, type: string, query = 'id') {
    const link = window.location.origin + baseUrl + '/' + type
    const id = `?${query}=${matrixId}`
    navigator.clipboard.writeText(link + id)
    useShowMessage('green', 'Скопировано')
}