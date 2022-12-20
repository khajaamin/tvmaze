import { ADD_SHOWS } from "../constants/show";

export const addShowsInStore = (data) => {
    return async dispatch => {
        dispatch({
            type: ADD_SHOWS,
            payload: data
        });
    };
};