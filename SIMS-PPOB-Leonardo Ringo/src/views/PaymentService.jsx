import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom";
import { fetchBalance, fetchProfile, paymentService } from "../store/actions/actionCreator"
import { InputGroup, InputLeftElement, Input, Button, Image } from "@chakra-ui/react"
import { SmallAddIcon } from "@chakra-ui/icons"
import ProfilePhoto from '../assets/Profile Photo.png'
import "../styles/paymentServices.css"

const PaymentService = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [isLoading, setIsLoading] = useState(true)
  const [hideBalance, setShowHideBalance] = useState(false)
  const [balanceHider, setBalanceHider] = useState("")

  const { profile } = useSelector((state) => {
    return state.userProfile
  })

  const { balance } = useSelector((state) => {
    return state.userBalance
  })

  const { serviceDetail } = useSelector((state) => {
    return state.listServices
  })

  const paymentSubmit = (event) => {
    event.preventDefault()
    dispatch(paymentService(serviceDetail.service_code))
    navigate('/')
  }

  const handleShowBalance = () => {
    setShowHideBalance(!hideBalance)
  }

  useEffect(() => {
    dispatch(fetchProfile())
    dispatch(fetchBalance())
      .finally(() => setIsLoading(false))
  }, [])

  useEffect(() => {
    if (balance.balance) {
      let balanceString = String(balance.balance)
      let temp = ''
      for (let i = 0; i < balanceString.length; i++) {
        temp += "• "
      }
      setBalanceHider(temp)
    }
  }, [balance])

  if (!isLoading) {
    return (
      <>
        <div id="services-container">
          <div className="profile-info">
            <div className="profile-greeting">
              <img src={profile.profile_image ? profile.profile_image : ProfilePhoto} alt="" />
              <p>Selamat Datang,</p>
              <p>{profile.first_name} {profile.last_name}</p>
            </div>
            <div className="balance-info">
              <p>
                Saldo anda,
              </p>
              <p>
                Rp. {hideBalance ? balanceHider : balance.balance}
              </p>
              <p onClick={handleShowBalance} style={{ cursor: "pointer" }}>
                {hideBalance ? "Lihat saldo" : "Tutup saldo"}
              </p>
            </div>
          </div>
          <div className="form-payment">
            <p>PemBayaran</p>
            {console.log(serviceDetail)}
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Image src={serviceDetail.service_icon} w={"2.5%"} />
              <p style={{ fontWeight: 'bold' }}>{serviceDetail.service_name}</p>
            </div><br />
            <div>
              <InputGroup>
                <InputLeftElement pointerEvents="none">
                  <SmallAddIcon color="gray.300" />
                </InputLeftElement>
                <Input w={"1000px"} disabled value={serviceDetail.service_tariff} />
              </InputGroup><br />
              {balance.balance < serviceDetail.service_tariff ? <Button colorScheme="gray" w={"1000px"} disabled>Bayar</Button> : <Button colorScheme="red" w={"1000px"} onClick={paymentSubmit}>Bayar</Button>}
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default PaymentService