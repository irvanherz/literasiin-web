import { ReactNode } from 'react'
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3'

type GoogleRecaptchaProviderProps = {
  children: ReactNode
}

export default function GoogleRecaptchaProvider ({ children }: GoogleRecaptchaProviderProps) {
  return (
    <GoogleReCaptchaProvider
      reCaptchaKey={process.env.REACT_APP_GOOGLE_RECAPTCHA_CLIENT_KEY!}
      scriptProps={{
        async: false, // optional, default to false,
        defer: false, // optional, default to false
        appendTo: 'head', // optional, default to "head", can be "head" or "body",
        nonce: undefined // optional, default undefined
      }}
    >
      {children}
    </GoogleReCaptchaProvider>
  )
}
