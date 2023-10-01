import { axiosInstance } from 'libs/api'
import ApiData from 'models/ApiData'
import ApiError from 'models/ApiError'

const BASEURL = process.env.REACT_APP_API_BASEURL

export default class RobotsService {
  static async storyIdea (payload: any) {
    try {
      const resp = await axiosInstance.post(`${BASEURL}/robots/story-idea`, payload)
      return ApiData.fromResponse(resp)
    } catch (err: any) {
      throw new ApiError(err)
    }
  }

  static async buildStory (payload: any) {
    try {
      const resp = await axiosInstance.post(`${BASEURL}/robots/build-story`, payload)
      return ApiData.fromResponse(resp)
    } catch (err: any) {
      throw new ApiError(err)
    }
  }

  static async paraphrase (payload: any) {
    try {
      const resp = await axiosInstance.post(`${BASEURL}/robots/paraphrase`, payload)
      return ApiData.fromResponse(resp)
    } catch (err: any) {
      throw new ApiError(err)
    }
  }

  static async autofix (payload: any) {
    try {
      const resp = await axiosInstance.post(`${BASEURL}/robots/autofix`, payload)
      return ApiData.fromResponse(resp)
    } catch (err: any) {
      throw new ApiError(err)
    }
  }
}
