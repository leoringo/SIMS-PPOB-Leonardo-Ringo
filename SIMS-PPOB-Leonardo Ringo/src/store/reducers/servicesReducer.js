import { SUCCESS_FETCH_SERVICE } from "../actions/actionType";

const initialState = {
    services: []
}

export default function servicesReducer(state = initialState, action) {
    switch(action.type) {
        case SUCCESS_FETCH_SERVICE:
            return {
                ...state,
                services: action.payload
            };

        default: 
            return state
    }
}