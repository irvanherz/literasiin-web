import { axiosInstance } from 'libs/api'
import ApiData from 'models/ApiData'
import ApiError from 'models/ApiError'

const BASEURL = process.env.REACT_APP_API_BASEURL

class StorytellingAuthorInvitations {
  static async findMany (params: any = {}) {
    try {
      const resp = await axiosInstance.get(`${BASEURL}/storytellings/authors/invitations`, { params })
      return ApiData.fromResponse(resp)
    } catch (err: any) {
      throw new ApiError(err)
    }
  }

  static async accept (invitationId: number) {
    try {
      const resp = await axiosInstance.post(`${BASEURL}/storytellings/authors/invitations/${invitationId}/accept`)
      return ApiData.fromResponse(resp)
    } catch (err: any) {
      throw new ApiError(err)
    }
  }

  static async reject (invitationId: number) {
    try {
      const resp = await axiosInstance.post(`${BASEURL}/storytellings/authors/invitations/${invitationId}/reject`)
      return ApiData.fromResponse(resp)
    } catch (err: any) {
      throw new ApiError(err)
    }
  }
}

class Authors {
  static Invitations = StorytellingAuthorInvitations
  static async create (payload: any) {
    try {
      const resp = await axiosInstance.post(`${BASEURL}/storytellings/authors`, payload)
      return ApiData.fromResponse(resp)
    } catch (err: any) {
      throw new ApiError(err)
    }
  }

  static async findMany (params: any = {}) {
    try {
      const resp = await axiosInstance.get(`${BASEURL}/storytellings/authors`, { params })
      return ApiData.fromResponse(resp)
    } catch (err: any) {
      throw new ApiError(err)
    }
  }

  static async findById (id: number, params: any = {}) {
    try {
      const resp = await axiosInstance.get(`${BASEURL}/storytellings/authors/${id}`, { params })
      return ApiData.fromResponse(resp)
    } catch (err: any) {
      throw new ApiError(err)
    }
  }

  static async updateById (id: number, payload: any) {
    try {
      const resp = await axiosInstance.patch(`${BASEURL}/storytellings/authors/${id}`, payload)
      return ApiData.fromResponse(resp)
    } catch (err: any) {
      throw new ApiError(err)
    }
  }

  static async deleteById (id: number) {
    try {
      const resp = await axiosInstance.delete(`${BASEURL}/storytellings/authors/${id}`)
      return ApiData.fromResponse(resp)
    } catch (err: any) {
      throw new ApiError(err)
    }
  }
}

class Readers {
  static async track (storytellingId: number) {
    try {
      const resp = await axiosInstance.post(`${BASEURL}/storytellings/${storytellingId}/readers/track`)
      return ApiData.fromResponse(resp)
    } catch (err: any) {
      throw new ApiError(err)
    }
  }

  static async bookmark (storytellingId: number) {
    try {
      const resp = await axiosInstance.post(`${BASEURL}/storytellings/${storytellingId}/readers/bookmark`)
      return ApiData.fromResponse(resp)
    } catch (err: any) {
      throw new ApiError(err)
    }
  }

  static async unbookmark (storytellingId: number) {
    try {
      const resp = await axiosInstance.delete(`${BASEURL}/storytellings/${storytellingId}/readers/bookmark`)
      return ApiData.fromResponse(resp)
    } catch (err: any) {
      throw new ApiError(err)
    }
  }
}

class EpisodeReaders {
  static async track (episodeId: number) {
    try {
      const resp = await axiosInstance.post(`${BASEURL}/storytellings/episodes/${episodeId}/readers/track`)
      return ApiData.fromResponse(resp)
    } catch (err: any) {
      throw new ApiError(err)
    }
  }

  static async vote (episodeId: number) {
    try {
      const resp = await axiosInstance.post(`${BASEURL}/storytellings/episodes/${episodeId}/readers/vote`)
      return ApiData.fromResponse(resp)
    } catch (err: any) {
      throw new ApiError(err)
    }
  }

  static async devote (episodeId: number) {
    try {
      const resp = await axiosInstance.delete(`${BASEURL}/storytellings/episodes/${episodeId}/readers/vote`)
      return ApiData.fromResponse(resp)
    } catch (err: any) {
      throw new ApiError(err)
    }
  }
}

class Tags {
  static async create (payload: any) {
    try {
      const resp = await axiosInstance.post(`${BASEURL}/storytellings/tags`, payload)
      return ApiData.fromResponse(resp)
    } catch (err: any) {
      throw new ApiError(err)
    }
  }

  static async findMany (params: any = {}) {
    try {
      const resp = await axiosInstance.get(`${BASEURL}/storytellings/tags`, { params })
      return ApiData.fromResponse(resp)
    } catch (err: any) {
      throw new ApiError(err)
    }
  }

  static async findById (id: number) {
    try {
      const resp = await axiosInstance.get(`${BASEURL}/storytellings/tags/${id}`)
      return ApiData.fromResponse(resp)
    } catch (err: any) {
      throw new ApiError(err)
    }
  }

  static async updateById (id: number, payload: any) {
    try {
      const resp = await axiosInstance.patch(`${BASEURL}/storytellings/tags/${id}`, payload)
      return ApiData.fromResponse(resp)
    } catch (err: any) {
      throw new ApiError(err)
    }
  }

  static async deleteById (id: number) {
    try {
      const resp = await axiosInstance.delete(`${BASEURL}/storytellings/tags/${id}`)
      return ApiData.fromResponse(resp)
    } catch (err: any) {
      throw new ApiError(err)
    }
  }
}

class Categories {
  static async create (payload: any) {
    try {
      const resp = await axiosInstance.post(`${BASEURL}/storytellings/categories`, payload)
      return ApiData.fromResponse(resp)
    } catch (err: any) {
      throw new ApiError(err)
    }
  }

  static async findMany (params: any = {}) {
    try {
      const resp = await axiosInstance.get(`${BASEURL}/storytellings/categories`, { params })
      return ApiData.fromResponse(resp)
    } catch (err: any) {
      throw new ApiError(err)
    }
  }

  static async findById (id: number) {
    try {
      const resp = await axiosInstance.get(`${BASEURL}/storytellings/categories/${id}`)
      return ApiData.fromResponse(resp)
    } catch (err: any) {
      throw new ApiError(err)
    }
  }

  static async updateById (id: number, payload: any) {
    try {
      const resp = await axiosInstance.patch(`${BASEURL}/storytellings/categories/${id}`, payload)
      return ApiData.fromResponse(resp)
    } catch (err: any) {
      throw new ApiError(err)
    }
  }

  static async bulkUpdate (payload: any[]) {
    try {
      const resp = await axiosInstance.patch(`${BASEURL}/storytellings/categories/bulk-update`, { data: payload })
      return ApiData.fromResponse(resp)
    } catch (err: any) {
      throw new ApiError(err)
    }
  }

  static async deleteById (id: number) {
    try {
      const resp = await axiosInstance.delete(`${BASEURL}/storytellings/categories/${id}`)
      return ApiData.fromResponse(resp)
    } catch (err: any) {
      throw new ApiError(err)
    }
  }
}

class Comments {
  static async create (payload: any) {
    try {
      const resp = await axiosInstance.post(`${BASEURL}/storytellings/comments`, payload)
      return ApiData.fromResponse(resp)
    } catch (err: any) {
      throw new ApiError(err)
    }
  }

  static async findMany (params: any = {}) {
    try {
      const resp = await axiosInstance.get(`${BASEURL}/storytellings/comments`, { params })
      return ApiData.fromResponse(resp)
    } catch (err: any) {
      throw new ApiError(err)
    }
  }

  static async findById (id: number) {
    try {
      const resp = await axiosInstance.get(`${BASEURL}/storytellings/comments/${id}`)
      return ApiData.fromResponse(resp)
    } catch (err: any) {
      throw new ApiError(err)
    }
  }

  static async updateById (id: number, payload: any) {
    try {
      const resp = await axiosInstance.patch(`${BASEURL}/storytellings/comments/${id}`, payload)
      return ApiData.fromResponse(resp)
    } catch (err: any) {
      throw new ApiError(err)
    }
  }

  static async deleteById (id: number) {
    try {
      const resp = await axiosInstance.delete(`${BASEURL}/storytellings/comments/${id}`)
      return ApiData.fromResponse(resp)
    } catch (err: any) {
      throw new ApiError(err)
    }
  }
}

class Episodes {
  static Readers = EpisodeReaders
  static async create (payload: any) {
    try {
      const resp = await axiosInstance.post(`${BASEURL}/storytellings/episodes`, payload)
      return ApiData.fromResponse(resp)
    } catch (err: any) {
      throw new ApiError(err)
    }
  }

  static async findMany (params: any = {}) {
    try {
      const resp = await axiosInstance.get(`${BASEURL}/storytellings/episodes`, { params })
      return ApiData.fromResponse(resp)
    } catch (err: any) {
      throw new ApiError(err)
    }
  }

  static async findById (id: number, params: any = {}) {
    try {
      const resp = await axiosInstance.get(`${BASEURL}/storytellings/episodes/${id}`, { params })
      return ApiData.fromResponse(resp)
    } catch (err: any) {
      throw new ApiError(err)
    }
  }

  static async findContextById (id: number) {
    try {
      const resp = await axiosInstance.get(`${BASEURL}/storytellings/episodes/${id}/context`)
      return ApiData.fromResponse(resp)
    } catch (err: any) {
      throw new ApiError(err)
    }
  }

  static async updateById (id: number, payload: any) {
    try {
      const resp = await axiosInstance.patch(`${BASEURL}/storytellings/episodes/${id}`, payload)
      return ApiData.fromResponse(resp)
    } catch (err: any) {
      throw new ApiError(err)
    }
  }

  static async deleteById (id: number) {
    try {
      const resp = await axiosInstance.delete(`${BASEURL}/storytellings/episodes/${id}`)
      return ApiData.fromResponse(resp)
    } catch (err: any) {
      throw new ApiError(err)
    }
  }

  static async view (id: number) {
    try {
      const resp = await axiosInstance.post(`${BASEURL}/storytellings/episodes/${id}/view`)
      return ApiData.fromResponse(resp)
    } catch (err: any) {
      throw new ApiError(err)
    }
  }
}

export default class StorytellingsService {
  static Tags = Tags
  static Categories = Categories
  static Episodes = Episodes
  static Authors = Authors
  static Readers = Readers
  static Comments = Comments

  static async create (payload: any) {
    try {
      const resp = await axiosInstance.post(`${BASEURL}/storytellings`, payload)
      return ApiData.fromResponse(resp)
    } catch (err: any) {
      throw new ApiError(err)
    }
  }

  static async findMany (params: any = {}) {
    try {
      const resp = await axiosInstance.get(`${BASEURL}/storytellings`, { params })
      return ApiData.fromResponse(resp)
    } catch (err: any) {
      throw new ApiError(err)
    }
  }

  static async findById (id: number, params: any = {}) {
    try {
      const resp = await axiosInstance.get(`${BASEURL}/storytellings/${id}`, { params })
      return ApiData.fromResponse(resp)
    } catch (err: any) {
      throw new ApiError(err)
    }
  }

  static async findTracksById (id: number, params: any = {}) {
    try {
      const resp = await axiosInstance.get(`${BASEURL}/storytellings/${id}/tracks`, { params })
      return ApiData.fromResponse(resp)
    } catch (err: any) {
      throw new ApiError(err)
    }
  }

  static async updateById (id: number, payload: any) {
    try {
      const resp = await axiosInstance.patch(`${BASEURL}/storytellings/${id}`, payload)
      return ApiData.fromResponse(resp)
    } catch (err: any) {
      throw new ApiError(err)
    }
  }

  static async deleteById (id: number) {
    try {
      const resp = await axiosInstance.delete(`${BASEURL}/storytellings/${id}`)
      return ApiData.fromResponse(resp)
    } catch (err: any) {
      throw new ApiError(err)
    }
  }

  static async assignTag (id: number, name: string) {
    try {
      const resp = await axiosInstance.post(`${BASEURL}/storytellings/${id}/tags/${name}`)
      return ApiData.fromResponse(resp)
    } catch (err: any) {
      throw new ApiError(err)
    }
  }

  static async unassignTag (id: number, name: string) {
    try {
      const resp = await axiosInstance.delete(`${BASEURL}/storytellings/${id}/tags/${name}`)
      return ApiData.fromResponse(resp)
    } catch (err: any) {
      throw new ApiError(err)
    }
  }

  static async findContextById (id: number) {
    try {
      const resp = await axiosInstance.get(`${BASEURL}/storytellings/${id}/context`)
      return ApiData.fromResponse(resp)
    } catch (err: any) {
      throw new ApiError(err)
    }
  }
}
