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
        // case REMOVE_SUBSCRIPTIONS:
        //     return state.filter(sub => sub.id !== action.id)
        default:
            return state;
    }
}

export default subscriptions;