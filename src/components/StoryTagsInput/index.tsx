import { Select, SelectProps } from 'antd'
import { useEffect, useState } from 'react'
import { useMutation } from 'react-query'
import StoriesService from 'services/Stories'

type StoryTagsInputProps = Omit<SelectProps, 'onChange'> & {
  story: any
}
export default function StoryTagsInput ({ story }: StoryTagsInputProps) {
  const storyId = story.id
  const [value, setValue] = useState<any[]>([])

  const setter = useMutation((name: any) => StoriesService.assignTag(storyId, name))
  const unsetter = useMutation((name: any) => StoriesService.unassignTag(storyId, name))

  useEffect(() => {
    if (story) {
      const val = (story?.tags || []).map((c:any) => ({ label: c.name, key: c.name, value: c.name }))
      setValue(val)
    }
  }, [story])
  const handleSetTag = (tag: any) => {
    const tagName = String(tag.value).toLowerCase().replace(/[^a-z0-9_]/g, '')
    setter.mutate(tagName, {
      onSuccess: () => {
        const newValue = [...value, { label: tagName, key: tagName, value: tagName }]
        setValue(newValue)
      }
    })
  }
  const handleUnsetTag = (tag: any) => {
    unsetter.mutate(tag.value, {
      onSuccess: () => {
        const newValue = [...value].filter((c:any) => c.value !== tag.value)
        setValue(newValue)
      }
    })
  }
  return (
    <Select
      loading={setter.isLoading || unsetter.isLoading}
      mode='tags'
      labelInValue
      value={value}
      onSelect={handleSetTag}
      onDeselect={handleUnsetTag}
    />
  )
}
