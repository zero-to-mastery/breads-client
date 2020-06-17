import { ADD_LOADER, REMOVE_LOADER } from "./actionTypes";

export default (state = { isLoading: false, id: [] }, action) => {
    switch (action.type) {
        case ADD_LOADER:
            return { 
                isLoading: true,
                id: [...state.id, action.id]
            };
        case REMOVE_LOADER:
            return { 
                isLoading: state.id.length <= 1 ? false : true,
                id: state.id.filter(loader => loader !== action.id)
            };
        default:
            return state;
    }
};