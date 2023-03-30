import { axiosInstance } from 'libs/api'
import ApiData from 'models/ApiData'
import ApiError from 'models/ApiError'

const BASEURL = process.env.REACT_APP_API_BASEURL

export default class WalletsService {
  // static async create (payload: any) {
  //   try {
  //     const resp = await axiosInstance.post(`${BASEURL}/wallets`, payload)
  //     return ApiData.fromResponse(resp)
  //   } catch (err: any) {
  //     throw new ApiError(err)
  //   }
  // }

  static async findMany (params: any = {}) {
    try {
      const resp = await axiosInstance.get(`${BASEURL}/wallets`, { params })
      return ApiData.fromResponse(resp)
    } catch (err: any) {
      throw new ApiError(err)
    }
  }

  static async findById (id: number) {
    try {
      const resp = await axiosInstance.get(`${BASEURL}/wallets/${id}`)
      return ApiData.fromResponse(resp)
    } catch (err: any) {
      throw new ApiError(err)
    }
  }

  // static async updateById (id: number, payload: any) {
  //   try {
  //     const resp = await axiosInstance.patch(`${BASEURL}/wallets/${id}`, payload)
  //     return ApiData.fromResponse(resp)
  //   } catch (err: any) {
  //     throw new ApiError(err)
  //   }
  // }

  // static async deleteById (id: number) {
  //   try {
  //     const resp = await axiosInstance.delete(`${BASEURL}/wallets/${id}`)
  //     return ApiData.fromResponse(resp)
  //   } catch (err: any) {
  //     throw new ApiError(err)
  //   }
  // }
}
