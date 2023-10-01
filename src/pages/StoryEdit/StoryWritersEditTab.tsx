import { UserAddOutlined } from '@ant-design/icons'
import { UserMinusIcon } from '@heroicons/react/24/solid'
import { Button, Modal, Tooltip, message } from 'antd'
import { useMutation, useQuery } from 'react-query'
import StoriesService from 'services/Stories'
import InviteWriterButton from './InviteWriterButton'

type WriterProps = {
  story: any
  writer: any
  afterDeleted?: () => void
}

function Writer ({ story, writer, afterDeleted }: WriterProps) {
  const connId = writer?.meta?.id
  const remover = useMutation(() => StoriesService.Writers.deleteById(connId))

  const handleDelete = () => {
    Modal.confirm({
      title: 'Confirm',
      content: 'Are you sure you want to delete this writer from this story?',
      centered: true,
      onOk: async () => {
        try {
          await remover.mutateAsync()
          if (afterDeleted) afterDeleted()
        } catch (err: any) {
          message.error(err?.message)
        }
      }
    })
  }

  return (
    <div className='bg-white p-4 rounded-lg shadow'>
      <div className='flex items-center'>
        <div className='flex-1'>
          <div className='font-black inline-flex items-center gap-4'>
            <span>{writer.fullName}</span>
            {writer?.meta?.role !== 'owner' && <Tooltip title="Hapus dari daftar"><button className='btn btn-xs btn-circle' onClick={handleDelete}><UserMinusIcon className='w-4' /></button></Tooltip>}
          </div>
          <div className='text-slate-500'>{writer.meta?.status}</div>
        </div>
        <div className='flex-none text-slate-600'>{writer.meta?.role}</div>
      </div>
    </div>
  )
}

type StoryWritersEditTabProps = { story: any }

export default function StoryWritersEditTab ({ story }: StoryWritersEditTabProps) {
  const storyId = story?.id
  const { data, refetch } = useQuery(`stories[${storyId}].writers`, () => StoriesService.Writers.findMany({ storyId }), { enabled: !!storyId })
  const writers: any[] = data?.data || []

  return (
    <div className='space-y-4'>
      <div className='space-y-2'>
        {writers.map(writer => <Writer key={writer.id} story={story} writer={writer} afterDeleted={refetch} />)}
      </div>
      <div className='bg-white p-4 rounded-lg shadow text-center'>
        <InviteWriterButton story={story} afterCreated={refetch}>
          <Button icon={<UserAddOutlined />}>Undang Penulis Lain</Button>
        </InviteWriterButton>
      </div>
    </div>
  )
}
