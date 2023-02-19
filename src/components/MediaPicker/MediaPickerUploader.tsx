import { InboxOutlined } from '@ant-design/icons'
import { message, notification, Progress, Upload, UploadProps } from 'antd'
import ImgCrop, { ImgCropProps } from 'antd-img-crop'
import MediaService from 'services/Media'

type MediaPickerUploaderProps = {
  afterUploadDone?: UploadProps['onChange']
  preset?: 'photo' | 'story-cover'
  cropProps?: Omit<ImgCropProps, 'children'>
}
export default function MediaPickerUploader ({ afterUploadDone, cropProps, preset = 'photo' }: MediaPickerUploaderProps) {
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
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!')
    }
    const isLt2M = file.size / 1024 / 1024 < 2
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!')
    }
    return isJpgOrPng && isLt2M
  }

  return (
    <ImgCrop {...cropProps}>
      <Upload.Dragger
        {...(MediaService.generateAntdUploadProps())}
        data={{ preset }}
        showUploadList={false}
        multiple={false}
        onChange={handleChange}
        beforeUpload={beforeUpload}
    >
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">Click or drag file to this area to upload</p>
        <p className="ant-upload-hint">
          Strictly prohibit from uploading company data or other band files
        </p>
      </Upload.Dragger>
    </ImgCrop>
  )
}
