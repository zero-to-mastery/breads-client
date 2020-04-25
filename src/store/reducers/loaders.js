import { REMOVE_LOADER } from "../actionTypes"; // ADD_LOADER

export default (state = { isLoading: true }, action) => {
    switch (action.type) {
        // case ADD_LOADER:
        //     return { ...state, isLoading: true };
        case REMOVE_LOADER:
            return { isLoading: false };
        default:
            return state;
    }
};