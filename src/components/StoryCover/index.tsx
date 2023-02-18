import { DetailedHTMLProps, ImgHTMLAttributes } from 'react'
import styled, { CSSProperties } from 'styled-components'

const CoverWrapper = styled.div`
position: relative;
width: 100%;
padding-top: 150%;
img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
`

type StoryCoverProps = DetailedHTMLProps<ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement> & {
  containerStyle?: CSSProperties
  containerClassName?: string
}
export default function StoryCover ({ containerStyle, containerClassName, ...props }: StoryCoverProps) {
  return (
    <CoverWrapper style={containerStyle} className={containerClassName}>
      <img {...props}/>
    </CoverWrapper>
  )
}
