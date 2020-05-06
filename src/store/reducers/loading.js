import { ADD_LOADER, REMOVE_LOADER } from "../actionTypes";

export default (state = { isLoading: false, id: null }, action) => {
    switch (action.type) {
        case ADD_LOADER:
            return { ...state, isLoading: true, id: action.id };
        case REMOVE_LOADER:
            return { ...state, isLoading: false, id: null };
        default:
            return state;
    }
};