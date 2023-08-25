import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchBalance, fetchProfile } from "../store/actions/actionCreator"
import { BASEURL } from "../store/actions/actionType";
import {
  Card,
  CardBody,
  Heading, 
  Stack, 
  StackDivider, 
  Box, 
  Text,
  Button
} from '@chakra-ui/react'
import ProfilePhoto from '../assets/Profile Photo.png'
import axios from "axios";
import '../styles/transaction.css'

const Transaction = () => {
  const dispatch = useDispatch()

  const [isLoading, setIsLoading] = useState(true)
  const [showHistories, setShowHistories] = useState([])
  const [offset, setOffset] = useState(0)
  const [hideBalance, setShowHideBalance] = useState(false)
  const [balanceHider, setBalanceHider] = useState("")

  const { profile } = useSelector((state) => {
    return state.userProfile
  })

  const { balance } = useSelector((state) => {
    return state.userBalance
  })

  const fetchHistories = async () => {
    try {
      if (offset === 0) {
        const { data } = await axios({
          url: BASEURL + `/transaction/history?offset=0&limit=5`,
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${localStorage.token}`
          }
        })
        setShowHistories(data.data.records)
        setOffset(offset + 5)
      } else {
        const { data } = await axios({
          url: BASEURL + `/transaction/history?offset=${offset}&limit=5`,
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${localStorage.token}`
          }
        })
        setShowHistories([...showHistories, ...data.data.records])
        setOffset(offset + 5)
      }
    } catch (error) {
      console.log(error);
    }
  }

  function formatTimestamp(timestamp) {
    const months = [
      "Januari", "Februari", "Maret", "April", "Mei", "Juni",
      "Juli", "Agustus", "September", "Oktober", "November", "Desember"
    ];

    const date = new Date(timestamp);
    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    const hours = date.getHours();
    const minutes = date.getMinutes();

    return `${day} ${month} ${year} ${hours}:${minutes} WIB`;
  }

  const handleShowBalance = () => {
    setShowHideBalance(!hideBalance)
  }

  useEffect(() => {
    dispatch(fetchProfile())
    dispatch(fetchBalance())
    fetchHistories()
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
        {console.log(showHistories)}
        <div id="transaction-container">
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
          </div><br />
          <div>
            <p style={{ fontWeight: 'bold' }}>Semua Transaksi</p>
            {showHistories.map((e, i) => {
              return <Card key={i} mt={3}>
                <CardBody>
                  <Stack divider={<StackDivider />} spacing='4'>
                    <Box>
                      <Heading size='xs' textTransform='uppercase'>
                        <div className="input-cards">
                          {e.transaction_type === "TOPUP" ? <p style={{ color: 'rgb(33, 216, 179)', fontSize: '20px' }}> +{new Intl.NumberFormat('id-ID', {
                            style: 'currency',
                            currency: 'IDR',
                          }).format(e.total_amount)}</p> : <p style={{ color: 'rgb(236, 47, 53)', fontSize: '20px' }}> - {new Intl.NumberFormat('id-ID', {
                            style: 'currency',
                            currency: 'IDR',
                          }).format(e.total_amount)}</p>}
                          <p>{e.description}</p>
                        </div>
                      </Heading>
                      <Text pt='2' fontSize='sm' color={"gray"}>
                        {formatTimestamp(e.created_on)}
                      </Text>
                    </Box>
                  </Stack>
                </CardBody>
              </Card>
            })} <br />
            <Button colorScheme="red" w={"100%"} onClick={fetchHistories}>Show More</Button>
          </div>
        </div>
      </>
    )
  }
}

export default Transaction