import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom";
import { addBalance, fetchBalance, fetchProfile } from "../store/actions/actionCreator"
import { InputGroup, InputLeftElement, Input, Button } from "@chakra-ui/react"
import { SmallAddIcon } from "@chakra-ui/icons"
import ProfilePhoto from '../assets/Profile Photo.png'
import '../styles/topUp.css'

const TopUp = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [isLoading, setIsLoading] = useState(true)
  const [topUp, setTopUp] = useState("")
  const [button, setButton] = useState(false)
  const [hideBalance, setShowHideBalance] = useState(false)
  const [balanceHider, setBalanceHider] = useState("")

  const handleShowBalance = () => {
    setShowHideBalance(!hideBalance)
  }

  const topUpHandler = (event) => {
    setTopUp(event.target.value)
    if (topUp > 0 || topUp != '') setButton(true)
  }

  const topUpOption = (event) => {
    event.preventDefault()
    setTopUp(event.target.value)
    setButton(true)
  }

  const submitTopUp = (event) => {
    event.preventDefault()
    if (topUp < 10000 || topUp > 1000000) {
      console.log(`Minimal/maksimal TopUp salah!`);
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
        <div id="topUp-container">
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
          <div className="balances-topUp">
            <p>Silahkan masukan</p>
            <p>Nominal Top Up</p> <br />
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div>
                <form className="form-balance">
                  <InputGroup>
                    <InputLeftElement pointerEvents="none">
                      <SmallAddIcon color="gray.300" />
                    </InputLeftElement>
                    <Input type="number" name="topUp" value={topUp} onChange={topUpHandler} placeholder="masukan nominal topup" w={"1000px"} />
                  </InputGroup><br />
                  {!button ? <Button disabled colorScheme='gray' w={"1000px"}>TopUp</Button> : <Button colorScheme='red' w={"1000px"} type="submit" onClick={submitTopUp}>TopUp</Button>}
                </form>
              </div>
              <div className="topUp-options">
                <Button colorScheme='blackAlpha' width={"115px"} variant='outline' m={2} onClick={topUpOption} value={10000}>Rp10.000</Button>
                <Button colorScheme='blackAlpha' width={"115px"} variant='outline' m={2} onClick={topUpOption} value={20000}>Rp20.000</Button>
                <Button colorScheme='blackAlpha' width={"115px"} variant='outline' m={2} onClick={topUpOption} value={50000}>Rp50.000</Button> <br />
                <Button colorScheme='blackAlpha' width={"115px"} variant='outline' m={2} onClick={topUpOption} value={100000}>Rp100.000</Button>
                <Button colorScheme='blackAlpha' width={"115px"} variant='outline' m={2} onClick={topUpOption} value={250000}>Rp250.000</Button>
                <Button colorScheme='blackAlpha' width={"115px"} variant='outline' m={2} onClick={topUpOption} value={500000}>Rp500.000</Button>
              </div>
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default TopUp