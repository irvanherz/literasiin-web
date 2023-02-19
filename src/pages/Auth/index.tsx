import { Card } from 'antd'
import RouteGuard from 'components/RouteGuard'
import { useMemo } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Layout from '../../components/Layout'
import Signin from './Signin'
import Signup from './Signup'

const SECTIONS = {
  signin: <Signin />,
  signup: <Signup />,
  default: null
}

export default function Auth () {
  const navigate = useNavigate()
  const params = useParams()
  const { sectionId = 'signin' } = params

  const renderedSection = useMemo(() => {
    const id = sectionId as keyof typeof SECTIONS
    return SECTIONS[id] || SECTIONS.default
  }, [sectionId])

  const handleTabChange = (tab: string) => {
    navigate(`/auth/${tab}`, { replace: true })
  }

  return (
    <RouteGuard require='unauthenticated'>
      <Layout.Blank contentStyle={{ display: 'flex' }}>
        <Card
          onTabChange={handleTabChange}
          tabList={[{ key: 'signin', tab: 'Sign In' }, { key: 'signup', tab: 'Sign Up' }]}
          activeTabKey={sectionId}
          style={{ width: '100%', maxWidth: 500, margin: 'auto' }}
      >
          {renderedSection}
        </Card>
      </Layout.Blank>
    </RouteGuard>

  )
}
