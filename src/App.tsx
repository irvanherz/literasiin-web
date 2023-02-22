import { ConfigProvider, theme } from 'antd'
import ArticleDetails from 'pages/ArticleDetails'
import StoryChapterDetails from 'pages/StoryChapterDetails'
import StoryChapterEdit from 'pages/StoryChapterEdit'
import StoryCreate from 'pages/StoryCreate'
import StoryDetails from 'pages/StoryDetails'
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
    id: '*',
    path: '*',
    element: <NotFound />
  }
])

function App () {
  return (
    <div className="App">
      <ConfigProvider theme={{ algorithm: theme.defaultAlgorithm }}>
        <RouterProvider router={router} />
      </ConfigProvider>
    </div>
  )
}

export default App
