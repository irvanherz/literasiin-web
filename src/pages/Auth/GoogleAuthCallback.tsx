import { Modal } from 'antd'
import RouteGuard from 'components/RouteGuard'
import { getMessaging, getToken } from 'firebase/messaging'
import useAuthContext from 'hooks/useAuthContext'
import analytics from 'libs/analytics'
import qs from 'qs'
import { useEffect } from 'react'
import { useMutation } from 'react-query'
import { useLocation, useNavigate } from 'react-router-dom'
import AuthService from 'services/Auth'

export default function GoogleAuthCallback () {
  const location = useLocation()
  const qp = qs.parse(location.search, { ignoreQueryPrefix: true })
  const signin = useMutation<any, any, any>(AuthService.authWithGoogle)
  const auth = useAuthContext()
  const navigate = useNavigate()

  const getNotificationToken = async () => {
    try {
      const messaging = getMessaging()
      const token = await getToken(messaging).catch(() => undefined)
      return token
    } catch (err) {
      return null
    }
  }
  const handleSubmit = async (code: string) => {
    const notificationToken = await getNotificationToken()
    const payload = {
      code,
      deviceType: 'web',
      deviceId: window.navigator.userAgent,
      notificationToken
    }

    signin.mutate(payload, {
      onError: (e) => {
        Modal.error({
          centered: true,
          title: 'Error',
          content: 'Something went wrong while trying to connect your facebook account',
          onOk: () => {
            navigate('/auth/signin')
          }
        })
      },
      onSuccess: (result) => {
        analytics.track('login', { method: 'google' })

        const { token, refreshToken } = result.meta
        auth.setToken(token, refreshToken)
      }
    })
  }

  useEffect(() => {
    if (qp?.code) {
      handleSubmit(qp.code as string)
    } else {
      navigate('/auth/signin')
    }
  }, [qp?.code])

  return (
    <RouteGuard require='unauthenticated'>
      <div>Please wait...</div>
    </RouteGuard>

  )
}
