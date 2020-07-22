import { RECEIVE_ENTITIES, ADD_SUBSCRIPTION, REMOVE_SUBSCRIPTIONS } from '../actionTypes';

const getIds = (users) => {
    return Object.values(users).map(user => user.id);
}

const subscriptions = (state = { upToDate: false }, action) => {
    switch (action.type) {
        case RECEIVE_ENTITIES:
            const { entities } = action.payload;

            if (entities && entities.users && action.list === action.id) {
                return { ...state, upToDate: true, [action.list]: getIds(entities.users)}
            } else if (!entities.users && action.list === action.id) {
                return { ...state, upToDate: true, [action.list]: []}
            }
            /* falls through */
        case ADD_SUBSCRIPTION:
            if (action.id && action.user_id) {
                return {
                    ...state,
                    upToDate: false,
                    [action.user_id]: state[action.user_id].concat(action.id)
                }
            }
            /* falls through */
        case REMOVE_SUBSCRIPTIONS:
            const { id, user_id } = action;
            if (id && user_id) {
                return {
                    ...state,
                    upToDate: true,
                    [user_id]: state[user_id].filter(sub => sub !== id)
                }
            }
            /* falls through */
        default:
            return state;
    }
}

export default subscriptions;