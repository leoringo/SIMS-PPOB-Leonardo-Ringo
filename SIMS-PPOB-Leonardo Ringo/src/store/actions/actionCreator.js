import axios from "axios"
import { BASEURL } from "./actionType"

export function registerUser(payload) {
    return async () => {
        try {
            const { data } = await axios({
                url: BASEURL + '/registration',
                data: payload,
                method: 'POST'
            })
        } catch (error) {
            throw error
        }
    }
}