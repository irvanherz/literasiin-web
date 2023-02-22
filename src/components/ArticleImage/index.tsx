import { DEFAULT_IMAGE } from 'libs/variables'
import { DetailedHTMLProps, ImgHTMLAttributes, useMemo } from 'react'
import styled, { CSSProperties } from 'styled-components'

const CoverWrapper = styled.div`
position: relative;
width: 100%;
padding-top: 50%;
img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
`

type ArticleImageProps = DetailedHTMLProps<ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement> & {
  article?: any
  containerStyle?: CSSProperties
  containerClassName?: string
}
export default function ArticleImage ({ article, containerStyle, containerClassName, ...props }: ArticleImageProps) {
  const src = useMemo(() => {
    const image = article?.image
    const objects: any[] = image?.meta?.objects || []
    const md = objects.find(object => object.id === 'md')
    return md?.url || DEFAULT_IMAGE
  }, [article])

  return (
    <CoverWrapper style={containerStyle} className={containerClassName}>
      <img src={src} {...props}/>
    </CoverWrapper>
  )
}
