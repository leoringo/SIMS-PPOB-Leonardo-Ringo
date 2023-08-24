import { SUCCESS_FETCH_BALANCE } from "../actions/actionType";

const initialState = {
    balance: {}
}

export default function balanceReducer(state = initialState, action) {
    switch(action.type) {
        case SUCCESS_FETCH_BALANCE:
            return {
                ...state,
                balance: action.payload
            };

        default: 
            return state
    }
}