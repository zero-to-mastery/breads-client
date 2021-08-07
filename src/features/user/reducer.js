import {
  RECEIVE_ENTITIES,
  LOAD_USER,
  LOAD_SUBSCRIPTIONS,
} from "../actionTypes";

const user = (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_ENTITIES:
      const { entities } = action.payload;
      if (entities && entities.users) {
        return { ...state, ...entities.users };
      }
    /* falls through */
    case LOAD_USER:
      if (action && action.user) {
        return {
          ...state,
          [action.user[0].id]: action.user[0],
        };
      }
    /* falls through */
    case LOAD_SUBSCRIPTIONS:
      const { users } = action;
      if (users) {
        const allSubscriptions = [...users.following, ...users.followers];
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
