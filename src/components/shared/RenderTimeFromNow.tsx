import dayjs from 'dayjs'
import useLangContext from 'hooks/useLangContext'
import('dayjs/locale/id')

type RenderTimeFromNowProps = { timestamp: any }
export default function RenderTimeFromNow ({ timestamp }: RenderTimeFromNowProps) {
  const { lang } = useLangContext()
  return <>{dayjs(timestamp).locale(lang).fromNow()}</>
}
