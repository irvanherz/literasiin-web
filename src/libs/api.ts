
import axios from 'axios'

type TranslatedApiError = {
  code: string,
  message: string,
}
const DEFAULT_API_ERROR = {
  code: 'unknown',
  message: 'Unknown error'
}
export function translateApiError (error:any): TranslatedApiError {
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    console.log(error.response.data)
    console.log(error.response.status)
    console.log(error.response.headers)
    return {
      ...DEFAULT_API_ERROR,
      ...error.response?.data
    }
  } else if (error.request) {
    // The request was made but no response was received
    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
    // http.ClientRequest in node.js
    console.log(error.request)
    return DEFAULT_API_ERROR
  } else {
    // Something happened in setting up the request that triggered an Error
    console.log('Error', error.message)
    return DEFAULT_API_ERROR
  }
}

export function generateAuthorizationHeaderValue () {
  const token = localStorage.getItem('token')
  return token ? `Bearer ${token}` : null
}

export const axiosInstance = axios.create()

axiosInstance.interceptors.request.use(config => {
  const auth = generateAuthorizationHeaderValue()
  if (auth) {
    config.headers.Authorization = auth
  }
  return { ...config }
}, error => {
  Promise.reject(error)
})

// https://gist.github.com/Godofbrowser/bf118322301af3fc334437c683887c5f#file-axios-refresh_token-2-js
