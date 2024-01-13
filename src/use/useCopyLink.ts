import { useShowMessage } from "./useShowMessage.ts";
import { baseUrl } from "../router";

export function useCopyLink(matrixId: number, cell: any) {
    const link = window.location.origin + baseUrl + '/' + cell.type
    const id = `?id=${matrixId}`
    navigator.clipboard.writeText(link + id)
    useShowMessage('green', 'Скопировано')
}