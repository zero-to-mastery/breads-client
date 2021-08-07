import { SET_CURRENT_USER } from "../actionTypes";
import { AuthActionTypes, AuthState } from "./types";

const initialState: AuthState = {
  isAuthenticated: false, // hopefully be true, when logged in
  user: {
    id: null,
    username: null,
    image: null,
  }, // all the user info when logged in
};

export default (state = initialState, action: AuthActionTypes) => {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        isAuthenticated: !!action.payload.id,
        user: action.payload,
      };
    default:
      return state;
  }
};
