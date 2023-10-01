import { GoogleOAuthProvider } from '@react-oauth/google'
import AxiosInterceptor from 'components/shared/AxiosInterceptor'
import AuthContextProvider from 'contexts/AuthContextProvider'
import ChatContextProvider from 'contexts/ChatContextProvider'
import CurrentUserContextProvider from 'contexts/CurrentUserContextProvider'
import FcmContextProvider from 'contexts/FcmContextProvider'
import GoogleMapsContextProvider from 'contexts/GoogleMapsContextProvider'
import LangContextProvider from 'contexts/LangContextProvider'
import NotificationContextProvider from 'contexts/NotificationContextProvider'
import SocketContextProvider from 'contexts/SocketContextProvider'
import StorytellingPlayerContextProvider from 'contexts/StorytellingPlayerContextProvider'
import ThemeContextProvider from 'contexts/ThemeContextProvider'
import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'
import relativeTime from 'dayjs/plugin/relativeTime'
import { getAnalytics } from 'firebase/analytics'
import { initializeApp } from 'firebase/app'
import ReactDOM from 'react-dom/client'
import { QueryClient, QueryClientProvider } from 'react-query'
import { Quill } from 'react-quill'
import 'react-quill/dist/quill.bubble.css'
import App from './App'
import reportWebVitals from './reportWebVitals'

dayjs.extend(relativeTime)
dayjs.extend(duration)
const BubbleTheme = Quill.import('themes/bubble')

class ExtendBubbleTheme extends BubbleTheme {
  constructor (quill: any, options: any) {
    super(quill, options)

    quill.on('selection-change', (range: any) => {
      if (range) {
        quill.theme.tooltip.show()
        quill.theme.tooltip.position(quill.getBounds(range))
      }
    })
  }
}

Quill.register('themes/bubble', ExtendBubbleTheme)

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_APIKEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTHDOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECTID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGEBUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGINGSENDERID,
  appId: process.env.REACT_APP_FIREBASE_APPID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENTID
}

// Initialize Firebase
export const app = initializeApp(firebaseConfig)
export const analytics = getAnalytics(app)

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
)
const queryClient = new QueryClient({ defaultOptions: { queries: { refetchOnWindowFocus: false } } })

root.render(
  // <React.StrictMode>
  <FcmContextProvider>
    <QueryClientProvider client={queryClient}>
      <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_OAUTH_CLIENT_ID!}>
        <AuthContextProvider>
          <AxiosInterceptor>
            <CurrentUserContextProvider>
              <LangContextProvider>
                <SocketContextProvider>
                  <ChatContextProvider>
                    <NotificationContextProvider>
                      <GoogleMapsContextProvider options={{ apiKey: process.env.REACT_APP_GOOGLE_MAPS_APIKEY!, language: 'id-ID', libraries: ['marker', 'places', 'drawing'] }}>
                        <ThemeContextProvider>
                          <StorytellingPlayerContextProvider>
                            <App />
                          </StorytellingPlayerContextProvider>
                        </ThemeContextProvider>
                      </GoogleMapsContextProvider>
                    </NotificationContextProvider>
                  </ChatContextProvider>
                </SocketContextProvider>
              </LangContextProvider>
            </CurrentUserContextProvider>
          </AxiosInterceptor>
        </AuthContextProvider>
      </GoogleOAuthProvider>
    </QueryClientProvider>
  </FcmContextProvider>
  // </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
