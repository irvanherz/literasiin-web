import { Button, Space } from 'antd'
import axios from 'axios'
import { OpenVidu, Publisher, Session, StreamManager, Subscriber } from 'openvidu-browser'
import { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'

const ov = new OpenVidu()

type UserVideoProps = {
  streamManager: StreamManager
}
function UserVideo ({ streamManager }: UserVideoProps) {
  const ref = useRef(null)

  useEffect(() => {
    if (ref.current) {
      streamManager.addVideoElement(ref.current)
    }
  }, [streamManager, ref])

  return (
    <div>
      <div></div>
      <div>
        <video autoPlay={true} ref={ref} />;
      </div>
    </div>
  )
}

const APPLICATION_SERVER_URL = 'https://demos.openvidu.io/'
export default function WebinarDetails () {
  const params = useParams()
  const sessionName = params.sessionName
  const sessionUsername = params.sessionUsername
  const [session, setSession] = useState<Session>()
  const [publisher, setPublisher] = useState<Publisher>()
  // const [publisherScreen, setPublisherScreen] = useState<Publisher>()
  const [subscribers, setSubscribers] = useState<Subscriber[]>([])

  useEffect(() => {
    const fun = async () => {
      // --- 2) Init a session ---
      const session = ov.initSession()

      // --- 3) Specify the actions when events take place in the session ---
      // On every new Stream received...
      session.on('streamCreated', (event) => {
      // Subscribe to the Stream to receive it. Second parameter is undefined
      // so OpenVidu doesn't create an HTML video by its own
        const subscriber = session.subscribe(event.stream, undefined)
        setSubscribers([...subscribers, subscriber])
      })
      // On every Stream destroyed...
      session.on('streamDestroyed', (event) => {
        // Remove the stream from 'subscribers' array
        const subs = [...subscribers]
        const streamManager = event.stream.streamManager
        const idx = subs.findIndex(sub => sub.id === streamManager.id)
        if (idx > -1) {
          subs.splice(idx, 1)
        }
      })

      session.on('exception', (exception) => {
        console.warn(exception)
      })

      const resp: any = await axios.post(APPLICATION_SERVER_URL + 'api/sessions', { customSessionId: sessionName }, {
        headers: { 'Content-Type': 'application/json' }
      })
      const sessionId = resp.data
      const resp2 = await axios.post(APPLICATION_SERVER_URL + 'api/sessions/' + sessionId + '/connections', {}, {
        headers: { 'Content-Type': 'application/json' }
      })
      const token = resp2.data
      await session.connect(token, { clientData: sessionUsername })
      const publisher = await ov.initPublisherAsync(undefined, {
        audioSource: undefined, // The source of audio. If undefined default microphone
        videoSource: undefined, // The source of video. If undefined default webcam
        publishAudio: true, // Whether you want to start publishing with your audio unmuted or not
        publishVideo: true, // Whether you want to start publishing with your video enabled or not
        resolution: '640x480', // The resolution of your video
        frameRate: 30, // The frame rate of your video
        insertMode: 'APPEND', // How the video is inserted in the target element 'video-container'
        mirror: false // Whether to mirror your local video or not
      })
      setPublisher(publisher)
      session.publish(publisher)
      setSession(session)
    }
    fun()
  }, [])

  const handleShareScreen = async () => {
    if (!session || !publisher) return
    const screenPublisher = await ov.initPublisherAsync(undefined, {
      audioSource: undefined, // The source of audio. If undefined default microphone
      videoSource: 'screen', // The source of video. If undefined default webcam
      publishAudio: true, // Whether you want to start publishing with your audio unmuted or not
      publishVideo: true, // Whether you want to start publishing with your video enabled or not
      resolution: '640x480', // The resolution of your video
      frameRate: 30, // The frame rate of your video
      insertMode: 'APPEND', // How the video is inserted in the target element 'video-container'
      mirror: false // Whether to mirror your local video or not
    })

    screenPublisher.once('accessAllowed', (event) => {
      screenPublisher.stream.getMediaStream().getVideoTracks()[0].addEventListener('ended', () => {
        console.log('User pressed the "Stop sharing" button')
      })
      session.unpublish(publisher)
      session.publish(screenPublisher)
    })

    publisher.once('accessDenied', (event) => {
      console.warn('ScreenShare: Access Denied')
    })
  }

  return (
    <div>
      <div>Hehe</div>
      <div>
        <Space>
          <Button onClick={handleShareScreen}>Share</Button>
        </Space>
      </div>
      {session && (
        <div>
          <div>
            <div>Saya</div>
            {publisher && <UserVideo streamManager={publisher as any} />}
          </div>
          <div>
            <div>Partisipan</div>
            {subscribers.map(sub => <UserVideo key={sub.id} streamManager={sub as any} />)}
          </div>
        </div>
      )}
    </div>
  )
}
