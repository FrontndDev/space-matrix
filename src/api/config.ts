import axios, { AxiosError } from 'axios'

const BASE_URL = 'https://dev.halk.ai'

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

        if (response?.data?.error_code) {
            const error = response.data
            // @ts-ignore
            show_message('red', error.error_message, 'Ошибка:');
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
        console.error(error)
        // @ts-ignore
        show_message('red', error.message, 'Ошибка:');
    }

    return undefined
}

export async function postAsync(url: string, data = {}, checkError = true) {
    try {
        let response = await axios.post(BASE_URL + url, data, { headers: setGlobalConfig(localStorage.getItem('token')) })

        if (response?.data?.error_code) {
            const error = response.data
            // @ts-ignore
            show_message('red', error.error_message, 'Ошибка:');
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
        // @ts-ignore
        show_message('red', error.message, 'Ошибка:');
        console.error(error)
    }

    return undefined
}

export async function getAsync(url: string) {
    try {
        let response = await axios.get(BASE_URL + url, { headers: setGlobalConfig(localStorage.getItem('token')) })

        if (response?.data?.error_code) {
            const error = response.data
            // @ts-ignore
            show_message('red', error.error_message, 'Ошибка:');
        }

        if (response.status === 200) {
            return response?.data
        }
    } catch (e) {
        const error = e as AxiosError
        // @ts-ignore
        show_message('red', error.message, 'Ошибка:');
        console.error(error)
    }
}