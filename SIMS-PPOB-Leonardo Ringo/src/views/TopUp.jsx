import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom";
import { addBalance, fetchBalance, fetchProfile } from "../store/actions/actionCreator"

const TopUp = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [isLoading, setIsLoading] = useState(true)
  const [topUp, setTopUp] = useState(0)
  const [button, setButton] = useState(false)

  const topUpHandler = (event) => {
    setTopUp(event.target.value)
    if(topUp > 0 || topUp != '') setButton(true)
  }

  const topUpOption = (event) => {
    event.preventDefault()
    setTopUp(event.target.value)
    setButton(true)
  }
  
  const submitTopUp = (event) => {
    event.preventDefault()
    if(topUp < 10000 || topUp > 1000000) {
      console.log(`minimal atau maksimalnya salah bang`);
      setTopUp(0)
    } else {
      dispatch(addBalance(topUp))
      navigate('/')
    }
  }

  const { profile } = useSelector((state) => {
    return state.userProfile
  })

  const { balance } = useSelector((state) => {
    return state.userBalance
  })

  useEffect(() => {
    dispatch(fetchProfile())
    dispatch(fetchBalance())
      .finally(() => setIsLoading(false))
  }, [])

  if (!isLoading) {
    return (
      <>
        {/* <img src={profile.profile_image} alt="image" /> */}
        <h1>
          Selamat datang,
        </h1>
        <h1>{profile.first_name} {profile.last_name}</h1>
        <h1>Saldo anda</h1>
        <h1>Rp. {balance.balance}</h1>
        <h1>
          Topup
        </h1>
        <form>
          <input type="number" name="topUp" value={topUp} onChange={topUpHandler} placeholder="masukan nominal topup"/>
          <button onClick={topUpOption} value={10000}>10000</button> ||
          <button onClick={topUpOption} value={20000}>20000</button> ||
          {!button ? <button disabled>TopUpDISABLED</button> : <button type="submit" onClick={submitTopUp}>TopUp</button> }
        </form>
        <h1>
          {console.log(profile)}
        </h1>
      </>
    )
  }
}

export default TopUp