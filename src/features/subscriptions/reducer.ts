import { UserFollowers } from "./../user/types";
import {
  ADD_SUBSCRIPTION,
  REMOVE_SUBSCRIPTIONS,
  LOAD_SUBSCRIPTIONS,
} from "../actionTypes";
import { SubscriptionActionTypes, SubscriptionState } from "./types";

const getIds = (users: any[]) => {
  return Object.values(users).map((user) => user.id);
};

const subscriptions = (
  state: SubscriptionState = { upToDate: false },
  action: SubscriptionActionTypes
) => {
  switch (action.type) {
    case LOAD_SUBSCRIPTIONS:
      if (action && action.userFollowers) {
        return {
          ...state,
          upToDate: true,
          [action.id]: {
            following: getIds(action.userFollowers.following),
            followers: getIds(action.userFollowers.followers),
          },
        };
      }
    /* falls through */
    case ADD_SUBSCRIPTION:
      if (action.id && action.user_id && state[action.id]) {
        return {
          ...state,
          upToDate: false,
          [action.user_id]: {
            ...state[action.user_id],
            following: state[action.user_id].following.concat(action.id),
          },
          [action.id]: {
            ...state[action.id],
            followers: state[action.id].followers.concat(action.user_id),
          },
        };
      } else if (action.id && action.user_id && !state[action.id]) {
        return {
          ...state,
          upToDate: false,
          [action.user_id]: {
            ...state[action.user_id],
            following: state[action.user_id].following.concat(action.id),
          },
        };
      }
    /* falls through */
    case REMOVE_SUBSCRIPTIONS:
      const { id, user_id } = action;
      if (id && user_id && state[id]) {
        return {
          ...state,
          upToDate: true,
          [user_id]: {
            ...state[user_id],
            following: state[user_id].following.filter(
              (sub: number) => sub !== id
            ),
          },
          [id]: {
            ...state[id],
            followers: state[id].followers.filter(
              (pub: number) => pub !== user_id
            ),
          },
        };
      } else if (id && user_id && !state[id]) {
        return {
          ...state,
          upToDate: true,
          [user_id]: {
            ...state[user_id],
            following: state[user_id].following.filter(
              (sub: number) => sub !== id
            ),
          },
        };
      }
    /* falls through */
    default:
      return state;
  }
};

export default subscriptions;
