import { ADD_SHOWS } from "../constants/show";

const initialState = {
    shows: []
};
export const reducer = (state = initialState, action) => {
    switch(action.type){
        case ADD_SHOWS:{
            return {
                ...state, 
                shows: action.payload
            }
        }
        default:
            return state;
    };
};