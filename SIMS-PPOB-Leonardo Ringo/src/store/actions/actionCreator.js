import axios from "axios"
import { BASEURL, 
    SUCCESS_FETCH_BALANCE, 
    SUCCESS_FETCH_BANNER, 
    SUCCESS_FETCH_PROFILE, 
    SUCCESS_FETCH_SERVICE } from "./actionType"

// ================================ PAYLOADS ======================================
const profilePayload = (payload) => {
    return {
        type: SUCCESS_FETCH_PROFILE,
        payload
    }
}

const balancePayload = (payload) => {
    return {
        type: SUCCESS_FETCH_BALANCE,
        payload
    }
}

const servicesPayload = (payload) => {
    return {
        type: SUCCESS_FETCH_SERVICE,
        payload
    }
}

const bannerPayload = (payload) => {
    return {
        type: SUCCESS_FETCH_BANNER,
        payload
    }
}

// =============================== AXIOS FUNCTIONS ===============================
export function registerUser(input) {
    return async () => {
        try {
            const { data } = await axios({
                url: BASEURL + '/registration',
                data: input,
                method: 'POST'
            })
        } catch (error) {
            throw error
        }
    }
}

export function loginUser(input) {
    return async () => {
        try {
            const { data } = await axios({
                url: BASEURL + '/login',
                data: input,
                method: 'POST'
            })
            localStorage.token = data.data.token
        } catch (error) {
            throw error
        }
    }
}

export function fetchProfile() {
    return async (dispatch) => {
        try {
            const { data } = await axios({
                url: BASEURL + '/profile',
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${localStorage.token}`
                },
            })
            dispatch(profilePayload(data.data))
        } catch (error) {
            console.log(error);
        }
    }
}

export function fetchBalance() {
    return async (dispatch) => {
        try {
            const { data } = await axios({
                url: BASEURL + '/balance',
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${localStorage.token}`
                }
            })
            dispatch(balancePayload(data.data))
        } catch (error) {
            console.log(error);
        }
    }
}

export function fetchServices() {
    return async (dispatch) => {
        try {
            const { data } = await axios({
                url: BASEURL + '/services',
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${localStorage.token}`
                }
            })
            dispatch(servicesPayload(data.data))
        } catch (error) {
            console.log(error);
        }
    }
}

export function fetchBanner() {
    return async (dispatch) => {
        try {
            const { data } = await axios({
                url: BASEURL + '/banner',
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${localStorage.token}`
                }
            })
            dispatch(bannerPayload(data.data))
        } catch (error) {
            console.log(error);
        }
    }
}

export function addBalance(value) {
    return async (dispatch) => {
        try {
            const { data } = await axios({
                url: BASEURL + '/topup',
                data: {
                    "top_up_amount": Number(value)
                },
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${localStorage.token}`
                }
            })
            dispatch(fetchBalance())
        } catch (error) {
            console.log(error);
        }
    }
}