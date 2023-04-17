import { axiosInstance } from 'libs/api'
import ApiData from 'models/ApiData'
import ApiError from 'models/ApiError'

const BASEURL = process.env.REACT_APP_API_BASEURL

class WalletTransactionsService {
  static async findMany (params: any = {}) {
    try {
      const resp = await axiosInstance.get(`${BASEURL}/wallets/transactions`, { params })
      return ApiData.fromResponse(resp)
    } catch (err: any) {
      throw new ApiError(err)
    }
  }
}

export default class WalletsService {
  static Transactions = WalletTransactionsService
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

  static async createDepositOrder (id: number, payload: any) {
    try {
      const resp = await axiosInstance.post(`${BASEURL}/wallets/${id}/deposit-order`, payload)
      return ApiData.fromResponse(resp)
    } catch (err: any) {
      throw new ApiError(err)
    }
  }
}
