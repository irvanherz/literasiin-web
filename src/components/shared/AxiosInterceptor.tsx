import axios, { AxiosResponse, InternalAxiosRequestConfig } from 'axios'
import useAuthContext from 'hooks/useAuthContext'
import { axiosInstance } from 'libs/api'
import { ReactElement, useEffect, useState } from 'react'
import { useMutation } from 'react-query'
import AuthService from 'services/Auth'

let isRefreshing: boolean = false
let refreshSubscribers: any[] = []

const subscribeTokenRefresh = (cb: (token: string) => void) => {
  refreshSubscribers.push(cb)
}

function onRrefreshed (token: string) {
  refreshSubscribers.map(cb => cb(token))
  refreshSubscribers = []
}

type AxiosInterceptorProps = {
  children: ReactElement
}

export default function AxiosInterceptor ({ children }: AxiosInterceptorProps) {
  const auth = useAuthContext()
  const [status, setStatus] = useState('idle')
  const refresher = useMutation(AuthService.refreshToken)

  const interceptSuccessfulRequest = (config: InternalAxiosRequestConfig<any>) => {
    const getBearerToken = () => {
      try {
        const token = localStorage.getItem('token')
        return token ? `Bearer ${token}` : null
      } catch (err) {
        return null
      }
    }

    const auth = getBearerToken()
    if (auth) {
      config.headers.Authorization = auth
    }
    return { ...config } as InternalAxiosRequestConfig<any>
  }

  const handleRefreshTokenFailed = () => {
    auth.setToken('', '')
  }

  const interceptFailedRequest = (error: any) => {
    return Promise.reject(error)
  }

  const interceptSuccessfulResponse = (response: AxiosResponse<any, any>) => {
    return response
  }

  const interceptFailedResponse = async (error: any) => {
    const errorHttpStatus = error?.response?.status
    const errorServerCode = error?.response?.data?.error?.code

    const originalRequest = error.config

    if (!(errorHttpStatus === 401 && errorServerCode === 'auth/token-expired')) { return Promise.reject(error) }
    if (!isRefreshing) {
      isRefreshing = true
      refresher.mutate(auth.refreshToken!, {
        onSuccess: (result) => {
          const newToken = result.meta.token
          const newRefreshToken = result.meta.refreshToken
          auth.setToken(newToken, newRefreshToken)
          isRefreshing = false
          onRrefreshed(newToken)
        },
        onError: (err) => {
          console.log(err)
          handleRefreshTokenFailed()
        }
      })
    }

    const retryOrigReq = new Promise((resolve, reject) => {
      subscribeTokenRefresh(token => {
        originalRequest.headers.Authorization = 'Bearer ' + token
        resolve(axios(originalRequest))
      })
    })
    return retryOrigReq
  }

  useEffect(() => {
    axiosInstance.interceptors.request.use(interceptSuccessfulRequest, interceptFailedRequest)
    axiosInstance.interceptors.response.use(interceptSuccessfulResponse, interceptFailedResponse)
    setStatus('success')
  }, [])

  return status !== 'idle' ? children : null
}
