import { ACTION_TYPES } from "../actions/stock";
const initialState = {
    list: []
}


export const stock = (state = initialState, action) => {

    switch (action.type) {
        case ACTION_TYPES.FETCH_ALL_STOCKS:
            return {
                ...state,
                list: [...action.payload]
            }            
        default:
            return state
    }
}