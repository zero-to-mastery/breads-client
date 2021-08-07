import { ADD_LOADER, REMOVE_LOADER } from "../actionTypes";
import { LoaderState, LoaderActionTypes } from "./types";

const initialState: LoaderState = {
  isLoading: false,
  id: [],
};

// TODO - reducer isn't pure. isLoading state changes inside the reducer
export default (
  state: LoaderState = initialState,
  action: LoaderActionTypes
): LoaderState => {
  switch (action.type) {
    case ADD_LOADER:
      return {
        isLoading: true,
        id: [...state.id, action.id],
      };
    case REMOVE_LOADER:
      return {
        isLoading: state.id.length <= 1 ? false : true,
        id: state.id.filter((loader) => loader !== action.id),
      };
    default:
      return state;
  }
};
