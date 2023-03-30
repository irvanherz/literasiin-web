import { ConfigProvider, theme } from 'antd'
import ArticleDetails from 'pages/ArticleDetails'
import Chats from 'pages/Chats'
import KbDetails from 'pages/KbDetails'
import KbExplore from 'pages/KbExplore'
import KbHome from 'pages/KbHome'
import Notifications from 'pages/Notifications'
import PublicationCreate from 'pages/PublicationCreate'
import StoryChapterDetails from 'pages/StoryChapterDetails'
import StoryChapterEdit from 'pages/StoryChapterEdit'
import StoryCreate from 'pages/StoryCreate'
import StoryDetails from 'pages/StoryDetails'
import StoryEdit from 'pages/StoryEdit'
import StoryListMine from 'pages/StoryListMine'
import UserProfileEdit from 'pages/UserProfileEdit'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Auth from './pages/Auth'
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
    id: '/auth/:sectionId',
    path: '/auth/:sectionId',
    element: <Auth />
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
    id: '/stories/create',
    path: '/stories/create',
    element: <StoryCreate />
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
    id: '/articles/:articleId',
    path: '/articles/:articleId',
    element: <ArticleDetails />
  },
  {
    id: '/hc',
    path: '/hc',
    element: <KbHome />
  },
  {
    id: '/hc/:categoryId',
    path: '/hc/:categoryId',
    element: <KbExplore />
  },
  {
    id: '/hc/explore',
    path: '/hc/explore',
    element: <KbExplore />
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
