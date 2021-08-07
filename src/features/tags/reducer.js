import { ADD_TAG, REMOVE_TAG, RECEIVE_ENTITIES } from "../actionTypes";

const tags = (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_ENTITIES:
      const { entities } = action.payload;
      if (entities && entities.tags) {
        return { ...state, ...entities.tags };
      }
    // /* falls through */
    case ADD_TAG:
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
    case REMOVE_TAG:
      const { id, user_id } = action;
      if (id && user_id && state[id]) {
        return {
          ...state,
          upToDate: true,
          [user_id]: {
            ...state[user_id],
            following: state[user_id].following.filter((sub) => sub !== id),
          },
          [id]: {
            ...state[id],
            followers: state[id].followers.filter((pub) => pub !== user_id),
          },
        };
      } else if (id && user_id && !state[id]) {
        return {
          ...state,
          upToDate: true,
          [user_id]: {
            ...state[user_id],
            following: state[user_id].following.filter((sub) => sub !== id),
          },
        };
      }
    /* falls through */
    default:
      return state;
  }
};

export default tags;
