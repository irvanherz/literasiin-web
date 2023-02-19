import { Avatar, Button, List, Modal } from 'antd'
import { useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import { useInfiniteQuery } from 'react-query'
import UsersService from 'services/Users'

type FollowersButtonProps = {
  user: any
}

export default function FollowersButton ({ user }: FollowersButtonProps) {
  const userId = user?.id
  const [open, setOpen] = useState(false)

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const { data, hasNextPage, fetchNextPage } = useInfiniteQuery(
    [`users.[${userId}].followers.infinite`],
    ({ pageParam }) => UsersService.Connections.findManyFollowersByUserId(userId, { page: pageParam }),
    {
      getNextPageParam: ({ meta }) => (meta.page < meta.numPages) ? meta.page + 1 : undefined,
      getPreviousPageParam: ({ meta }) => (meta.page > 1) ? meta.page - 1 : undefined
    }
  )

  const numUsers = data?.pages?.[0]?.meta?.numItems
  const users = data?.pages?.reduce<any>((a, c) => {
    return [...a, ...c?.data]
  }, [])

  const numMediaLoaded = data?.pages
    ? data.pages.reduce((a, c) => {
      return a + c.data.length
    }, 0)
    : 0

  return (
    <>
      <Button onClick={handleOpen} type='ghost' style={{ display: 'inline-block', height: 'auto' }}>
        <div>{numUsers}</div>
        <div>Followers</div>
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
            renderItem={(user: any) => (
              <List.Item>
                <List.Item.Meta
                  style={{ alignItems: 'center' }}
                  avatar={<Avatar size='large' />}
                  title={user?.fullName}
                  description={`@${user?.username}`}
              />
              </List.Item>
            )}
        />
        </InfiniteScroll>
      </Modal>
    </>
  )
}
