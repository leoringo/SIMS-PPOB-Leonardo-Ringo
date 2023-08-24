import { configureStore } from '@reduxjs/toolkit'
import profileReducer from './reducers/profileReducer'
import balanceReducer from './reducers/balanceReducer'
import servicesReducer from './reducers/servicesReducer'
import bannerReducer from './reducers/bannerReducer'

const store = configureStore({
  reducer: {
    userProfile: profileReducer,
    userBalance: balanceReducer,
    listServices: servicesReducer,
    listBanners: bannerReducer
  }
})

export default store