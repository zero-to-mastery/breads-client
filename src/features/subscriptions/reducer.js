import { ADD_SUBSCRIPTION, REMOVE_SUBSCRIPTIONS } from './actionTypes';
import { RECEIVE_ENTITIES } from '../actions';

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
        case ADD_SUBSCRIPTION:
            if (action.id && action.user_id) {
                return {
                    ...state,
                    upToDate: false,
                    [action.user_id]: state[action.user_id].concat(action.id)
                }
            }
        case REMOVE_SUBSCRIPTIONS:
            const { id, user_id } = action;
            if (id && user_id) {
                return {
                    ...state,
                    upToDate: true,
                    [user_id]: state[user_id].filter(sub => sub !== id)
                }
            }
        default:
            return state;
    }
}

export default subscriptions;