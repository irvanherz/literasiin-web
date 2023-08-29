/* eslint-disable no-unused-vars */
import { Space, Steps } from 'antd'
import Layout from 'components/Layout'
import { useState } from 'react'
import StepBrief from './StepBrief'
import StepOutlining from './StepOutlining'

export default function StoryAssistant () {
  const [step, setStep] = useState(0)
  const [data, setData] = useState({})

  const handlePrev = () => {
    setStep(step - 1)
  }

  const handleNext = (data: any) => {
    setData(data)
    setStep(step + 1)
  }

  return (
    <Layout.Default>
      <Layout.Scaffold
        title="Story Ideas"
        description="Easily find idea with AI"
        bodyStyle={{ padding: '16px 0' }}
      >
        <Space direction='vertical' style={{ width: '100%' }}>
          <Steps
            current={step}
            items={[
              { title: 'Brief', description: 'Jelaskan cerita yang ingin kamu buat' },
              { title: 'Get Outline', description: 'Dapatkan hasil outline cerita' },
              { title: 'Start Writing', description: 'Simpan outline dan lanjutkan menulis' }
            ]}
          />
          {step === 0 && (<StepBrief data={data} onPrev={handlePrev} onNext={handleNext} />)}
          {step === 1 && (<StepOutlining data={data} onPrev={handlePrev} onNext={handleNext} />)}
        </Space>
      </Layout.Scaffold>
    </Layout.Default>
  )
}
