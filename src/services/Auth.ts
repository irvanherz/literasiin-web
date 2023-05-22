import { axiosInstance } from 'libs/api'
import ApiData from 'models/ApiData'
import ApiError from 'models/ApiError'

const BASEURL = process.env.REACT_APP_API_BASEURL

export default class AuthService {
  static async signin (payload: any) {
    try {
      const resp = await axiosInstance.post(`${BASEURL}/auth/signin`, payload)
      return ApiData.fromResponse(resp)
    } catch (err: any) {
      throw new ApiError(err)
    }
  }

  static async signup (payload: any) {
    try {
      const resp = await axiosInstance.post(`${BASEURL}/auth/signup`, payload)
      return ApiData.fromResponse(resp)
    } catch (err: any) {
      throw new ApiError(err)
    }
  }

  static async refreshToken (rtoken: string) {
    try {
      const resp = await axiosInstance.post(`${BASEURL}/auth/refresh-token`, { refreshToken: rtoken })
      return ApiData.fromResponse(resp)
    } catch (err: any) {
      throw new ApiError(err)
    }
  }

  static async resetPasswordRequest (payload: any) {
    try {
      const resp = await axiosInstance.post(`${BASEURL}/auth/reset-password-request`, payload)
      return ApiData.fromResponse(resp)
    } catch (err: any) {
      throw new ApiError(err)
    }
  }

  static async resetPassword (payload: any) {
    try {
      const resp = await axiosInstance.post(`${BASEURL}/auth/reset-password`, payload)
      return ApiData.fromResponse(resp)
    } catch (err: any) {
      throw new ApiError(err)
    }
  }

  static async changePassword (payload: any) {
    try {
      const resp = await axiosInstance.post(`${BASEURL}/auth/change-password`, payload)
      return ApiData.fromResponse(resp)
    } catch (err: any) {
      throw new ApiError(err)
    }
  }

  static async checkPasswordResetToken (payload: any) {
    try {
      const resp = await axiosInstance.post(`${BASEURL}/auth/check-password-reset-token`, payload)
      return ApiData.fromResponse(resp)
    } catch (err: any) {
      throw new ApiError(err)
    }
  }

  static persistToken (token?: string | null, refreshToken?: string | null) {
    if (token) {
      localStorage.setItem('token', token)
    } else {
      localStorage.removeItem('token')
    }
    if (refreshToken) {
      localStorage.setItem('refreshToken', refreshToken)
    } else {
      localStorage.removeItem('refreshToken')
    }
  }

  static async authWithGoogle (payload: any) {
    try {
      const resp = await axiosInstance.post(`${BASEURL}/auth/google`, payload)
      return ApiData.fromResponse(resp)
    } catch (err: any) {
      throw new ApiError(err)
    }
  }
}
