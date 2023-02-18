import { AxiosResponse } from 'axios'

export default class ApiData {
  public data?: any
  public meta?: any

  constructor (data?: any, meta?: any) {
    this.data = data
    this.meta = meta
  }

  static fromResponse (r: AxiosResponse) {
    const data = r.data.data
    const meta = r.data?.meta || {}
    return new ApiData(data, meta)
  }
}
