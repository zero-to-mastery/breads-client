import { LOAD_SUBSCRIPTIONS, REMOVE_SUBSCRIPTION } from '../actionTypes';

const subscription = (state=[], action) => {
    switch (action.type) {
        case LOAD_SUBSCRIPTIONS:
            return [...action.subscriptions];
        case REMOVE_SUBSCRIPTION:
            return state.filter(sub => sub.id !== action.id);
        default:
            return state;
    }
}

export default subscription;