import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom";
import { fetchBalance, fetchHistories, fetchProfile, paymentService } from "../store/actions/actionCreator"
import { BASEURL } from "../store/actions/actionType";
import axios from "axios";

const Transaction = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [isLoading, setIsLoading] = useState(true)
  const [showHistories, setShowHistories] = useState([])
  const [offset, setOffset] = useState(0)

  const { profile } = useSelector((state) => {
    return state.userProfile
  })

  const { histories } = useSelector((state) => {
    return state.userProfile
  })

  const { balance } = useSelector((state) => {
    return state.userBalance
  })

  // const offsetHandler = async () => {
  //   try {
  //     if(showHistories.length === 0) {
  //       const { data } = await axios({
  //         url: BASEURL + `/transaction/history?offset=${Number(histories.offset) + 5}&limit=5`,
  //         method: 'GET',
  //         headers: {
  //           'Authorization': `Bearer ${localStorage.token}`
  //         }
  //       })
  //       console.log(data);
  //       setShowHistories(data)
  //     } else {
  //       const { data } = await axios({
  //         url: BASEURL + `/transaction/history?offset=${Number(showHistories.offset) + 5}&limit=5`,
  //         method: 'GET',
  //         headers: {
  //           'Authorization': `Bearer ${localStorage.token}`
  //         }
  //       })
  //       setShowHistories({offset: data.offest, records: [...showHistories.records, data.records]})
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  const fetchHistories = async () => {
    try {
      if(offset === 0) {
        const { data } = await axios({
          url: BASEURL + `/transaction/history?offset=${offset}&limit=5`,
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${localStorage.token}`
          }
        })
        setShowHistories(data.data.records)
        console.log(showHistories, `INI DARI SAMSUL MASUK KE IF`);
        setOffset(offset + 5)
        console.log(offset, `IF`);
      } else {
        const { data } = await axios({
          url: BASEURL + `/transaction/history?offset=${offset}&limit=5`,
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${localStorage.token}`
          }
        })
        setShowHistories([...showHistories, ...data.data.records])
        console.log(showHistories, `INI DARI SAMSUL MASUK KE ELSE`);
        setOffset(offset + 5 )
        console.log(offset, `ELSE`);
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    dispatch(fetchProfile())
    dispatch(fetchBalance())
    // dispatch(fetchHistories())
    fetchHistories()
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
        <button onClick={fetchHistories}>TEKAN AKU</button>

      </>
    )
  }
}

export default Transaction