import { REMOVE_SUBSCRIPTIONS } from './actionTypes';
import { RECEIVE_ENTITIES } from '../actions';

const getIds = (users) => {
    return Object.values(users).map(user => user.id);
}

const subscriptions = (state = {}, action) => {
    switch (action.type) {
        case RECEIVE_ENTITIES:
            const { entities } = action.payload;
            if (entities && entities.users && action.list === action.id) {
                return { ...state, [action.list]: getIds(entities.users)}
            }
        case REMOVE_SUBSCRIPTIONS:
            const { id, user_id } = action;
            if (id && user_id) {
                return {
                    ...state,
                    [user_id]: state[user_id].filter(sub => sub !== id)
                }
            }
        default:
            return state;
    }
}

export default subscriptions;