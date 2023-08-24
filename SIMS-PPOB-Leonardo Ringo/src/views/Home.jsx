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

    if(!isLoading) {
        return (
            <>
                <h1>
                    INI HOMENYA SI HARDIM
                    {profile?.email + banner[0]?.banner_name + balance?.balance + services[0]?.service_code}
                </h1>
            </>
        )
    }
}

export default Home