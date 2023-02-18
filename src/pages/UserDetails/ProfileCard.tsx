import { Card, Divider, Space } from 'antd'
import dayjs from 'dayjs'
type ProfileCardProps = {
  user: any
}
export default function ProfileCard ({ user }: ProfileCardProps) {
  const joinDate = dayjs(user?.createdAt).fromNow()
  return (
    <Card>
      <Space direction='vertical'>
        <div>{user?.bio || <i>Empty bio</i>}</div>
        <div>Joined {joinDate}</div>
      </Space>

      <Divider />
      <div>Follower list</div>
      <Divider />
      <div>Share links</div>
    </Card>
  )
}
