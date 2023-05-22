/* eslint-disable prefer-promise-reject-errors */
import { InboxOutlined } from '@ant-design/icons'
import { message, notification, Progress, Upload, UploadProps } from 'antd'
import PublicationsService from 'services/Publications'

type PublicationFileUploaderProps = {
  publication: any
  afterUploadDone?: UploadProps['onChange']
}
export default function PublicationFileUploader ({ publication, afterUploadDone }: PublicationFileUploaderProps) {
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
    const isLt2M = file.size / 1024 / 1024 < 2
    if (!isLt2M) {
      message.error('File must smaller than 2MB!')
    }
    return isLt2M
  }

  return (
    <Upload.Dragger
      {...(PublicationsService.Files.generateAntdUploadProps())}
      data={{ publicationId: publication.id }}
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
        Support for a single or bulk upload. Strictly prohibited from uploading company data or other
        banned files.
      </p>
    </Upload.Dragger>
  )
}
