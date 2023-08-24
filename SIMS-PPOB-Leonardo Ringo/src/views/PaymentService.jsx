import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom";
import { fetchBalance, fetchProfile, paymentService } from "../store/actions/actionCreator"

const PaymentService = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [isLoading, setIsLoading] = useState(true)

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

  useEffect(() => {
    dispatch(fetchProfile())
    dispatch(fetchBalance())
      .finally(() => setIsLoading(false))
  }, [])

  if (!isLoading) {
    return (
      <>
        <h1>
          Selamat datang,
        </h1>
        <h1>{profile.first_name} {profile.last_name}</h1>
        <h1>Saldo anda</h1>
        <h1>Rp. {balance.balance}</h1>
        <h1>Pembayaran</h1>
        <h1>{serviceDetail.service_name}</h1>
        <h1>{serviceDetail.service_tariff}</h1>
        <button onClick={paymentSubmit}>BAYAR</button>
      </>
    )
  }
}

export default PaymentService