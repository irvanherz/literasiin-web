import dayjs from 'dayjs'

export default class Media {
  id?: number
  meta?: any

  constructor (data: any) {
    this.id = data?.id
    this.meta = data?.meta
  }

  get sm () {
    const objects: any[] = this.meta?.objects || []
    const sm = objects.find(object => object.id === 'sm')
    return sm
  }

  get md () {
    const objects: any[] = this.meta?.objects || []
    const md = objects.find(object => object.id === 'md')
    return md
  }

  get lg () {
    const objects: any[] = this.meta?.objects || []
    const lg = objects.find(object => object.id === 'lg')
    return lg
  }
}

export class AudioMedia {
  id?: number
  meta?: any

  constructor (data: any) {
    this.id = data?.id
    this.meta = data?.meta
  }

  get duration () {
    const objects: any[] = this.meta?.objects || []
    const audio = objects[0]
    const durationSeconds = +audio?.meta?.format?.duration
    return durationSeconds ? dayjs.duration(durationSeconds, 'seconds') : undefined
  }
}
