import {
  RECEIVE_ENTITIES,
  LOAD_USER,
  LOAD_SUBSCRIPTIONS,
} from "../actionTypes";
import { UserActionTypes } from "./types";

const user = (state = {}, action: UserActionTypes) => {
  switch (action.type) {
    case RECEIVE_ENTITIES:
      const { entities } = action.payload;
      if (entities && entities.users) {
        return { ...state, ...entities.users };
      }
    /* falls through */
    case LOAD_USER:
      if (action && action.users) {
        return {
          ...state,
          [action.users[0].id]: action.users[0],
        };
      }
    /* falls through */
    case LOAD_SUBSCRIPTIONS:
      const { userFollowers } = action;
      if (userFollowers) {
        const allSubscriptions = [
          ...userFollowers.following,
          ...userFollowers.followers,
        ];
        const uniqueSubscriptions = allSubscriptions.reduce((object, user) => {
          return {
            ...object,
            [user.id]: user,
          };
        }, {});
        return { ...state, ...uniqueSubscriptions };
      }
    /* falls through */
    default:
      return state;
  }
};

export default user;
