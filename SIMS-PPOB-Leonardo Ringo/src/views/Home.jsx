import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchBalance, fetchBanner, fetchProfile, fetchServices } from "../store/actions/actionCreator"
import ServiceCard from "../components/Services"
import Banners from "../components/Banners"
import ProfilePhoto from '../assets/Profile Photo.png'
import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css';
import '../styles/home.css'

const Home = () => {
    const dispatch = useDispatch()

    const responsive = {
        superLargeDesktop: {
            breakpoint: { max: 4000, min: 3000 },
            items: 5
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 4
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 2
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1
        }
    };

    const [isLoading, setIsLoading] = useState(true)
    const [hideBalance, setShowHideBalance] = useState(false)
    const [balanceHider, setBalanceHider] = useState("")

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

    const handleShowBalance = () => {
        setShowHideBalance(!hideBalance)
    }

    useEffect(() => {
        dispatch(fetchProfile())
        dispatch(fetchBanner())
        dispatch(fetchBalance())
        dispatch(fetchServices())
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
                <div id="home-container">
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
                    <div className="card-container">
                        {services.map((el, i) => (
                            <ServiceCard key={i} service={el} index={i} />
                        ))}
                    </div>
                    <div>
                        <p style={{ fontWeight: "500", color: 'grey' }}>Temukan promo menarik</p>
                        <Carousel responsive={responsive} className="carousel-images">
                            {banner.map((el, i) => (
                                <Banners key={i} banner={el} />
                            ))}
                        </Carousel>
                    </div>
                </div>
            </>
        )
    }
}

export default Home