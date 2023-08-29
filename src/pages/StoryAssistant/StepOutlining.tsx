import { Button, Card, List, Space } from 'antd'
import { useEffect, useState } from 'react'
import { useMutation } from 'react-query'
import RobotsService from 'services/Robots'

type StepOutliningProps = {
  data: any
  onPrev: () => void
  onNext: (data: any) => void
}
export default function StepOutlining ({ data, onPrev, onNext }: StepOutliningProps) {
  const brief = data?.brief || ''
  const [idea, setIdea] = useState<any>({})
  const executor = useMutation<any, any, any>(payload => RobotsService.storyIdea(payload))

  useEffect(() => {
    executor.mutate({ text: brief }, {
      onSuccess: (result) => {
        setIdea(result.data)
      }
    })
  }, [])

  const handleNext = () => {
    onNext({ ...data, brief })
  }

  const handlePrev = () => onPrev?.()

  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <Card loading={executor.isLoading}>
        <Card.Meta
          title={idea.title}
          description={idea.description}
        />
        <List
          dataSource={idea.chapters}
          renderItem={(chapter: any) => (
            <List.Item>
              <List.Item.Meta
                title={chapter.title}
                description={
                  <ul>
                    {chapter.outlines.map((outline: string) => <li key={outline}>{outline}</li>)}
                  </ul>
                }
              />
            </List.Item>
          )}
        />
      </Card>
      <Space>
        <Button onClick={handlePrev}>Back</Button>
        <Button onClick={handleNext}>Next</Button>
      </Space>
    </Space>

  )
}
