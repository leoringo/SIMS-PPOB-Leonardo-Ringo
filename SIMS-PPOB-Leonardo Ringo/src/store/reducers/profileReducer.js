import { SUCCESS_FETCH_PROFILE } from "../actions/actionType";

const initialState = {
    profile: {}
}

export default function profileReducer(state = initialState, action) {
    switch(action.type) {
        case SUCCESS_FETCH_PROFILE:
            return {
                ...state,
                profile: action.payload
            };

        default: 
            return state
    }
}