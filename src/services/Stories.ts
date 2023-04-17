import { axiosInstance } from 'libs/api'
import ApiData from 'models/ApiData'
import ApiError from 'models/ApiError'

const BASEURL = process.env.REACT_APP_API_BASEURL

class StoryWriterInvitations {
  static async findMany (params: any = {}) {
    try {
      const resp = await axiosInstance.get(`${BASEURL}/stories/writers/invitations`, { params })
      return ApiData.fromResponse(resp)
    } catch (err: any) {
      throw new ApiError(err)
    }
  }

  static async accept (invitationId: number) {
    try {
      const resp = await axiosInstance.post(`${BASEURL}/stories/writers/invitations/${invitationId}/accept`)
      return ApiData.fromResponse(resp)
    } catch (err: any) {
      throw new ApiError(err)
    }
  }

  static async reject (invitationId: number) {
    try {
      const resp = await axiosInstance.post(`${BASEURL}/stories/writers/invitations/${invitationId}/reject`)
      return ApiData.fromResponse(resp)
    } catch (err: any) {
      throw new ApiError(err)
    }
  }
}

class Writers {
  static Invitations = StoryWriterInvitations
  static async create (payload: any) {
    try {
      const resp = await axiosInstance.post(`${BASEURL}/stories/writers`, payload)
      return ApiData.fromResponse(resp)
    } catch (err: any) {
      throw new ApiError(err)
    }
  }

  static async findMany (params: any = {}) {
    try {
      const resp = await axiosInstance.get(`${BASEURL}/stories/writers`, { params })
      return ApiData.fromResponse(resp)
    } catch (err: any) {
      throw new ApiError(err)
    }
  }

  static async findById (id: number, params: any = {}) {
    try {
      const resp = await axiosInstance.get(`${BASEURL}/stories/writers/${id}`, { params })
      return ApiData.fromResponse(resp)
    } catch (err: any) {
      throw new ApiError(err)
    }
  }

  static async updateById (id: number, payload: any) {
    try {
      const resp = await axiosInstance.patch(`${BASEURL}/stories/writers/${id}`, payload)
      return ApiData.fromResponse(resp)
    } catch (err: any) {
      throw new ApiError(err)
    }
  }

  static async deleteById (id: number) {
    try {
      const resp = await axiosInstance.delete(`${BASEURL}/stories/writers/${id}`)
      return ApiData.fromResponse(resp)
    } catch (err: any) {
      throw new ApiError(err)
    }
  }
}

class Readers {
  static async track (storyId: number) {
    try {
      const resp = await axiosInstance.post(`${BASEURL}/stories/${storyId}/readers/track`)
      return ApiData.fromResponse(resp)
    } catch (err: any) {
      throw new ApiError(err)
    }
  }

  static async bookmark (storyId: number) {
    try {
      const resp = await axiosInstance.post(`${BASEURL}/stories/${storyId}/readers/bookmark`)
      return ApiData.fromResponse(resp)
    } catch (err: any) {
      throw new ApiError(err)
    }
  }

  static async unbookmark (storyId: number) {
    try {
      const resp = await axiosInstance.delete(`${BASEURL}/stories/${storyId}/readers/bookmark`)
      return ApiData.fromResponse(resp)
    } catch (err: any) {
      throw new ApiError(err)
    }
  }
}

class ChapterReaders {
  static async track (chapterId: number) {
    try {
      const resp = await axiosInstance.post(`${BASEURL}/stories/chapters/${chapterId}/readers/track`)
      return ApiData.fromResponse(resp)
    } catch (err: any) {
      throw new ApiError(err)
    }
  }

  static async vote (chapterId: number) {
    try {
      const resp = await axiosInstance.post(`${BASEURL}/stories/chapters/${chapterId}/readers/vote`)
      return ApiData.fromResponse(resp)
    } catch (err: any) {
      throw new ApiError(err)
    }
  }

  static async devote (chapterId: number) {
    try {
      const resp = await axiosInstance.delete(`${BASEURL}/stories/chapters/${chapterId}/readers/vote`)
      return ApiData.fromResponse(resp)
    } catch (err: any) {
      throw new ApiError(err)
    }
  }
}

class Tags {
  static async create (payload: any) {
    try {
      const resp = await axiosInstance.post(`${BASEURL}/stories/tags`, payload)
      return ApiData.fromResponse(resp)
    } catch (err: any) {
      throw new ApiError(err)
    }
  }

  static async findMany (params: any = {}) {
    try {
      const resp = await axiosInstance.get(`${BASEURL}/stories/tags`, { params })
      return ApiData.fromResponse(resp)
    } catch (err: any) {
      throw new ApiError(err)
    }
  }

  static async findById (id: number) {
    try {
      const resp = await axiosInstance.get(`${BASEURL}/stories/tags/${id}`)
      return ApiData.fromResponse(resp)
    } catch (err: any) {
      throw new ApiError(err)
    }
  }

  static async updateById (id: number, payload: any) {
    try {
      const resp = await axiosInstance.patch(`${BASEURL}/stories/tags/${id}`, payload)
      return ApiData.fromResponse(resp)
    } catch (err: any) {
      throw new ApiError(err)
    }
  }

  static async deleteById (id: number) {
    try {
      const resp = await axiosInstance.delete(`${BASEURL}/stories/tags/${id}`)
      return ApiData.fromResponse(resp)
    } catch (err: any) {
      throw new ApiError(err)
    }
  }
}

class Categories {
  static async create (payload: any) {
    try {
      const resp = await axiosInstance.post(`${BASEURL}/stories/categories`, payload)
      return ApiData.fromResponse(resp)
    } catch (err: any) {
      throw new ApiError(err)
    }
  }

  static async findMany (params: any = {}) {
    try {
      const resp = await axiosInstance.get(`${BASEURL}/stories/categories`, { params })
      return ApiData.fromResponse(resp)
    } catch (err: any) {
      throw new ApiError(err)
    }
  }

  static async findById (id: number) {
    try {
      const resp = await axiosInstance.get(`${BASEURL}/stories/categories/${id}`)
      return ApiData.fromResponse(resp)
    } catch (err: any) {
      throw new ApiError(err)
    }
  }

  static async updateById (id: number, payload: any) {
    try {
      const resp = await axiosInstance.patch(`${BASEURL}/stories/categories/${id}`, payload)
      return ApiData.fromResponse(resp)
    } catch (err: any) {
      throw new ApiError(err)
    }
  }

  static async bulkUpdate (payload: any[]) {
    try {
      const resp = await axiosInstance.patch(`${BASEURL}/stories/categories/bulk-update`, { data: payload })
      return ApiData.fromResponse(resp)
    } catch (err: any) {
      throw new ApiError(err)
    }
  }

  static async deleteById (id: number) {
    try {
      const resp = await axiosInstance.delete(`${BASEURL}/stories/categories/${id}`)
      return ApiData.fromResponse(resp)
    } catch (err: any) {
      throw new ApiError(err)
    }
  }
}

class Comments {
  static async create (payload: any) {
    try {
      const resp = await axiosInstance.post(`${BASEURL}/stories/comments`, payload)
      return ApiData.fromResponse(resp)
    } catch (err: any) {
      throw new ApiError(err)
    }
  }

  static async findMany (params: any = {}) {
    try {
      const resp = await axiosInstance.get(`${BASEURL}/stories/comments`, { params })
      return ApiData.fromResponse(resp)
    } catch (err: any) {
      throw new ApiError(err)
    }
  }

  static async findById (id: number) {
    try {
      const resp = await axiosInstance.get(`${BASEURL}/stories/comments/${id}`)
      return ApiData.fromResponse(resp)
    } catch (err: any) {
      throw new ApiError(err)
    }
  }

  static async updateById (id: number, payload: any) {
    try {
      const resp = await axiosInstance.patch(`${BASEURL}/stories/comments/${id}`, payload)
      return ApiData.fromResponse(resp)
    } catch (err: any) {
      throw new ApiError(err)
    }
  }

  static async deleteById (id: number) {
    try {
      const resp = await axiosInstance.delete(`${BASEURL}/stories/comments/${id}`)
      return ApiData.fromResponse(resp)
    } catch (err: any) {
      throw new ApiError(err)
    }
  }
}

class Chapters {
  static Readers = ChapterReaders
  static async create (payload: any) {
    try {
      const resp = await axiosInstance.post(`${BASEURL}/stories/chapters`, payload)
      return ApiData.fromResponse(resp)
    } catch (err: any) {
      throw new ApiError(err)
    }
  }

  static async findMany (params: any = {}) {
    try {
      const resp = await axiosInstance.get(`${BASEURL}/stories/chapters`, { params })
      return ApiData.fromResponse(resp)
    } catch (err: any) {
      throw new ApiError(err)
    }
  }

  static async findById (id: number, params: any = {}) {
    try {
      const resp = await axiosInstance.get(`${BASEURL}/stories/chapters/${id}`, { params })
      return ApiData.fromResponse(resp)
    } catch (err: any) {
      throw new ApiError(err)
    }
  }

  static async findContextById (id: number) {
    try {
      const resp = await axiosInstance.get(`${BASEURL}/stories/chapters/${id}/context`)
      return ApiData.fromResponse(resp)
    } catch (err: any) {
      throw new ApiError(err)
    }
  }

  static async updateById (id: number, payload: any) {
    try {
      const resp = await axiosInstance.patch(`${BASEURL}/stories/chapters/${id}`, payload)
      return ApiData.fromResponse(resp)
    } catch (err: any) {
      throw new ApiError(err)
    }
  }

  static async deleteById (id: number) {
    try {
      const resp = await axiosInstance.delete(`${BASEURL}/stories/chapters/${id}`)
      return ApiData.fromResponse(resp)
    } catch (err: any) {
      throw new ApiError(err)
    }
  }

  static async view (id: number) {
    try {
      const resp = await axiosInstance.post(`${BASEURL}/stories/chapters/${id}/view`)
      return ApiData.fromResponse(resp)
    } catch (err: any) {
      throw new ApiError(err)
    }
  }
}

export default class StoriesService {
  static Tags = Tags
  static Categories = Categories
  static Chapters = Chapters
  static Writers = Writers
  static Readers = Readers
  static Comments = Comments

  static async create (payload: any) {
    try {
      const resp = await axiosInstance.post(`${BASEURL}/stories`, payload)
      return ApiData.fromResponse(resp)
    } catch (err: any) {
      throw new ApiError(err)
    }
  }

  static async findMany (params: any = {}) {
    try {
      const resp = await axiosInstance.get(`${BASEURL}/stories`, { params })
      return ApiData.fromResponse(resp)
    } catch (err: any) {
      throw new ApiError(err)
    }
  }

  static async findById (id: number, params: any = {}) {
    try {
      const resp = await axiosInstance.get(`${BASEURL}/stories/${id}`, { params })
      return ApiData.fromResponse(resp)
    } catch (err: any) {
      throw new ApiError(err)
    }
  }

  static async updateById (id: number, payload: any) {
    try {
      const resp = await axiosInstance.patch(`${BASEURL}/stories/${id}`, payload)
      return ApiData.fromResponse(resp)
    } catch (err: any) {
      throw new ApiError(err)
    }
  }

  static async deleteById (id: number) {
    try {
      const resp = await axiosInstance.delete(`${BASEURL}/stories/${id}`)
      return ApiData.fromResponse(resp)
    } catch (err: any) {
      throw new ApiError(err)
    }
  }

  static async assignTag (id: number, name: string) {
    try {
      const resp = await axiosInstance.post(`${BASEURL}/stories/${id}/tags/${name}`)
      return ApiData.fromResponse(resp)
    } catch (err: any) {
      throw new ApiError(err)
    }
  }

  static async unassignTag (id: number, name: string) {
    try {
      const resp = await axiosInstance.delete(`${BASEURL}/stories/${id}/tags/${name}`)
      return ApiData.fromResponse(resp)
    } catch (err: any) {
      throw new ApiError(err)
    }
  }

  static async findContextById (id: number) {
    try {
      const resp = await axiosInstance.get(`${BASEURL}/stories/${id}/context`)
      return ApiData.fromResponse(resp)
    } catch (err: any) {
      throw new ApiError(err)
    }
  }
}
