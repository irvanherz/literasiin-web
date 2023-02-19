import { Button, Form, message } from 'antd'
import Layout from 'components/Layout'
import RouteGuard from 'components/RouteGuard'
import UserProfileForm from 'components/shared/UserProfileForm'
import dayjs from 'dayjs'
import { useMemo } from 'react'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { useParams } from 'react-router-dom'
import UsersService from 'services/Users'

export default function UserProfileEdit () {
  const params = useParams()
  const username = params?.username
  const { data } = useQuery(`users[${username}]`, () => UsersService.findByUsername(username!), { enabled: !!username })
  const user = data?.data
  const queryClient = useQueryClient()
  const updater = useMutation(payload => UsersService.updateById(user.id, payload))
  const initialValues = useMemo(() => {
    return user
      ? {
          ...user,
          dob: user.dob ? dayjs(user.dob) : null
        }
      : {}
  }, [user])

  const handleFinish = (values: any) => {
    const { photo, ...payload } = values
    payload.photoId = photo?.id || null
    delete payload.email

    updater.mutate(payload, {
      onSuccess: () => {
        queryClient.invalidateQueries('users[me]')
        message.success('Profile updated')
      },
      onError: (err: any) => {
        message.error(err?.message)
      }
    })
  }

  const handleFinishFailed = () => {
    message.error('Check all fields and then try again')
  }

  const [form] = Form.useForm()
  return (
    <RouteGuard require='authenticated'>
      <Layout.Default>
        <Layout.Scaffold
          title="Edit Profile"
          description="Update your profile details"
          bodyStyle={{ padding: '24px 0' }}
      >
          <Form
            wrapperCol={{ span: 24 }}
            labelCol={{ span: 24 }}
            initialValues={initialValues}
            form={form}
            onFinish={handleFinish}
            onFinishFailed={handleFinishFailed}
        >
            <UserProfileForm />
          </Form>
          <Button loading={updater.isLoading} onClick={form.submit}>Update</Button>
        </Layout.Scaffold>
      </Layout.Default>
    </RouteGuard>

  )
}
