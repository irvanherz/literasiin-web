import { CredentialResponse, GoogleLogin } from '@react-oauth/google'
import { message } from 'antd'
import { getMessaging, getToken } from 'firebase/messaging'
import useAuthContext from 'hooks/useAuthContext'
import { useMutation } from 'react-query'
import AuthService from 'services/Auth'
import styled from 'styled-components'

const Wrapper = styled.div`
iframe {
  display: inherit !important;
  margin: auto !important;
}
`
export default function ContinueWithGoogleButton () {
  const auth = useAuthContext()
  const signin = useMutation<any, any, any>(AuthService.authWithGoogle)

  const getNotificationToken = async () => {
    try {
      const messaging = getMessaging()
      const token = await getToken(messaging).catch(() => undefined)
      return token
    } catch (err) {
      return null
    }
  }
  const handleSubmit = async (response: CredentialResponse) => {
    const notificationToken = await getNotificationToken()
    const payload = {
      idToken: response.credential,
      deviceType: 'web',
      deviceId: window.navigator.userAgent,
      notificationToken
    }

    signin.mutate(payload, {
      onError: (e) => {
        message.error(e.message)
      },
      onSuccess: (result) => {
        const { token, refreshToken } = result.meta
        auth.setToken(token, refreshToken)
      }
    })
  }

  return (
    <Wrapper>
      <GoogleLogin
        shape='circle'
        onSuccess={handleSubmit}
        onError={() => {
          message.error('Something went wrong')
        }}
      />
    </Wrapper>
  )
}
