import { Button, Input } from 'antd'
import { useState } from 'react'
import { FormattedMessage } from 'react-intl'
import styled from 'styled-components'

const Wrapper = styled.div`
display: flex;
gap: 16px;
.chat-input-left {
  flex: 1;
}
.chat-input-right {
  flex: 0;
}
`

type ChatInputProps = {
  room: any
  context: any
}

export default function ChatInput ({ room, context }: ChatInputProps) {
  const [message, setMessage] = useState('')
  const [isSending, setIsSending] = useState(false)

  const handleSend = async () => {
    if (!message) return
    try {
      setIsSending(true)
      await context.sendMessage({ roomId: room.id, message })
      setMessage('')
    } finally {
      setIsSending(false)
    }
  }

  return (
    <Wrapper>
      <div className="chat-input-left">
        <Input onPressEnter={handleSend} disabled={isSending} value={message} onChange={e => setMessage(e.target.value)} placeholder='Message...' />
      </div>
      <div className="chat-input-right">
        <Button loading={isSending} disabled={!message} onClick={handleSend}><FormattedMessage defaultMessage="Send" /></Button>
      </div>
    </Wrapper>
  )
}
