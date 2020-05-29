import { LOAD_SUBSCRIPTIONS, REMOVE_SUBSCRIPTIONS } from '../actionTypes';

const user = (state=[], action) => {
    switch (action.type) {
        case LOAD_SUBSCRIPTIONS:
            return [...action.users];
        case REMOVE_SUBSCRIPTIONS:
            return state.filter(sub => sub.id !== action.id)
        default:
            return state;
    }
}

export default user;