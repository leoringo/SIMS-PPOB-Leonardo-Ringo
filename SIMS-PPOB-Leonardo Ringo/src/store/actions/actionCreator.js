import axios from "axios"
import { BASEURL } from "./actionType"

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
            console.log(data, `@@@@`);
            localStorage.token = data.data.token
        } catch (error) {
            throw error
        }
    }
}