import { axiosInstance } from 'libs/api'
import ApiData from 'models/ApiData'
import ApiError from 'models/ApiError'

const BASEURL = process.env.REACT_APP_API_BASEURL

class Invoices {
  static async findMany (params: any = {}) {
    try {
      const resp = await axiosInstance.get(`${BASEURL}/finances/invoices`, { params })
      return ApiData.fromResponse(resp)
    } catch (err: any) {
      throw new ApiError(err)
    }
  }

  static async findById (id: number) {
    try {
      const resp = await axiosInstance.get(`${BASEURL}/finances/invoices/${id}`)
      return ApiData.fromResponse(resp)
    } catch (err: any) {
      throw new ApiError(err)
    }
  }

  // static async updateById (id: number, payload: any) {
  //   try {
  //     const resp = await axiosInstance.patch(`${BASEURL}/finances/invoices/${id}`, payload)
  //     return ApiData.fromResponse(resp)
  //   } catch (err: any) {
  //     throw new ApiError(err)
  //   }
  // }

  static async pay (id: number) {
    try {
      const resp = await axiosInstance.post(`${BASEURL}/finances/invoices/${id}/pay`)
      return ApiData.fromResponse(resp)
    } catch (err: any) {
      throw new ApiError(err)
    }
  }
}

export default class FinancesService {
  static Invoices = Invoices
  static async createDepositCoin (payload: any) {
    try {
      const resp = await axiosInstance.post(`${BASEURL}/finances/deposit-coin`, payload)
      return ApiData.fromResponse(resp)
    } catch (err: any) {
      throw new ApiError(err)
    }
  }
}
