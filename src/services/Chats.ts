import { axiosInstance } from 'libs/api'
import ApiData from 'models/ApiData'
import ApiError from 'models/ApiError'

const BASEURL = process.env.REACT_APP_API_BASEURL

export default class ChatsService {
  static async createRoomWith (userId: any) {
    try {
      const resp = await axiosInstance.post(`${BASEURL}/chats/with/${userId}`)
      return ApiData.fromResponse(resp)
    } catch (err: any) {
      throw new ApiError(err)
    }
  }
}
