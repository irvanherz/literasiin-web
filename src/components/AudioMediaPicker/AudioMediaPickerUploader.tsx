import { InboxOutlined } from '@ant-design/icons'
import { message, notification, Progress, Upload, UploadProps } from 'antd'
import { FormattedMessage } from 'react-intl'
import MediaService from 'services/Media'

type AudioMediaPickerUploaderProps = {
  afterUploadDone?: UploadProps['onChange']
}
export default function AudioMediaPickerUploader ({ afterUploadDone }: AudioMediaPickerUploaderProps) {
  const handleChange: UploadProps['onChange'] = (info) => {
    const { status } = info.file
    if (status === 'uploading') {
      notification.info({
        key: info.file.uid,
        duration: null,
        message: `Uploading ${info.file.name}`,
        description: <Progress size='small' percent={info.file.percent} />
      })
    } else if (status === 'done') {
      notification.success({
        key: info.file.uid,
        message: 'Upload completed',
        description: info.file.name
      })
      afterUploadDone?.(info)
    } else if (status === 'error') {
      notification.error({
        key: info.file.uid,
        message: 'Upload failed',
        description: info.file.name
      })
    }
  }

  const beforeUpload: UploadProps['beforeUpload'] = (file) => {
    const isMp3 = file.type === 'audio/mp3' || file.type === 'audio/mpeg'
    if (!isMp3) {
      message.error('You can only upload MP3 file!')
    }
    const isLt50M = file.size / 1024 / 1024 < 50
    if (!isLt50M) {
      message.error('File must smaller than 50MB!')
    }
    return isMp3 && isLt50M
  }

  return (
    <Upload.Dragger
      {...(MediaService.generateSpecificAntdUploadProps('audio'))}
      data={{ }}
      showUploadList={false}
      multiple={false}
      onChange={handleChange}
      beforeUpload={beforeUpload}
    >
      <p className="ant-upload-drag-icon">
        <InboxOutlined />
      </p>
      <p className="ant-upload-text"><FormattedMessage defaultMessage='Click or drag file to this area to upload'/></p>
      <p className="ant-upload-hint">
        <FormattedMessage defaultMessage='Strictly prohibit from uploading company data or other band files'/>
      </p>
    </Upload.Dragger>
  )
}
