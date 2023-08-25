import { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom";
import { fetchBalance, fetchHistories, fetchProfile, paymentService } from "../store/actions/actionCreator"
import ProfilePhoto from '../assets/Profile Photo.png'
import axios from "axios";
import { BASEURL } from "../store/actions/actionType";

const Account = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const input = useRef()

  const [isLoading, setIsLoading] = useState(true)
  const [image, setImage] = useState(null)

  const { profile } = useSelector((state) => {
    return state.userProfile
  })
  
  const logOutHandler = () => {
    localStorage.clear()
    navigate('/login')
  }

  const clickHandler = () => {
    console.log(input.current.click());
  }

  const editImage = async (event) => {
    if(event.target.files && event.target.files[0]) {
      let img = event.target.files[0]
      setImage(URL.createObjectURL(img))
      let data = new FormData()
      data.append("file", img)
      await axios({
        url: BASEURL + '/profile/image',
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${localStorage.token}`
        },
        data
      })
      dispatch(fetchProfile())
    }
  }

  useEffect(() => {
    dispatch(fetchProfile())
    // dispatch(fetchHistories())
      .finally(() => setIsLoading(false))
  }, [])

  if(!isLoading) {
    return (
      <>
        {/* {console.log(profile, `INI PROFILE`)} */}
        <img src={profile.profile_image ? profile.profile_image : ProfilePhoto} alt="image" style={{height: "3cm"}} onClick={clickHandler}/>
        <h1>
          {profile.first_name} {profile.last_name}
        </h1>
        <h1>
          email : {profile.email}
        </h1>
        <h1>
          nama depan : {profile.first_name}
        </h1>
        <h1>
          nama belakang : {profile.last_name}
        </h1>
        <button>EDIT</button> || 
        <button onClick={logOutHandler}>LOGOUT</button>
        <input type="file" onChange={editImage} ref={input} hidden/>
      </>
    )
  }
}

export default Account