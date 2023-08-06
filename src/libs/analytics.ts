import googleAnalytics from '@analytics/google-analytics'
import Analytics from 'analytics'

const analytics = Analytics({
  app: 'literasiin.com',
  plugins: [
    googleAnalytics({
      measurementIds: [process.env.REACT_APP_GOOGLE_ANALYTICS_MEASUREMENT_ID]
    } as any)
  ]
})

export default analytics
