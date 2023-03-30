import { Avatar, Button, List, Modal } from 'antd'
import { DEFAULT_PHOTO } from 'libs/variables'
import { useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import { useInfiniteQuery } from 'react-query'
import { useNavigate } from 'react-router-dom'
import UsersService from 'services/Users'

type UserItemProps = { user: any, onClick: (user: any) => void }
function UserItem ({ user, onClick }: UserItemProps) {
  const objects: any[] = user?.photo?.meta?.objects || []
  const md = objects.find(object => object.id === 'md')

  const handleClick = () => {
    onClick(user)
  }
  return (
    <List.Item style={{ cursor: 'pointer' }} onClick={handleClick}>
      <List.Item.Meta
        style={{ alignItems: 'center' }}
        avatar={<Avatar size='large' src={md?.url || DEFAULT_PHOTO} />}
        title={user?.fullName}
        description={`@${user?.username}`}
      />
    </List.Item>
  )
}

type FollowingButtonProps = {
  user: any
  context: any
}

export default function FollowingButton ({ user, context }: FollowingButtonProps) {
  const userId = user?.id
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const { data, hasNextPage, fetchNextPage } = useInfiniteQuery(
    [`users.[${userId}].following.infinite`],
    ({ pageParam }) => UsersService.Connections.findManyFollowingByUserId(userId, { page: pageParam }),
    {
      getNextPageParam: ({ meta }) => (meta.page < meta.numPages) ? meta.page + 1 : undefined,
      getPreviousPageParam: ({ meta }) => (meta.page > 1) ? meta.page - 1 : undefined,
      enabled: open
    }
  )

  const users = data?.pages?.reduce<any>((a, c) => {
    return [...a, ...c?.data]
  }, [])

  const numMediaLoaded = data?.pages
    ? data.pages.reduce((a, c) => {
      return a + c.data.length
    }, 0)
    : 0

  const handleViewProfile = (user: any) => {
    handleClose()
    navigate(`/users/${user?.username}`)
  }

  return (
    <>
      <Button onClick={handleOpen} type='ghost' style={{ display: 'inline-block', height: 'auto' }}>
        <div>{context?.numFollowing || 0}</div>
        <div>Following</div>
      </Button>
      <Modal
        centered
        open={open}
        onCancel={handleClose}
        footer={null}
      >
        <InfiniteScroll
          dataLength={numMediaLoaded}
          next={fetchNextPage}
          hasMore={!!hasNextPage}
          loader={<div style={{ textAlign: 'center' }}>Loading...</div>}
          scrollableTarget="scrollbar-target"
        // endMessage={<Typography.Text></Typography.Text>}
        >
          <List
            size='small'
            dataSource={users}
            renderItem={(user: any) => <UserItem user={user} onClick={handleViewProfile} />}
        />
        </InfiniteScroll>
      </Modal>
    </>
  )
}
