import axios, { AxiosError } from 'axios'

const BASE_URL = import.meta.env.VITE_VUE_APP_API_URL ?? 'https://dev.halk.ai' // позже будет в .env

function setGlobalConfig(token: string | null) {
    const defaultSettings = {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "x-auth": import.meta.env.VITE_VUE_APP_X_AUTH,
        "X-SPACE-ID": import.meta.env.VITE_VUE_APP_X_SPACE_ID,
        // "VerificationToken": import.meta.env.VUE_APP_VEREFICATION_TOKEN
    };

    return token ? { ...defaultSettings, "Authorization": 'Bearer ' + token } : defaultSettings
}

export function setDataToLS(key: string, data: any) {
    localStorage.setItem(key, JSON.stringify(data))
}

export function getDataFromLS(key: string) {
    const data: string | null = localStorage.getItem(key)

    return data && data !== 'undefined' ? JSON.parse(data) : null
}

export async function getListOfTypes(category: string) {
    return getAsync(`/api/matrix/list-of-types/${category}`)
}

export async function getViewLastOwn(matrixTypeOrId: string | number) {
    return getAsync(`/api/matrix/${matrixTypeOrId}`)
}

export async function putAsync(url: string, data: never[], checkError = true) {
    try {
        let response = await axios.put(BASE_URL + url, data, { headers: setGlobalConfig(localStorage.getItem('token')) })
        // console.log(response)
        if (response.status === 200 || response.status === 202) {
            return response?.data
        }
        if (response.status === 204 || response.status === 201) {
            return true
        }
    } catch (error: any) {
        if (checkError && error.response) {
            return error.response
        }
        console.error(error)
    }

    return undefined
}

export async function postAsync(url: string, data = [], checkError = true) {
    try {
        let response = await axios.post(BASE_URL + url, data, { headers: setGlobalConfig(localStorage.getItem('token')) })
        // console.log(response)
        if (response.status === 200) {
            return response?.data
        }
        if (response.status === 204 || response.status === 201) {
            return true
        }
    } catch (e) {
        const error = e as AxiosError
        if (checkError && error.response) {
            return error.response
        }
        console.error(error)
    }

    return undefined
}

export async function getAsync(url: string, token = localStorage.getItem('token')) {
    try {
        let response = await axios.get(BASE_URL + url, { headers: setGlobalConfig(token) })

        if (response.status === 200) {
            return response?.data
        }
    } catch (e) {
        const error = e as AxiosError
        if (error?.response?.status === 401) {
            // localStorage.removeItem('token')
            // localStorage.removeItem('profile-user')
        }
        console.error(error)
    }
}