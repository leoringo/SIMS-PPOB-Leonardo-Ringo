import { SUCCESS_FETCH_SERVICE, SUCCESS_FETCH_SERVICE_DETAIL } from "../actions/actionType";

const initialState = {
    services: [],
    serviceDetail: {}
}

export default function servicesReducer(state = initialState, action) {
    switch(action.type) {
        case SUCCESS_FETCH_SERVICE:
            return {
                ...state,
                services: action.payload
            };
        
        case SUCCESS_FETCH_SERVICE_DETAIL:
            return {
                ...state,
                serviceDetail: action.payload
            }
            
        default: 
            return state
    }
}