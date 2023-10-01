import { BuildingOfficeIcon, EnvelopeOpenIcon, PhoneIcon } from '@heroicons/react/24/solid'
import { Modal, message } from 'antd'
import Layout from 'components/Layout'
import PageHeader from 'components/PageHeader'
import useGeneralUserMessageCreate from 'hooks/useGeneralUserMessageCreate'
import { useCallback } from 'react'
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3'
import { FormProvider, SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form'
import ContactForm from './ContactForm'

export default function ContactUs () {
  const { executeRecaptcha } = useGoogleReCaptcha()
  const creator = useGeneralUserMessageCreate()
  const form = useForm()

  // Create an event handler so you can call the verification on button click event or form submit
  const handleRecaptchaVerify = useCallback(async () => {
    if (!executeRecaptcha) {
      console.log('Execute recaptcha not yet available')
      return
    }

    const token = await executeRecaptcha('yourAction')
    return token
    // Do whatever you want with the token
  }, [executeRecaptcha])

  const handleSubmit: SubmitHandler<any> = async (payload: any) => {
    const captchaToken = await handleRecaptchaVerify()
    if (!captchaToken) message.error('Captcha validation failed!')
    payload.captchaToken = captchaToken
    creator.mutate(payload, {
      onSuccess: data => {
        // form.resetFields()
        Modal.success({
          title: 'Success',
          content: 'Your message already sent. We will response your message to your email or phone after 1-3 business days.',
          centered: true
        })
      },
      onError: (err) => {
        message.error(err.message)
      }
    })
  }

  const handleSubmitError: SubmitErrorHandler<any> = async (values: any) => {}

  return (
    <Layout.Default
      beforeContent={
        <PageHeader
          title='Kontak Kami'
          description='Berikan kami pertanyaan'
        />
      }
    >
      <div className='py-4'>
        <div className='container flex gap-4 flex-col md:flex-row'>
          <div className='w-full md:w-1/3 border rounded-lg p-4 space-y-4 bg-white'>
            <div className='font-black text-2xl'>Informasi Kontak</div>
            <div className='space-y-4'>
              <div className='flex gap-4'>
                <div className='flex-none'><BuildingOfficeIcon className='w-4 inline' /></div>
                <div className='flex-1'>
                  <div className='font-bold'>Kantor</div>
                  <div className='text-slate-500 text-sm'>Jl Pembangunan no 20, Petojo Utara, Gambir, Kota Jakarta Pusat, DKI Jakarta</div>
                </div>
              </div>
              <div className='flex gap-4'>
                <div className='flex-none'><EnvelopeOpenIcon className='w-4 inline' /></div>
                <div className='flex-1'>
                  <div className='font-bold'>Email</div>
                  <div className='text-slate-500 text-sm'>cs@literasiin.com</div>
                </div>
              </div>
              <div className='flex gap-4'>
                <div className='flex-none'><PhoneIcon className='w-4 inline' /></div>
                <div className='flex-1'>
                  <div className='font-bold'>Telepon</div>
                  <div className='text-slate-500 text-sm'>+62 85156818651</div>
                </div>
              </div>
            </div>
          </div>
          <div className='w-full md:w-2/3 border rounded-lg p-4 space-y-4 bg-white'>
            <div className='font-black text-2xl'>Kirim Pesan</div>
            <div>
              <FormProvider {...form}>
                <ContactForm />
              </FormProvider>
            </div>
            <div>
              <button disabled={creator.isLoading} className='btn btn-sm btn-primary' onClick={form.handleSubmit(handleSubmit, handleSubmitError)}>Kirim</button>
            </div>
          </div>
        </div>
      </div>
    </Layout.Default>
  )
}
