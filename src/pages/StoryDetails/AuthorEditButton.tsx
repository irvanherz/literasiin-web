import { EditFilled } from '@ant-design/icons'
import { Button } from 'antd'
import useCurrentUser from 'hooks/useCurrentUser'
import { slugifyContentId } from 'libs/slug'
import { Link } from 'react-router-dom'

type AuthorEditButtonProps = {
  story: any
}
export default function AuthorEditButton ({ story }: AuthorEditButtonProps) {
  const currentUser = useCurrentUser()
  return currentUser?.id === story?.userId
    ? (
      <Link to={`/stories/${slugifyContentId(story)}/edit`}>
        <Button key='settings' shape='circle' icon={<EditFilled />} />
      </Link>
      )
    : null
}
