import { axiosInstance } from 'libs/api'
import ApiData from 'models/ApiData'
import ApiError from 'models/ApiError'

const BASEURL = process.env.REACT_APP_API_BASEURL

class Readers {
  static async track (articleId: number) {
    try {
      const resp = await axiosInstance.post(`${BASEURL}/articles/${articleId}/readers/track`)
      return ApiData.fromResponse(resp)
    } catch (err: any) {
      throw new ApiError(err)
    }
  }

  static async bookmark (articleId: number) {
    try {
      const resp = await axiosInstance.post(`${BASEURL}/articles/${articleId}/readers/bookmark`)
      return ApiData.fromResponse(resp)
    } catch (err: any) {
      throw new ApiError(err)
    }
  }

  static async unbookmark (articleId: number) {
    try {
      const resp = await axiosInstance.delete(`${BASEURL}/articles/${articleId}/readers/bookmark`)
      return ApiData.fromResponse(resp)
    } catch (err: any) {
      throw new ApiError(err)
    }
  }

  static async vote (articleId: number, vote: number) {
    try {
      const resp = await axiosInstance.post(`${BASEURL}/articles/${articleId}/readers/vote`, { vote })
      return ApiData.fromResponse(resp)
    } catch (err: any) {
      throw new ApiError(err)
    }
  }
}

class Categories {
  static async create (payload: any) {
    try {
      const resp = await axiosInstance.post(`${BASEURL}/articles/categories`, payload)
      return ApiData.fromResponse(resp)
    } catch (err: any) {
      throw new ApiError(err)
    }
  }

  static async findMany (params: any = {}) {
    try {
      const resp = await axiosInstance.get(`${BASEURL}/articles/categories`, { params })
      return ApiData.fromResponse(resp)
    } catch (err: any) {
      throw new ApiError(err)
    }
  }

  static async findById (id: number) {
    try {
      const resp = await axiosInstance.get(`${BASEURL}/articles/categories/${id}`)
      return ApiData.fromResponse(resp)
    } catch (err: any) {
      throw new ApiError(err)
    }
  }

  static async updateById (id: number, payload: any) {
    try {
      const resp = await axiosInstance.patch(`${BASEURL}/articles/categories/${id}`, payload)
      return ApiData.fromResponse(resp)
    } catch (err: any) {
      throw new ApiError(err)
    }
  }

  static async bulkUpdate (payload: any[]) {
    try {
      const resp = await axiosInstance.patch(`${BASEURL}/articles/categories/bulk-update`, { data: payload })
      return ApiData.fromResponse(resp)
    } catch (err: any) {
      throw new ApiError(err)
    }
  }

  static async deleteById (id: number) {
    try {
      const resp = await axiosInstance.delete(`${BASEURL}/articles/categories/${id}`)
      return ApiData.fromResponse(resp)
    } catch (err: any) {
      throw new ApiError(err)
    }
  }
}

export default class ArticlesService {
  static Categories = Categories
  static Readers = Readers
  static async create (payload: any) {
    try {
      const resp = await axiosInstance.post(`${BASEURL}/articles`, payload)
      return ApiData.fromResponse(resp)
    } catch (err: any) {
      throw new ApiError(err)
    }
  }

  static async findMany (params: any = {}) {
    try {
      const resp = await axiosInstance.get(`${BASEURL}/articles`, { params })
      return ApiData.fromResponse(resp)
    } catch (err: any) {
      throw new ApiError(err)
    }
  }

  static async findById (id: number, params?: any) {
    try {
      const resp = await axiosInstance.get(`${BASEURL}/articles/${id}`, { params })
      return ApiData.fromResponse(resp)
    } catch (err: any) {
      throw new ApiError(err)
    }
  }

  static async updateById (id: number, payload: any) {
    try {
      const resp = await axiosInstance.patch(`${BASEURL}/articles/${id}`, payload)
      return ApiData.fromResponse(resp)
    } catch (err: any) {
      throw new ApiError(err)
    }
  }

  static async deleteById (id: number) {
    try {
      const resp = await axiosInstance.delete(`${BASEURL}/articles/${id}`)
      return ApiData.fromResponse(resp)
    } catch (err: any) {
      throw new ApiError(err)
    }
  }

  static async findContextById (id: number) {
    try {
      const resp = await axiosInstance.get(`${BASEURL}/articles/${id}/context`)
      return ApiData.fromResponse(resp)
    } catch (err: any) {
      throw new ApiError(err)
    }
  }
}
