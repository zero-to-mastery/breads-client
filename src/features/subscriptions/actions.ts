import { apiCall } from "../../common/services/api";
import alerts from "../alerts";
import {
  LOAD_SUBSCRIPTIONS,
  ADD_SUBSCRIPTION,
  REMOVE_SUBSCRIPTIONS,
} from "../actionTypes";
import {
  fetchingSubscriptions,
  removingSubscription,
  postingNewSubscription,
  fetchingSubscriptionsIfNeeded,
} from "./types";

const { addAlert } = alerts.actions;

export const loadSubscriptions = (users: any, id: number) => ({
  type: LOAD_SUBSCRIPTIONS,
  users,
  id,
});

export const addSubscription = (id: number, user_id: number | null) => ({
  type: ADD_SUBSCRIPTION,
  id,
  user_id,
});

export const removeSubscriptions = (id: number, user_id: number | null) => ({
  type: REMOVE_SUBSCRIPTIONS,
  id,
  user_id,
});

export const fetchSubscriptions =
  (user_id: number): fetchingSubscriptions =>
  async (dispatch) => {
    return apiCall("get", `/users/${user_id}/subscriptions`)
      .then((res) => dispatch(loadSubscriptions(res, user_id)))
      .catch((err) =>
        dispatch(addAlert({ message: err.message, type: "danger" }))
      );
  };

export const removeSubscription = (
  sub_id: number,
  pub_id: number
): removingSubscription => {
  return (dispatch) => {
    return apiCall("delete", `/users/${sub_id}/subscriptions/${pub_id}`)
      .then(() => {
        dispatch(removeSubscriptions(pub_id, sub_id));
        dispatch(
          addAlert({ message: "Successfully unfollowed", type: "success" })
        );
      })
      .catch((err) =>
        dispatch(addAlert({ message: err.message, type: "danger" }))
      );
  };
};

export const postNewSubscription =
  (sub_id: number): postingNewSubscription =>
  (dispatch, getState) => {
    let { currentUser } = getState();
    const user_id = currentUser.user.id;
    return apiCall("post", `/users/${user_id}/subscriptions`, { sub_id })
      .then(() => {
        dispatch(addSubscription(sub_id, user_id));
        dispatch(
          addAlert({ message: "Successfully followed", type: "success" })
        );
      })
      .catch((err) =>
        dispatch(addAlert({ message: err.message, type: "danger" }))
      );
  };

const shouldFetchSubscriptions = (
  state: any,
  id: number
): boolean | undefined => {
  const subscriptions = state.subscriptions[id];
  const upToDate = state.subscriptions.upToDate;
  if (upToDate !== true || !subscriptions) {
    return true;
  }
};

export const fetchSubscriptionsIfNeeded = (
  id: number
): fetchingSubscriptionsIfNeeded => {
  return (dispatch, getState) => {
    if (shouldFetchSubscriptions(getState(), id)) {
      return dispatch(fetchSubscriptions(id));
    }
  };
};
