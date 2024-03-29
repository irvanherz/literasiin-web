import { UploadProps } from 'antd'
import { AxiosRequestConfig } from 'axios'
import { axiosInstance, generateAuthorizationHeaderValue } from 'libs/api'
import ApiData from 'models/ApiData'
import ApiError from 'models/ApiError'

const BASEURL = process.env.REACT_APP_API_BASEURL

export default class MediaService {
  static async create (payload: any) {
    try {
      const resp = await axiosInstance.post(`${BASEURL}/media`, payload)
      return ApiData.fromResponse(resp)
    } catch (err: any) {
      throw new ApiError(err)
    }
  }

  static async uploadImage (file: any, preset: string, onUploadProgress?: AxiosRequestConfig<any>['onUploadProgress']) {
    try {
      const payload = new FormData()
      payload.set('file', file)
      payload.set('preset', preset)
      const resp = await axiosInstance.post(`${BASEURL}/media`, payload, { onUploadProgress })
      return ApiData.fromResponse(resp)
    } catch (err: any) {
      throw new ApiError(err)
    }
  }

  static async findMany (params: any = {}) {
    try {
      const resp = await axiosInstance.get(`${BASEURL}/media`, { params })
      return ApiData.fromResponse(resp)
    } catch (err: any) {
      throw new ApiError(err)
    }
  }

  static async findById (id: number) {
    try {
      const resp = await axiosInstance.get(`${BASEURL}/media/${id}`)
      return ApiData.fromResponse(resp)
    } catch (err: any) {
      throw new ApiError(err)
    }
  }

  static async updateById (id: number, payload: any) {
    try {
      const resp = await axiosInstance.patch(`${BASEURL}/media/${id}`, payload)
      return ApiData.fromResponse(resp)
    } catch (err: any) {
      throw new ApiError(err)
    }
  }

  static async deleteById (id: number) {
    try {
      const resp = await axiosInstance.delete(`${BASEURL}/media/${id}`)
      return ApiData.fromResponse(resp)
    } catch (err: any) {
      throw new ApiError(err)
    }
  }

  static generateAntdUploadProps () {
    const props: UploadProps = {
      action: `${BASEURL}/media`,
      method: 'post',
      name: 'file',
      headers: { Authorization: generateAuthorizationHeaderValue() as any }
    }
    return props
  }

  static generateSpecificAntdUploadProps (type: string) {
    const props: UploadProps = {
      action: `${BASEURL}/media/${type}`,
      method: 'post',
      name: 'file',
      headers: { Authorization: generateAuthorizationHeaderValue() as any }
    }
    return props
  }
}
