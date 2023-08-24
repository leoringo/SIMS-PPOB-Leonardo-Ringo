import { SUCCESS_FETCH_HISTORIES, SUCCESS_FETCH_PROFILE } from "../actions/actionType";

const initialState = {
    profile: {},
    histories: []
}

export default function profileReducer(state = initialState, action) {
    switch(action.type) {
        case SUCCESS_FETCH_PROFILE:
            return {
                ...state,
                profile: action.payload
            };

        case SUCCESS_FETCH_HISTORIES:
            return {
                ...state,
                histories: action.payload
            }

        default: 
            return state
    }
}