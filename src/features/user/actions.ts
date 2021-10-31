import { AxiosResponse } from "axios";
import { apiCall } from "../../common/services/api";
import alerts from "../alerts";
import { LOAD_USER } from "../actionTypes";
import { fetchingUser, fetchingUserIfNeeded, User } from "./types";

const { addAlert } = alerts.actions;

export const loadUser = (users: AxiosResponse<User[]>) => ({
  type: LOAD_USER,
  users,
});

export const fetchUser = (id: number): fetchingUser => {
  return (dispatch) => {
    return apiCall<User[]>("get", `/users/${id}`)
      .then((res) => dispatch(loadUser(res)))
      .catch((err) =>
        dispatch(addAlert({ message: err.message, type: "danger" }))
      );
  };
};
const shouldFetchUser = (state: any, id: number) => {
  const user = state.user[id];
  if (!user) return true;
};

export const fetchUserIfNeeded = (id: number): fetchingUserIfNeeded => {
  return (dispatch, getState) => {
    if (shouldFetchUser(getState(), id)) {
      return dispatch(fetchUser(id));
    }
  };
};
