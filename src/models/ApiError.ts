import { AxiosError } from 'axios'

export default class ApiError extends Error {
  public code : string
  constructor (e: AxiosError | Error | string) {
    let code = 'error/something-wrong'
    let message = 'Something went wrong'
    if (e instanceof AxiosError) {
      if (e.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        message = e.response.data?.message || 'Something went wrong'
        code = e.response.data?.code || 'error/something-wrong'
      } else if (e.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        if (!window.navigator.onLine) {
          message = 'No internet connection'
          code = 'error/no-internet'
        } else {
          message = 'Failed to load response'
          code = 'error/no-response'
        }
      } else {
        message = 'Something went wrong'
      }
    } else if (e instanceof Error) {
      //
    } else if (typeof e === 'string') {
      message = e
      code = 'error/other'
    } else {
      //
    }
    super(message)
    this.code = code

    // Set the prototype explicitly.
    Object.setPrototypeOf(this, ApiError.prototype)
  }
}
