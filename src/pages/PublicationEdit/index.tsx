import { Button, Card, Checkbox, Form, List, message, Modal, Result, Space, Steps, Typography } from 'antd'
import Layout from 'components/Layout'
import OrderPayButton from 'components/shared/PayOrderButton'
import PublicationForm from 'components/shared/PublicationForm'
import PublicationUploadsForm from 'components/shared/PublicationUploadsForm'
import RenderTimeFromNow from 'components/shared/RenderTimeFromNow'
import ShippingMethodInput from 'components/ShippingMethodInput'
import usePublication from 'hooks/usePublication'
import usePublicationCommit from 'hooks/usePublicationCommit'
import usePublicationFiles from 'hooks/usePublicationFiles'
import usePublicationUpdate from 'hooks/usePublicationUpdate'
import { useEffect, useMemo, useState } from 'react'
import { Helmet } from 'react-helmet'
import { Link, useParams } from 'react-router-dom'
import ReviewSection from './ReviewSection'

export default function PublicationEdit () {
  const params = useParams()
  const publicationId = +(params?.publicationId || 0)
  const { data, refetch } = usePublication(publicationId, { includeAddress: true })
  const { data: dataFiles, refetch: refetchFiles } = usePublicationFiles({ publicationId }, { enabled: !!publicationId })
  const publication = data?.data
  const files = dataFiles?.data || []
  const [step, setStep] = useState(0)
  const [form] = Form.useForm()
  const [checkedAgreement1, setCheckedAgreement1] = useState(false)
  const [checkedAgreement2, setCheckedAgreement2] = useState(false)
  const [shipping, setShipping] = useState(null)

  const updater = usePublicationUpdate(publicationId)
  const commiter = usePublicationCommit(publicationId)

  const formInitialValues = useMemo(() => {
    if (publication) {
      const { packageId, paperType, numBwPages, numColorPages, numCopies } = publication.meta || {}
      return { packageId, paperType, numBwPages, numColorPages, numCopies, ...publication }
    }
    return {}
  }, [publication])

  useEffect(() => {
    if (publication?.status === 'payment') {
      setStep(3)
    }
    form.resetFields()
    setShipping(publication?.meta?.shipping)
  }, [publication, step])

  const handleBasicInfoFinished = (values: any) => {
    const { packageId, paperType, numBwPages, numColorPages, numCopies, ...payload } = values
    // cleanup
    payload.coverId = payload.cover?.id || null
    if (payload.cover) delete payload.cover
    payload.meta = { packageId, paperType, numBwPages, numColorPages, numCopies }
    // send
    updater.mutate(payload, {
      onSuccess: () => {
        refetch()
        setStep(step + 1)
      },
      onError: (err) => {
        message.error(err?.message || 'Something went wrong')
      }
    })
  }

  const handleBasicInfoFinishFailed = () => {
    message.error('Check all fields and then try again')
  }

  const handleSubmitAdditionalInfo = () => {
    if (!files.length) { return message.error('Files not yet uploaded') }
    if (!shipping) { return message.error('Shipping method not yet selected') }
    const meta = { ...publication.meta, shipping }
    updater.mutate({ meta }, {
      onSuccess: async () => {
        refetch()
        setStep(step + 1)
      },
      onError: (err) => {
        message.error(err?.message || 'Something went wrong')
      }
    })
  }

  const handleCommit = () => {
    Modal.confirm({
      centered: true,
      title: 'Confirm',
      content: 'Setelah klik lanjut, data akan dikirim Anda akan diarahkan ke tahap pembayaran. Setelah itu Anda TIDAK diizinkan mengubah detail publikasi. Silahkan klik lanjut jika sudah yakin.',
      okText: 'Lanjut',
      cancelText: 'Periksa Lagi',
      onOk: async () => {
        try {
          await commiter.mutateAsync(undefined)
          setStep(step + 1)
          return
        } catch (err: any) {
          message.error(err?.message || 'Something went wrong')
        }
      }
    })
  }

  const handlePaymentSuccess = () => {
    setStep(step + 1)
  }

  return (
    <Layout.Default>
      <Layout.Scaffold
        bodyStyle={{ padding: '16px 0' }}
        title="Publish"
        description="Publish your book"
      >
        <Space direction='vertical' style={{ width: '100%' }}>
          <Steps
            responsive
            current={step}
            items={[
              { title: 'Basic Informations', description: 'Fill some basic informations' },
              { title: 'Details & Upload', description: 'Provide details about your publications' },
              { title: 'Review', description: 'Check your publication request' },
              { title: 'Payment', description: 'Pay your invoice' },
              { title: 'Completed' }
            ]}
            />
          <Card>
            {step === 0 && (
              <Space direction='vertical' style={{ width: '100%' }}>
                <Form
                  form={form}
                  initialValues={formInitialValues}
                  wrapperCol={{ span: 24 }}
                  labelCol={{ span: 24 }}
                  onFinish={handleBasicInfoFinished}
                  onFinishFailed={handleBasicInfoFinishFailed}
                >
                  <PublicationForm />
                </Form>
                <Space style={{ justifyContent: 'center', width: '100%' }}>
                  <Button disabled>Previous</Button>
                  <Button type='primary' onClick={form.submit}>Next</Button>
                </Space>
              </Space>
            )}
            {step === 1 && (
              <Space direction='vertical' style={{ width: '100%' }}>
                <PublicationUploadsForm publication={publication} afterUploadDone={() => refetchFiles()} />
                <List
                  bordered
                  dataSource={files}
                  renderItem={(file: any) => (
                    <List.Item extra={<RenderTimeFromNow timestamp={file?.createdAt} />}>
                      <List.Item.Meta
                        title={file?.media?.meta?.originalName}
                      />
                    </List.Item>
                  )}
                />
                <ShippingMethodInput publication={publication} value={shipping} onChange={setShipping} />
                <Space style={{ justifyContent: 'center', width: '100%' }}>
                  <Button onClick={() => setStep(step - 1)}>Previous</Button>
                  <Button disabled={!shipping || !files?.length} type='primary' onClick={handleSubmitAdditionalInfo}>Next</Button>
                </Space>
              </Space>
            )}
            {step === 2 && (
              <Space direction='vertical' style={{ width: '100%' }}>
                <ReviewSection publication={publication}/>
                <Card type='inner'>
                  <Space direction='vertical' style={{ width: '100%' }}>
                    <Checkbox checked={checkedAgreement1} onChange={e => setCheckedAgreement1(e.target.checked)}>Dari data tersebut maka kami melakukan kalkulasi bahwa buku akan dijual seharga (Harga Cetak + Royalti + Biaya Admin). Jika penulis melakukan discound pada produk maka kami akan memotong royalti penulis. Terkecuali program potongan harga di berikan oleh Literasiin</Checkbox>
                    <Checkbox checked={checkedAgreement2} onChange={e => setCheckedAgreement2(e.target.checked)}>Dengan mengirim naskah dan menerbitkan naskah maka penulis telah membaca memehami panduaan dan menyetujui pada lembar kontrak yang sudah kami buat. Jika belum silahkan luangkan sejanak untuk membacanya . Layanan dan Panduan.</Checkbox>
                  </Space>
                </Card>
                <Space style={{ justifyContent: 'center', width: '100%' }}>
                  <Button onClick={() => setStep(step - 1)}>Previous</Button>
                  <Button disabled={!checkedAgreement1 || !checkedAgreement2} type='primary' onClick={handleCommit}>Continue Payment</Button>
                </Space>
              </Space>
            )}
            {step === 3 && (
              <Space direction='vertical' style={{ width: '100%' }}>
                <Result
                  status='info'
                  title='Silahkan Lakukan Pembayaran'
                  subTitle={
                    <Space direction='vertical' style={{ width: '100%' }}>
                      <Typography.Paragraph>Setelah pembayaran diterima, tim kami akan segera memproses publikasi tulisan Anda. Mohon pastikan nomor telepon Anda aktif agar tim kami bisa menghubungi Anda.</Typography.Paragraph>
                      <OrderPayButton
                        orderId={publication?.orderId}
                        onSuccess={handlePaymentSuccess}
                      >
                        <Button type='primary'>Bayar Sekarang</Button>
                      </OrderPayButton>
                    </Space>
                  }
                />
              </Space>
            )}
            {step === 4 && (
              <Space direction='vertical' style={{ width: '100%' }}>
                <Result
                  status='success'
                  title='Pembayaran Berhasil'
                  subTitle={
                    <Space direction='vertical' style={{ width: '100%' }}>
                      <Typography.Paragraph>Pemayaran Anda sudah kami terima. Selanjutnya kami akan memproses publikasi Anda. Status publikasi bisa Anda periksa di profil.</Typography.Paragraph>
                      <Link to='/users/me'>
                        <Button type='primary'>Lihat Status Publikasi Saya</Button>
                      </Link>
                    </Space>
                  }
                />
              </Space>
            )}
          </Card>
        </Space>
      </Layout.Scaffold>
      <Helmet>
        <title>Publish a Book - Literasiin</title>
      </Helmet>
    </Layout.Default>
  )
}
