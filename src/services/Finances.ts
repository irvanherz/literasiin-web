import { axiosInstance } from 'libs/api'
import ApiData from 'models/ApiData'
import ApiError from 'models/ApiError'

const BASEURL = process.env.REACT_APP_API_BASEURL

class Orders {
  static async findMany (params: any = {}) {
    try {
      const resp = await axiosInstance.get(`${BASEURL}/finances/orders`, { params })
      return ApiData.fromResponse(resp)
    } catch (err: any) {
      throw new ApiError(err)
    }
  }

  static async findById (id: number) {
    try {
      const resp = await axiosInstance.get(`${BASEURL}/finances/orders/${id}`)
      return ApiData.fromResponse(resp)
    } catch (err: any) {
      throw new ApiError(err)
    }
  }

  // static async updateById (id: number, payload: any) {
  //   try {
  //     const resp = await axiosInstance.patch(`${BASEURL}/finances/orders/${id}`, payload)
  //     return ApiData.fromResponse(resp)
  //   } catch (err: any) {
  //     throw new ApiError(err)
  //   }
  // }

  static async pay (id: number) {
    try {
      const resp = await axiosInstance.post(`${BASEURL}/finances/orders/${id}/pay`)
      return ApiData.fromResponse(resp)
    } catch (err: any) {
      throw new ApiError(err)
    }
  }
}

export default class FinancesService {
  static Orders = Orders
  static async createDepositCoin (payload: any) {
    try {
      const resp = await axiosInstance.post(`${BASEURL}/finances/deposit-coin`, payload)
      return ApiData.fromResponse(resp)
    } catch (err: any) {
      throw new ApiError(err)
    }
  }
}
