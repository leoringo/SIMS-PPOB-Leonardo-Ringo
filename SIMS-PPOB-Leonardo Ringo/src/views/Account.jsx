import { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom";
import { editData, fetchProfile } from "../store/actions/actionCreator"
import { EditIcon } from "@chakra-ui/icons"
import {
  Button,
  Input,
  Stack,
  InputGroup,
  InputLeftElement,
  FormLabel,
  useToast
} from '@chakra-ui/react'
import { AtSignIcon } from '@chakra-ui/icons'
import { ImUser } from "react-icons/im";
import ProfilePhoto from '../assets/Profile Photo.png'
import axios from "axios";
import { BASEURL } from "../store/actions/actionType";
import "../styles/account.css"

const Account = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const input = useRef()
  const toast = useToast()

  const [isLoading, setIsLoading] = useState(true)
  const [image, setImage] = useState(null)
  const [edit, setEdit] = useState(false)

  const { profile } = useSelector((state) => {
    return state.userProfile
  })

  const [form, setForm] = useState({
    first_name: "",
    last_name: ""
  })

  const editSubmit = () => {
    dispatch(editData(form))
  }

  const editButtonHandler = () => {
    setEdit(true)
  }

  const logOutHandler = () => {
    localStorage.clear()
    navigate('/login')
  }

  const clickHandler = () => {
    input.current.click();
  }

  const eventHandler = (event) => {
    setForm((input) => {
      return { ...input, [event.target.name]: event.target.value }
    })
  }

  const editImage = async (event) => {
    if (event.target.files && event.target.files[0]) {
      if (event.target.files[0].size > 1 * 1000 * 100) {
        toast({
          title: "File with maximum size of 100KB is allowed",
          isClosable: true,
          position: "top"
        })
        return false;
      }
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
      .finally(() => setIsLoading(false))
  }, [])

  useEffect(() => {
    setForm({ first_name: profile.first_name, last_name: profile.last_name })
  }, [profile])

  if (!isLoading) {
    return (
      <>
        <div id="account-container">
          <div className="image-container">
            <img src={profile.profile_image ? profile.profile_image : ProfilePhoto} alt="image" />
            <div>
              <EditIcon onClick={clickHandler} />
            </div>
          </div>
          <p style={{ fontWeight: "bold", fontSize: "1.5rem" }}>
            {profile.first_name} {profile.last_name}
          </p>
          <Stack spacing={6} w={"40%"} mt={"5"}>
            <div>
              <FormLabel>Email</FormLabel>
              <InputGroup>
                <InputLeftElement pointerEvents="none">
                  <AtSignIcon color="gray.300" />
                </InputLeftElement>
                <Input type="email" name="email" value={profile.email} disabled />
              </InputGroup>
            </div>
            <div>
              <FormLabel>Nama Depan</FormLabel>
              <InputGroup>
                <InputLeftElement pointerEvents="none">
                  <ImUser color="darkgrey" />
                </InputLeftElement>
                <Input type="text" name="first_name" value={form.first_name} disabled={!edit} onChange={eventHandler} />
              </InputGroup>
            </div>
            <div>
              <FormLabel>Nama Belakang</FormLabel>
              <InputGroup>
                <InputLeftElement pointerEvents="none">
                  <ImUser color="darkgrey" />
                </InputLeftElement>
                <Input type="text" name="last_name" value={form.last_name} disabled={!edit} onChange={eventHandler} />
              </InputGroup>
            </div>
            {edit ? <Button colorScheme="red" onClick={editSubmit}>Simpan</Button> :
              <>
                <Button colorScheme="red" variant={"outline"} onClick={editButtonHandler}>Edit Profile</Button>
                <Button colorScheme="red" onClick={logOutHandler}>Logout</Button>
              </>
            }
          </Stack>
          <input type="file" onChange={editImage} ref={input} hidden />
        </div>
      </>
    )
  }
}

export default Account