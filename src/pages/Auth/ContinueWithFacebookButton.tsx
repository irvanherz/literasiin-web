import { API_BASE_URL } from 'libs/variables'
import { Link } from 'react-router-dom'

export default function ContinueWithFacebookButton () {
  return (
    <Link to={`${API_BASE_URL}/auth/facebook`}>
      <button className='btn btn-sm w-full text-white h-auto py-2 px-4 bg-sky-700 hover:bg-sky-600 text-xs'>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 50 50" className="icon icons8-Facebook-Filled" >    <path d="M40,0H10C4.486,0,0,4.486,0,10v30c0,5.514,4.486,10,10,10h30c5.514,0,10-4.486,10-10V10C50,4.486,45.514,0,40,0z M39,17h-3 c-2.145,0-3,0.504-3,2v3h6l-1,6h-5v20h-7V28h-3v-6h3v-3c0-4.677,1.581-8,7-8c2.902,0,6,1,6,1V17z"></path></svg> Lanjutkan dengan Facebook
      </button>
    </Link>
  )
}
