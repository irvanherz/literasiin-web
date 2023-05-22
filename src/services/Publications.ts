import { UploadProps } from 'antd'
import { axiosInstance, generateAuthorizationHeaderValue } from 'libs/api'
import ApiData from 'models/ApiData'
import ApiError from 'models/ApiError'

const BASEURL = process.env.REACT_APP_API_BASEURL

class Files {
  static async create (payload: any) {
    try {
      const resp = await axiosInstance.post(`${BASEURL}/publications/files`, payload)
      return ApiData.fromResponse(resp)
    } catch (err: any) {
      throw new ApiError(err)
    }
  }

  static async findMany (params: any = {}) {
    try {
      const resp = await axiosInstance.get(`${BASEURL}/publications/files`, { params })
      return ApiData.fromResponse(resp)
    } catch (err: any) {
      throw new ApiError(err)
    }
  }

  static async findById (id: number) {
    try {
      const resp = await axiosInstance.get(`${BASEURL}/publications/files/${id}`)
      return ApiData.fromResponse(resp)
    } catch (err: any) {
      throw new ApiError(err)
    }
  }

  static async updateById (id: number, payload: any) {
    try {
      const resp = await axiosInstance.patch(`${BASEURL}/publications/files/${id}`, payload)
      return ApiData.fromResponse(resp)
    } catch (err: any) {
      throw new ApiError(err)
    }
  }

  static async deleteById (id: number) {
    try {
      const resp = await axiosInstance.delete(`${BASEURL}/publications/files/${id}`)
      return ApiData.fromResponse(resp)
    } catch (err: any) {
      throw new ApiError(err)
    }
  }

  static generateAntdUploadProps () {
    const props: UploadProps = {
      action: `${BASEURL}/publications/files`,
      method: 'post',
      name: 'file',
      headers: { Authorization: generateAuthorizationHeaderValue() as any }
    }
    return props
  }
}

export default class PublicationsService {
  static Files = Files
  static async create (payload: any) {
    try {
      const resp = await axiosInstance.post(`${BASEURL}/publications`, payload)
      return ApiData.fromResponse(resp)
    } catch (err: any) {
      throw new ApiError(err)
    }
  }

  static async findMany (params: any = {}) {
    try {
      const resp = await axiosInstance.get(`${BASEURL}/publications`, { params })
      return ApiData.fromResponse(resp)
    } catch (err: any) {
      throw new ApiError(err)
    }
  }

  static async findById (id: number, params: any = {}) {
    try {
      const resp = await axiosInstance.get(`${BASEURL}/publications/${id}`, { params })
      return ApiData.fromResponse(resp)
    } catch (err: any) {
      throw new ApiError(err)
    }
  }

  static async updateById (id: number, payload: any) {
    try {
      const resp = await axiosInstance.patch(`${BASEURL}/publications/${id}`, payload)
      return ApiData.fromResponse(resp)
    } catch (err: any) {
      throw new ApiError(err)
    }
  }

  static async deleteById (id: number) {
    try {
      const resp = await axiosInstance.delete(`${BASEURL}/publications/${id}`)
      return ApiData.fromResponse(resp)
    } catch (err: any) {
      throw new ApiError(err)
    }
  }

  static async calculatePayment (id: number) {
    try {
      const resp = await axiosInstance.post(`${BASEURL}/publications/${id}/calculate-payment`)
      return ApiData.fromResponse(resp)
    } catch (err: any) {
      throw new ApiError(err)
    }
  }

  static async commit (id: number) {
    try {
      const resp = await axiosInstance.post(`${BASEURL}/publications/${id}/commit`)
      return ApiData.fromResponse(resp)
    } catch (err: any) {
      throw new ApiError(err)
    }
  }

  static async queryAvailableCouriers (id: number) {
    try {
      const resp = await axiosInstance.post(`${BASEURL}/publications/${id}/available-couriers`)
      return ApiData.fromResponse(resp)
    } catch (err: any) {
      throw new ApiError(err)
    }
  }
}
