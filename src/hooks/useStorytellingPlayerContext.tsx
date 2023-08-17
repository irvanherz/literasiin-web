import StorytellingPlayerContext from 'contexts/StorytellingPlayerContext'
import { useContext } from 'react'

export default function useStorytellingPlayerContext () {
  return useContext(StorytellingPlayerContext)
}
