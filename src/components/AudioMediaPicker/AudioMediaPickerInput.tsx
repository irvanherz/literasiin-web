import { CustomerServiceOutlined } from '@ant-design/icons'
import { Avatar, Card, Divider, Empty, List, Space } from 'antd'
import useCustomComponent from 'hooks/useCustomComponent'
import useMediaListInfinite from 'hooks/useMediaListInfinite'
import { formatAudioDuration } from 'libs/common'
import { AudioMedia } from 'models/Media'
import { DOMAttributes } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import styled from 'styled-components'
import AudioMediaPickerUploader from './AudioMediaPickerUploader'

const StyledSpace = styled(Space)`
.selected-media-item {
  border-color: green;
}
.audio-media-list .ant-row {
  margin: 0 !important;
}
`

type MediaItemProps = {
  media: any
  selected?: boolean
  onClick?: DOMAttributes<HTMLDivElement>['onClick']
}

export function MediaItem ({ media, selected, onClick }:MediaItemProps) {
  const med = new AudioMedia(media)
  return (
    <List.Item>
      <Card size='small' hoverable style={{ width: '100%' }} onClick={onClick} className={selected ? 'selected-media-item' : ''}>
        <Card.Meta
          avatar={<Avatar icon={<CustomerServiceOutlined />} size={48} shape='square' />}
          title={media?.name}
          description={formatAudioDuration(med.duration!)}
        />
      </Card>
    </List.Item>

  )
}

type MediaPickerProps = {
  filters?: any
  value?: any
  defaultValue?: any
  onChange?: (v: any) => void
}

export default function AudioMediaPickerInput ({ filters = {}, value, defaultValue, onChange }: MediaPickerProps) {
  const [computedValue, triggerValueChange] = useCustomComponent({ value, defaultValue, onChange })
  const selectedMediaId = computedValue?.id

  const { data, hasNextPage, fetchNextPage, refetch } = useMediaListInfinite({ ...filters, type: 'audio' })

  const mediaList = data?.pages.reduce((a, c) => ([...a, ...c.data]), [] as any[])
  const numMediaLoaded = mediaList?.length || 0

  const handleSelect = (media: any) => {
    triggerValueChange(media)
  }

  const handleAfterUploadDone = async (info: any) => {
    await refetch()
    const data = JSON.parse(info.file.xhr.response)

    triggerValueChange(data.data)
  }

  return (
    <StyledSpace direction="vertical" style={{ width: '100%' }}>
      <AudioMediaPickerUploader afterUploadDone={handleAfterUploadDone} />
      <Divider>or select previous uploads</Divider>
      <InfiniteScroll
        dataLength={numMediaLoaded}
        next={fetchNextPage}
        hasMore={!!hasNextPage}
        loader={<div style={{ textAlign: 'center' }}>Loading...</div>}
        scrollableTarget="scrollbar-target"
      >
        <List
          className='audio-media-list'
          grid={{ column: 1, gutter: 8 }}
          dataSource={mediaList}
          renderItem={media => (
            <MediaItem
              media={media}
              selected={media.id === selectedMediaId}
              onClick={() => handleSelect(media)}
            />
          )}
        />
      </InfiniteScroll>
      {!numMediaLoaded && (
        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
      )}
    </StyledSpace>
  )
}
