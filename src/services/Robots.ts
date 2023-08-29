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
}
