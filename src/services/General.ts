import { axiosInstance } from 'libs/api'
import ApiData from 'models/ApiData'
import ApiError from 'models/ApiError'

const BASEURL = process.env.REACT_APP_API_BASEURL

class UserMessages {
  static async create (payload: any) {
    try {
      const resp = await axiosInstance.post(`${BASEURL}/general/user-messages`, payload)
      return ApiData.fromResponse(resp)
    } catch (err: any) {
      throw new ApiError(err)
    }
  }

  static async findMany (params: any = {}) {
    try {
      const resp = await axiosInstance.get(`${BASEURL}/general/user-messages`, { params })
      return ApiData.fromResponse(resp)
    } catch (err: any) {
      throw new ApiError(err)
    }
  }

  static async findById (id: number) {
    try {
      const resp = await axiosInstance.get(`${BASEURL}/general/user-messages/${id}`)
      return ApiData.fromResponse(resp)
    } catch (err: any) {
      throw new ApiError(err)
    }
  }

  static async deleteById (id: number) {
    try {
      const resp = await axiosInstance.delete(`${BASEURL}/general/user-messages/${id}`)
      return ApiData.fromResponse(resp)
    } catch (err: any) {
      throw new ApiError(err)
    }
  }
}

export default class GeneralService {
  static UserMessages = UserMessages
}
