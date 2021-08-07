import { RECEIVE_ENTITIES, ADD_TAG } from "../actionTypes";

const getIds = (tags) => {
  return Object.values(tags).map((tag) => tag.id);
};

const tagsByList = (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_ENTITIES:
      const { entities } = action.payload;
      if (entities && entities.tags) {
        return {
          ...state,
          [action.list]: {
            upToDate: true,
            items: getIds(entities.tags),
          },
        };
      }
    /* falls through */
    case ADD_TAG:
      if (action.user_id && state[action.user_id]) {
        return {
          ...state,
          global: {
            ...state.global,
            upToDate: false,
          },
          [action.user_id]: {
            ...state[action.user_id],
            upToDate: false,
          },
        };
      } else if (action.user_id && !state[action.user_id]) {
        return {
          ...state,
          global: {
            ...state.global,
            upToDate: false,
          },
        };
      }
    /* falls through */
    // ADD/REMOVE NEW SUB'S TAGS WHEN I UN/FOLLOW THEM
    // case ADD_SUBSCRIPTION:
    //     if (state.subscriptions) {
    //         return {
    //             ...state,
    //             subscriptions: {
    //                 ...state.subscriptions,
    //                 upToDate: false
    //             }
    //         }
    //     }
    //     /* falls through */
    // case REMOVE_SUBSCRIPTIONS:
    //     if (state.subscriptions &&
    //         action.id && action.user_id) {
    //         const filteredSubReadings = state.subscriptions.items
    //                                         .map(id => action.readings[id])
    //                                         .filter(reading => reading.reader !== action.id)
    //                                         .map(reading => reading.id);
    //         return {
    //             ...state,
    //             subscriptions: {
    //                 upToDate: true,
    //                 items: [...filteredSubReadings]
    //             }
    //         }
    //     }
    //     /* falls through */
    default:
      return state;
  }
};

export default tagsByList;
