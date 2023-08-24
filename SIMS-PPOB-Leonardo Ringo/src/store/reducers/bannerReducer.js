import { SUCCESS_FETCH_BANNER } from "../actions/actionType";

const initialState = {
    banner: []
}

export default function bannerReducer(state = initialState, action) {
    switch(action.type) {
        case SUCCESS_FETCH_BANNER:
            return {
                ...state,
                banner: action.payload
            };

        default: 
            return state
    }
}