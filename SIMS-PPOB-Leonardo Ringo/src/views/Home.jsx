import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchBalance, fetchBanner, fetchProfile, fetchServices } from "../store/actions/actionCreator"

const Home = () => {
    const dispatch = useDispatch()

    const [isLoading, setIsLoading] = useState(true)

    const { profile } = useSelector((state) => {
        return state.userProfile
    })
    const { banner } = useSelector((state) => {
        return state.listBanners
    })
    const { balance } = useSelector((state) => {
        return state.userBalance
    })
    const { services } = useSelector((state) => {
        return state.listServices
    })

    useEffect(() => {
        dispatch(fetchProfile())
        dispatch(fetchBanner())
        dispatch(fetchBalance())
        dispatch(fetchServices())
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
                <img src={services[0].service_icon} alt="" />
                <img src={banner[0].banner_image} alt="" />
            </>
        )
    }
}

export default Home