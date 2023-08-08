import { DEFAULT_IMAGE } from 'libs/variables'
import { DetailedHTMLProps, ImgHTMLAttributes, useMemo } from 'react'
import styled, { CSSProperties } from 'styled-components'

const CoverWrapper = styled.div`
position: relative;
width: 100%;
padding-top: 100%;
img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
`

type StorytellingCoverProps = DetailedHTMLProps<ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement> & {
  storytelling?: any
  containerStyle?: CSSProperties
  containerClassName?: string
}
export default function StorytellingCover ({ storytelling, containerStyle, containerClassName, ...props }: StorytellingCoverProps) {
  const src = useMemo(() => {
    const cover = storytelling?.cover
    const objects: any[] = cover?.meta?.objects || []
    const md = objects.find(object => object.id === 'md')
    return md?.url || DEFAULT_IMAGE
  }, [storytelling])

  return (
    <CoverWrapper style={containerStyle} className={containerClassName}>
      <img src={src} {...props}/>
    </CoverWrapper>
  )
}
