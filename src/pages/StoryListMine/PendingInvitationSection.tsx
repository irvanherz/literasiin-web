import { Alert, Button, List, message, Modal } from 'antd'
import RenderTimeFromNow from 'components/shared/RenderTimeFromNow'
import useAcceptStoryWriterInvitation from 'hooks/useAcceptStoryWriterInvitation'
import useRejectStoryWriterInvitation from 'hooks/useRejectStoryWriterInvitation'
import useStoryWriterInvitations from 'hooks/useStoryWriterInvitations'
import { useState } from 'react'
import { FormattedMessage } from 'react-intl'

type InvitationListItemProps = {
  invitation: any
  afterUpdated?: () => void
}

function InvitationListItem ({ invitation, afterUpdated }: InvitationListItemProps) {
  const acceptor = useAcceptStoryWriterInvitation(invitation.id)
  const rejector = useRejectStoryWriterInvitation(invitation.id)

  const handleAccept = () => {
    acceptor.mutate(undefined, {
      onSuccess: () => {
        afterUpdated && afterUpdated()
      },
      onError: (err: any) => {
        message.error(err?.message)
      }
    })
  }

  const handleReject = () => {
    rejector.mutate(undefined, {
      onSuccess: () => {
        afterUpdated && afterUpdated()
      },
      onError: (err: any) => {
        message.error(err?.message)
      }
    })
  }

  return (
    <List.Item
      actions={[
        <Button loading={acceptor.isLoading} key='accept' type='primary' onClick={handleAccept}><FormattedMessage defaultMessage="Accept" /></Button>,
        <Button loading={rejector.isLoading} key='reject' onClick={handleReject}><FormattedMessage defaultMessage="Reject" /></Button>
      ]}
    >
      <List.Item.Meta
        title={`Invited to be ${invitation.role} for '${invitation.story?.title}'`}
        description={<RenderTimeFromNow timestamp={invitation.createdAt} />}
      />
    </List.Item>
  )
}

export default function PendingInvitationSection () {
  const [open, setOpen] = useState(false)
  const { data, refetch } = useStoryWriterInvitations({ userId: 'me', status: 'unapproved' })
  const unapprovedInvitations = data?.data || []

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  return unapprovedInvitations.length
    ? (
      <>
        <Alert
          type='warning'
          message={<FormattedMessage defaultMessage='You have pending invitation' />}
          description={<FormattedMessage defaultMessage='Other user are inviting you to collaborate for their story.' />}
          action={<Button type='primary' onClick={handleOpen}>{<FormattedMessage defaultMessage='Review' />}</Button>}
          style={{ marginTop: 16 }}
        />
        <Modal
          centered
          open={open}
          title={<FormattedMessage defaultMessage="Pending Invitations" />}
          onCancel={handleClose}
          footer={null}
        >
          <List
            dataSource={unapprovedInvitations}
            renderItem={invitation => <InvitationListItem invitation={invitation} afterUpdated={refetch} />}
          />
        </Modal>
      </>

      )
    : null
}
