import axios, { AxiosError } from 'axios'
import { useShowMessage } from "@/composables/useShowMessage";

const BASE_URL = 'https://dev.halk.ai'

const checkUserIsModer = (error: AxiosError) => {
    //@ts-ignore
    if (window.UserData.moder) {
        useShowMessage('red', error.message, 'Ошибка:')
    } else if (error.status !== 500) {
        useShowMessage('red', error.message, 'Ошибка:')
    }

    console.error(error)
}

function setGlobalConfig(token: string | null) {

  function getCookie(name: string) {
    let matches = document.cookie.match(new RegExp(
      "(?:^|; )" + name.replace(/([.$?*|{}()[\]\\/+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
  }


    const defaultSettings = {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "x-auth": getCookie('dasdasdaddjdj'),
        // @ts-ignore
        "X-SPACE-ID": `${window.SpaceId}:${window.SpaceIdHash}`,
        // "VerificationToken": import.meta.env.VUE_APP_VEREFICATION_TOKEN
    };

    return token ? { ...defaultSettings, "Authorization": 'Bearer ' + token } : defaultSettings
}

export async function putAsync(url: string, data: unknown, checkError = true) {
    try {
        let response = await axios.put(BASE_URL + url, data, { headers: setGlobalConfig(localStorage.getItem('token')) })

        if (response?.data?.error_code !== undefined) {
            const error = response.data
            useShowMessage('red', error.error_message, 'Ошибка:')
        }

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
        checkUserIsModer(error)
    }

    return undefined
}

export async function postAsync(url: string, data = {}, checkError = true) {
    try {
        let response = await axios.post(BASE_URL + url, data, { headers: setGlobalConfig(localStorage.getItem('token')) })

        if (response?.data?.error_code !== undefined) {
            const error = response.data
            useShowMessage('red', error.error_message, 'Ошибка:')
        }

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
        checkUserIsModer(error)
    }

    return undefined
}

export async function getAsync(url: string, options?: any) {
    const config: any = { headers: setGlobalConfig(localStorage.getItem('token')) }

    if (options?.cancelTokenSource?.token) config.cancelToken = options.cancelTokenSource.token
    try {
        let response = await axios.get(BASE_URL + url, config)

        if (response?.data?.error_code !== undefined) {
            const error = response.data
            useShowMessage('red', error.error_message, 'Ошибка:')
        }

        if (response.status === 200) {
            return response?.data
        }

    } catch (e) {
        const errorCodes = ['ERR_CANCELED']
        const error = e as AxiosError

        if (!errorCodes.includes(error.code ?? '')) {
            checkUserIsModer(error)
        }
    }
}