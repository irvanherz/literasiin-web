import { Col, Empty, Image, Row, Space } from 'antd'
import { ImgCropProps } from 'antd-img-crop'
import useCustomComponent from 'hooks/useCustomComponent'
import { DEFAULT_IMAGE } from 'libs/variables'
import { DOMAttributes, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import { useInfiniteQuery } from 'react-query'
import MediaService from 'services/Media'
import styled from 'styled-components'
import MediaPickerUploader from './MediaPickerUploader'

const MediaWrapper = styled.div`
width: 100%;
position: relative;
border: 4px solid transparent;
line-height: 0;
&>img {
  width: 100%;
}
&.media-selected {
  border: 4px solid rgb(13 110 253 / 25%);
}
`
type MediaItemProps = {
  media: any
  selected?: boolean
  onClick?: DOMAttributes<HTMLDivElement>['onClick']
}

export function MediaItem ({ media, selected, onClick }:MediaItemProps) {
  const [preview, setPreview] = useState(false)
  const md = media?.meta?.objects?.find((object: any) => object.id === 'md')

  return (
    <MediaWrapper className={selected ? 'media-selected' : ''} onClick={onClick}>
      <img src={md?.url || DEFAULT_IMAGE} />
      <Image
        style={{ display: 'none' }}
        preview={{ visible: preview, onVisibleChange: setPreview }}
        src={md?.url || DEFAULT_IMAGE}
    />
    </MediaWrapper>

  )
}

type MediaPickerProps = {
  filters?: any
  value?: any
  defaultValue?: any
  onChange?: (v: any) => void
  preset?: 'photo' | 'story-cover' | 'article-image'
  cropProps?: Omit<ImgCropProps, 'children'>
}

export default function MediaPickerInput ({ filters = {}, value, defaultValue, onChange, preset = 'photo', cropProps }: MediaPickerProps) {
  const [computedValue, triggerValueChange] = useCustomComponent({ value, defaultValue, onChange })
  const selectedMediaId = computedValue?.id

  const { data, hasNextPage, fetchNextPage, refetch } = useInfiniteQuery(
    ['media.[].infinite', filters],
    ({ pageParam }) => MediaService.findMany({ ...filters, page: pageParam }),
    {
      getNextPageParam: ({ meta }) => (meta.page < meta.numPages) ? meta.page + 1 : undefined,
      getPreviousPageParam: ({ meta }) => (meta.page > 1) ? meta.page - 1 : undefined
    }
  )

  const numMediaLoaded = data
    ? data.pages.reduce((a, c) => {
      return a + c.data.length
    }, 0)
    : 0

  const handleSelect = (media: any) => {
    triggerValueChange(media)
  }

  const handleAfterUploadDone = async (info: any) => {
    await refetch()
    const data = JSON.parse(info.file.xhr.response)

    triggerValueChange(data.data)
  }

  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <MediaPickerUploader afterUploadDone={handleAfterUploadDone} cropProps={cropProps} preset={preset} />
      <InfiniteScroll
        dataLength={numMediaLoaded}
        next={fetchNextPage}
        hasMore={!!hasNextPage}
        loader={<div style={{ textAlign: 'center' }}>Loading...</div>}
        scrollableTarget="scrollbar-target"
        // endMessage={<Typography.Text></Typography.Text>}
        >
        <Row gutter={[16, 16]} style={{ width: '100%' }}>
          {data?.pages.map(page => {
            const mediaList = page.data || []
            return mediaList.map((media: any) => (
              <Col span={6} key={media.id}>
                <MediaItem
                  media={media}
                  selected={media.id === selectedMediaId}
                  onClick={() => handleSelect(media)}
                />
              </Col>
            ))
          })}
        </Row>

      </InfiniteScroll>
      {!!data?.pages?.length && (
        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
      )}
    </Space>
  )
}
