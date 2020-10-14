import { ADD_LOADER, REMOVE_LOADER } from "../actionTypes";

// TODO - move to types file
export interface LoaderState {
    isLoading: boolean
    id: any[]
}

// TODO - move to types file
interface AddLoaderAction {
    type: typeof ADD_LOADER
    id: any
}

interface RemoveLoaderAction {
    type: typeof REMOVE_LOADER
    id: any
}

export type LoaderActionTypes = AddLoaderAction | RemoveLoaderAction;


export default (state: LoaderState = { isLoading: false, id: [] }, action: LoaderActionTypes) => {
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