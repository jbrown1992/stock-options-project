import api from "./api";

export const ACTION_TYPES = {
    FETCH_ALL_STOCKS: 'FETCH_ALL_STOCKS'
}


export const fetchAll = () => dispatch => {
    api.stock().fetchAll()
        .then(response => {
            dispatch({
                type: ACTION_TYPES.FETCH_ALL_STOCKS,
                payload: response.data
            })
        })
        .catch(err => console.log(err))
}