import { ConfigProvider, theme } from 'antd'
import ArticleDetails from 'pages/ArticleDetails'
import ArticleEdit from 'pages/ArticleEdit'
import ArticleListMine from 'pages/ArticleListMine'
import ForgotPassword from 'pages/Auth/ForgotPassword'
import ResetPassword from 'pages/Auth/ResetPassword'
import Signin from 'pages/Auth/Signin'
import Signup from 'pages/Auth/Signup'
import Chats from 'pages/Chats'
import KbDetails from 'pages/KbDetails'
import KbHome from 'pages/KbHome'
import KbPerCategory from 'pages/KbPerCategory'
import Notifications from 'pages/Notifications'
import PublicationCreate from 'pages/PublicationCreate'
import StoryChapterDetails from 'pages/StoryChapterDetails'
import StoryChapterEdit from 'pages/StoryChapterEdit'
import StoryDetails from 'pages/StoryDetails'
import StoryEdit from 'pages/StoryEdit'
import StoryExplore from 'pages/StoryExplore'
import StoryListMine from 'pages/StoryListMine'
import UserProfileEdit from 'pages/UserProfileEdit'
import Wallets from 'pages/Wallets'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import UserDetails from './pages/UserDetails'

const router = createBrowserRouter([
  {
    id: '/',
    path: '/',
    element: <Home />
  },
  {
    id: '/notifications',
    path: '/notifications',
    element: <Notifications />
  },
  {
    id: '/auth/signin',
    path: '/auth/signin',
    element: <Signin />
  },
  {
    id: '/auth/signup',
    path: '/auth/signup',
    element: <Signup />
  },
  {
    id: '/auth/reset-password',
    path: '/auth/reset-password',
    element: <ResetPassword />
  },
  {
    id: '/auth/forgot-password',
    path: '/auth/forgot-password',
    element: <ForgotPassword />
  },
  {
    id: '/users/:username',
    path: '/users/:username',
    element: <UserDetails />
  },
  {
    id: '/users/:username/edit',
    path: '/users/:username/edit',
    element: <UserProfileEdit />
  },
  {
    id: '/stories/mine',
    path: '/stories/mine',
    element: <StoryListMine />
  },
  {
    id: '/stories/explore',
    path: '/stories/explore',
    element: <StoryExplore />
  },
  {
    id: '/stories/:storyId',
    path: '/stories/:storyId',
    element: <StoryDetails />
  },
  {
    id: '/stories/:storyId/edit',
    path: '/stories/:storyId/edit',
    element: <StoryEdit />
  },
  {
    id: '/stories/chapters/:chapterId',
    path: '/stories/chapters/:chapterId',
    element: <StoryChapterDetails />
  },
  {
    id: '/stories/chapters/:chapterId/edit',
    path: '/stories/chapters/:chapterId/edit',
    element: <StoryChapterEdit />
  },
  {
    id: '/articles/mine',
    path: '/articles/mine',
    element: <ArticleListMine />
  },
  {
    id: '/articles/:articleId',
    path: '/articles/:articleId',
    element: <ArticleDetails />
  },
  {
    id: '/articles/:articleId/edit',
    path: '/articles/:articleId/edit',
    element: <ArticleEdit />
  },
  {
    id: '/hc',
    path: '/hc',
    element: <KbHome />
  },
  {
    id: '/hc/:categoryId',
    path: '/hc/:categoryId',
    element: <KbPerCategory />
  },
  {
    id: '/hc/:categoryId/:kbId',
    path: '/hc/:categoryId/:kbId',
    element: <KbDetails />
  },
  {
    id: '/chats',
    path: '/chats',
    element: <Chats />
  },
  {
    id: '/chats/:roomId',
    path: '/chats/:roomId',
    element: <Chats />
  },
  {
    id: '/publications/create',
    path: '/publications/create',
    element: <PublicationCreate />
  },
  {
    id: '/wallets',
    path: '/wallets',
    element: <Wallets />
  },
  {
    id: '*',
    path: '*',
    element: <NotFound />
  }
])

function App () {
  return (
    <div className="App">
      <ConfigProvider
        theme={{ algorithm: theme.defaultAlgorithm, token: { fontFamily: 'Roboto, sans-serif' } }}
      >
        <RouterProvider router={router} />
      </ConfigProvider>
    </div>
  )
}

export default App
