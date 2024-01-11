export function useCopyLink(matrixId: number) {
    const link = window.location.origin + window.location.pathname
    const id = `?id=${matrixId}`
    navigator.clipboard.writeText(link + id)
}